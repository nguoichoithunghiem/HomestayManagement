import express from "express";
import { addRoom, fetchRoom, listRooms, removeRoom, updateRoom, updateRoomStatus } from "../controllers/roomController.js";
import multer from "multer";

const roomRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route cho các chức năng của phòng
roomRouter.post("/add", upload.single("roomImage"), addRoom); // Thêm route cho thêm phòng
roomRouter.get("/list", listRooms); // Liệt kê tất cả phòng
roomRouter.post("/remove", removeRoom); // Xóa phòng
roomRouter.put("/update/:id", upload.single("roomImage"), updateRoom); // Cập nhật phòng
roomRouter.post('/update-status', updateRoomStatus); // Cập nhật trạng thái phòng
roomRouter.get("/:id", fetchRoom);

export default roomRouter;
