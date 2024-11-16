import User from '../models/userModel.js'; // Import model User
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Đăng ký người dùng
export const registerUser = async (req, res) => {
    const { fullName, email, phoneNumber, address, password } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email đã được đăng ký.' });
        }

        // Tạo người dùng mới
        const user = new User({ fullName, email, phoneNumber, address, password });
        await user.save();

        // Trả về thông tin người dùng và thông báo thành công
        res.status(201).json({
            message: 'Đăng ký thành công!',
            user: { fullName: user.fullName, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server, thử lại sau.' });
    }
};

// Đăng nhập người dùng
// backend/controllers/authController.js
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại.' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác.' });
        }

        // Tạo JWT token
        const token = user.generateAuthToken();

        // Trả về thông tin người dùng và token
        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token,
            user: {
                userId: user._id,  // Trả về userId
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server, thử lại sau.' });
    }
};


// Lấy thông tin người dùng (Không cần xác thực)
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.query.userId; // Lấy userId từ query params

        if (!userId) {
            return res.status(400).json({ message: 'Cần có userId để lấy thông tin người dùng.' });
        }

        const user = await User.findById(userId); // Tìm người dùng trong DB theo ID

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        // Trả về thông tin người dùng
        res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server, thử lại sau.' });
    }
};
// Đăng nhập cho admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra email người dùng
        const user = await User.findOne({ email });  // Sửa từ userModel thành User
        if (!user) {
            return res.status(400).json({ success: false, message: "Email hoặc mật khẩu không đúng" });
        }

        // So sánh mật khẩu đã mã hóa
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Email hoặc mật khẩu không đúng" });
        }

        // Kiểm tra vai trò của người dùng, chỉ cho phép admin đăng nhập
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Chỉ admin mới có thể đăng nhập" });
        }

        // Tạo JWT token cho admin
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token hết hạn sau 1 ngày
        );

        // Trả về thông tin admin và token
        res.status(200).json({
            success: true,
            message: "Đăng nhập admin thành công",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi khi đăng nhập" });
    }
};

export const changePassword = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;
  
    if (!newPassword) {
      return res.status(400).json({ message: 'Mật khẩu mới không được để trống' });
    }
  
    try {
      // Tìm người dùng theo userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
  
      // Thay đổi mật khẩu
      await user.changePassword(newPassword);
  
      // Trả về thông báo thành công
      res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại' });
    }
  };