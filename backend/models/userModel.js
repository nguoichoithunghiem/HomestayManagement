import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true }, // Đảm bảo đúng tên field
        address: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: "user" }, // Vai trò (user/admin)
    },
    { timestamps: true }, { minimize: false }
);

// Hash mật khẩu trước khi lưu vào database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Nếu không sửa đổi mật khẩu, bỏ qua
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Phương thức kiểm tra mật khẩu
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Khởi tạo model User
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
