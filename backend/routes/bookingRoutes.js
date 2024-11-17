import express from "express";
import {
    createBooking,
    getBookings,
    updateStatus,
    getBookingById,
    updateBooking,
    removeBooking,
    getBookingHistoryByUserId // Import hàm getUserBookingHistory
} from "../controllers/bookingController.js";

const router = express.Router();

// Route để tạo booking
router.post("/", createBooking);

// Route để lấy danh sách booking
router.get("/list", getBookings);

// Route để cập nhật trạng thái booking
router.post("/update-status", updateStatus);

// Route để lấy booking theo ID
router.get('/:id', getBookingById);

// Route để cập nhật booking theo ID
router.put('/update/:id', updateBooking);

// Route để xóa booking theo ID
router.delete('/remove/:id', removeBooking);

// Route để lấy lịch sử đặt phòng của người dùng theo userId
router.get('/user-history/:userId', getBookingHistoryByUserId);

export default router;
