import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' }, // user hoặc admin
    },
    { timestamps: true, minimize: false }
);

// Mã hóa mật khẩu trước khi lưu vào DB
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Nếu không thay đổi mật khẩu thì không cần mã hóa lại
    this.password = await bcrypt.hash(this.password, 10); // Sử dụng bcrypt để mã hóa mật khẩu
    next();
});


// Phương thức kiểm tra mật khẩu
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Phương thức tạo JWT Token
userSchema.methods.generateAuthToken = function () {
    const payload = { id: this._id, fullName: this.fullName, email: this.email, role: this.role };
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' }); // Tạo JWT token với thời gian sống là 1 giờ
};
userSchema.methods.changePassword = async function (newPassword) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword, salt);
    await this.save(); // Lưu thay đổi vào cơ sở dữ liệu
  };



// Tạo model User từ schema
const User = mongoose.model('User', userSchema);

export default User;
