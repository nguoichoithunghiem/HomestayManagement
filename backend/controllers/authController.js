// controllers/authController.js
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Import bcrypt để mã hóa mật khẩu

// Đăng ký tài khoản
export const registerUser = async (req, res) => {
    const { fullName, email, password, phoneNumber, address, role = 'user' } = req.body; // Mặc định vai trò là 'user'

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ fullName, email, password: hashedPassword, phoneNumber, address, role });
        await newUser.save();
        res.status(201).json({ success: true, message: "Đăng ký thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi khi đăng ký" });
    }
};

// Đăng nhập cho người dùng bình thường
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email hoặc mật khẩu không đúng" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Email hoặc mật khẩu không đúng" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
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

// Đăng nhập cho admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email hoặc mật khẩu không đúng" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Email hoặc mật khẩu không đúng" });
        }

        // Kiểm tra vai trò
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Chỉ admin mới có thể đăng nhập" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

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

// Đổi mật khẩu
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tìm thấy" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Mật khẩu hiện tại không đúng" });
        }

        // Hash mật khẩu mới
        user.password = await bcrypt.hash(newPassword, 10); // Mã hóa mật khẩu mới
        await user.save(); // Lưu thay đổi vào cơ sở dữ liệu

        res.status(200).json({ success: true, message: "Đổi mật khẩu thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Có lỗi xảy ra khi đổi mật khẩu" });
    }
};


