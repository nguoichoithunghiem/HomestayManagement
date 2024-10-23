import userModel from "../models/userModel.js";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken"; // Đảm bảo đã nhập jwt

// Thêm người dùng
const addUser = async (req, res) => {
    const user = new userModel({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        password: req.body.password, // Mật khẩu sẽ được băm trong userModel
        role: req.body.role || 'user' // Thêm trường role, mặc định là 'user'
    });

    try {
        await user.save();
        res.json({ success: true, message: "User Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message || "Error" });
    }
};

// Liệt kê tất cả người dùng
const listUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message || "Error" });
    }
};

// Xóa người dùng
const removeUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (user) {
            await userModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "User Removed" });
        } else {
            res.json({ success: false, message: "User không tồn tại" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message || "Error" });
    }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
    const { id } = req.params; // Lấy id từ params
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        role: req.body.role // Thêm trường role
    };

    if (req.body.password) {
        userData.password = req.body.password; // Chỉ băm nếu có trường mật khẩu
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, userData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User không tồn tại' });
        }

        res.json({ success: true, message: "User Updated", data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Error" });
    }
};

// Cập nhật vai trò người dùng
const updateUserRole = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    const { role } = req.body; // Lấy role từ body

    // Kiểm tra vai trò hợp lệ
    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Vai trò không hợp lệ' });
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, { role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User không tồn tại' });
        }

        res.json({ success: true, message: "Vai trò đã được cập nhật", data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Lỗi khi cập nhật vai trò" });
    }
};

// Lấy thông tin người dùng
// Lấy thông tin người dùng
const getUserById = async (req, res) => {
    const { id } = req.params;

    // Kiểm tra xem id có phải là một ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'ID không hợp lệ' });
    }

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User không tồn tại' });
        }

        // Chỉ trả về thông tin cần thiết, không bao gồm mật khẩu
        const { password, ...userInfo } = user.toObject(); // Chuyển đổi sang đối tượng JS
        res.json({ success: true, data: userInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || 'Error fetching user' });
    }
};


// Hàm lấy thông tin người dùng dựa trên token
const getUserInfo = async (req, res) => {
    const userId = req.user._id; // Lấy userId từ token

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }

        // Chỉ trả về thông tin cần thiết, không bao gồm mật khẩu
        const { password, ...userInfo } = user.toObject(); // Chuyển đổi sang đối tượng JS
        res.json({ success: true, data: userInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || 'Lỗi khi lấy thông tin người dùng' });
    }
};

export {
    addUser,
    listUsers,
    removeUser,
    updateUser,
    updateUserRole,
    getUserById,
    getUserInfo
};
