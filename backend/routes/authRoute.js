// routes/authRoute.js
import express from "express";
import { registerUser, loginUser, loginAdmin } from "../controllers/authController.js";

const authRouter = express.Router();

// Đăng ký
authRouter.post("/register", registerUser);

// Đăng nhập cho người dùng bình thường
authRouter.post("/login", loginUser);

// Đăng nhập cho admin
authRouter.post("/login-admin", loginAdmin);

export default authRouter;
