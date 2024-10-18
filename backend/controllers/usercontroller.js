import userModel from "../models/userModel.js";
import fs from 'fs'; // Chỉ sử dụng nếu bạn cần quản lý hình ảnh của người dùng

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
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Liệt kê tất cả người dùng
const listUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
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
        console.log(error);
        res.json({ success: false, message: "Error" });
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

    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, userData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User không tồn tại' });
        }

        res.json({ success: true, message: "User Updated", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
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
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật vai trò" });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error fetching user' });
    }
};

export { addUser, listUsers, removeUser, updateUser, updateUserRole, getUserById };


