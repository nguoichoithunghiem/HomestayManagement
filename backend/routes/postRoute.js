import express from "express";
import { addPost, listPost, removePost, updatePost, updatePostStatus, getPostById } from "../controllers/postController.js";
import multer from "multer";

const postRouter = express.Router();

// Image Storage Engine cho ảnh bài viết
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route cho các chức năng của bài viết
postRouter.post("/add", upload.single("postImage"), addPost); // Thêm bài viết mới
postRouter.get("/list", listPost); // Liệt kê tất cả bài viết
postRouter.post("/remove", removePost); // Xóa bài viết
postRouter.put("/update/:id", upload.single("postImage"), updatePost); // Sửa bài viết (chỉnh sửa phương thức từ post thành put)
postRouter.post("/update-status", updatePostStatus); // Cập nhật trạng thái bài viết
postRouter.get("/:id", getPostById); // Lấy bài viết theo ID

export default postRouter;
