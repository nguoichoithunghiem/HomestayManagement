import express from "express";
import {
    addUser,
    getUserById,
    getUserInfo,
    listUsers,
    removeUser,
    updateUser,
    updateUserRole
} from "../controllers/usercontroller.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Nhập middleware xác thực

const userRouter = express.Router();

// Route cho các chức năng của người dùng
userRouter.post("/add", addUser); // Thêm người dùng
userRouter.get("/list", listUsers); // Liệt kê người dùng
userRouter.post("/remove", removeUser); // Xóa người dùng
userRouter.put("/update/:id", updateUser); // Cập nhật thông tin người dùng
userRouter.put('/update-role/:id', updateUserRole); // Cập nhật vai trò người dùng
userRouter.get('/:id', getUserById); // Lấy thông tin người dùng theo ID
userRouter.get("/info", verifyToken, getUserInfo); // Lấy thông tin người dùng từ token

export default userRouter;
