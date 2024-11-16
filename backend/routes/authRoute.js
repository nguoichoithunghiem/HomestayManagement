import express from 'express';
import { registerUser, loginUser, getUserProfile, loginAdmin, changePassword } from '../controllers/authController.js'; // Import các controller
import User from '../models/userModel.js';

const router = express.Router();

// Route đăng ký người dùng
router.post('/register', registerUser);

// Route đăng nhập người dùng
router.post('/login', loginUser);

// Route lấy thông tin người dùng (không cần verifyToken)
router.get('/profile', getUserProfile);

router.post('/login-admin', loginAdmin);

router.put('/change-password/:userId', changePassword);

export default router;
