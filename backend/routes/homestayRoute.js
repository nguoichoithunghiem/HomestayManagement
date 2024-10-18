import express from "express";
import { addHomestay, getHomestayById, listHomestay, removeHomestay, updateHomestay, updateHomestayStatus } from "../controllers/homestayController.js";
import multer from "multer";

const homestayRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route cho các chức năng của homestay
homestayRouter.post("/add", upload.single("homestayImage"), addHomestay);
homestayRouter.get("/list", listHomestay);
homestayRouter.post("/remove", removeHomestay);
homestayRouter.post("/update/:id", upload.single("homestayImage"), updateHomestay); // Thêm route cho sửa homestay
homestayRouter.post('/update-status', updateHomestayStatus);
homestayRouter.get('/:id', getHomestayById);



export default homestayRouter;
