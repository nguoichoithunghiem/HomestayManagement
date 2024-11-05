import express from "express";
import { createBooking, getBookings, updateStatus, getBookingById, updateBooking, removeBooking } from "../controllers/bookingController.js"; // Đảm bảo đã import updateStatus

const router = express.Router();

// Route để tạo booking
router.post("/", createBooking);

// Route để lấy danh sách booking
router.get("/list", getBookings);

// Route để cập nhật trạng thái booking
router.post("/update-status", updateStatus);

router.get('/:id', getBookingById); // Route to get a booking by ID

router.put('/update/:id', updateBooking); // Thêm route này để cập nhật

router.delete('/remove/:id', removeBooking); // Thêm route xóa booking

export default router;
