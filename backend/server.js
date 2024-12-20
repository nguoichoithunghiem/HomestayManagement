import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import homestayRouter from "./routes/homestayRoute.js";
import roomRouter from "./routes/roomRoute.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js"; // Import booking router
import postRoute from "./routes/postRoute.js"
import reviewRoute from "./routes/reviewRoute.js"

// Cấu hình môi trường
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Kết nối cơ sở dữ liệu
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/homestay", homestayRouter);
app.use("/api/room", roomRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter); // Thêm route cho booking
app.use("/api/posts", postRoute);
app.use('/api/bookings', reviewRoute);
app.use('/api/reviews', reviewRoute);  // Thêm route cho review thay vì /api/bookings



// Route cho ảnh
app.use("/images", express.static('uploads'));

// Route kiểm tra API
app.get("/", (req, res) => {
    res.send("API đang hoạt động");
});

// Lắng nghe server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
