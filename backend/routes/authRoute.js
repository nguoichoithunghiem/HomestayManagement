// routes/authRoute.js
import express from "express";
import { registerUser, loginUser, loginAdmin, changePassword } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import userModel from "../models/userModel.js"; // Thêm dòng import này

const authRouter = express.Router();

// Đăng ký
authRouter.post("/register", registerUser);

// Đăng nhập
authRouter.post("/login", loginUser);

// Đăng nhập cho admin
authRouter.post("/login-admin", loginAdmin);

// Đổi mật khẩu
authRouter.post("/change-password", verifyToken, changePassword);

// Route để xem thông tin người dùng
authRouter.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userId).select('-password'); // Lấy thông tin người dùng

        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tìm thấy" });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error); // Ghi log lỗi ra console
        res.status(500).json({ success: false, message: "Có lỗi xảy ra", error });
    }
});

export default authRouter;
