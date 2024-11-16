import Booking from "../models/bookingModel.js";
import mongoose from "mongoose";

export const createBooking = async (req, res) => {
    try {
        // Lấy thông tin người dùng từ localStorage (frontend sẽ gửi trong body hoặc header)
        const { fullName, email, phoneNumber, address, checkInDate, checkOutDate, numberOfGuests, notes, homestayId, roomNumber } = req.body;
        const userId = req.body.userId; // Lấy từ body hoặc req.userId (nếu xác thực từ middleware)

        // Tạo booking mới
        const newBooking = new Booking({
            fullName,
            email,
            phoneNumber,
            address,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            notes,
            homestayId,
            roomNumber,
            userId, // Lưu userId từ localStorage
        });

        // Lưu booking vào database
        await newBooking.save();

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking", error: error.message });
    }
};
export const getBookings = async (req, res) => {
    console.log("Received request to get bookings");
    try {
        // Populate homestayId with homestayName from the Homestay collection
        const bookings = await Booking.find()
            .populate('homestayId', 'homestayName') // Populate homestayName using homestayId from the Booking model
            .exec();

        res.json({ success: true, data: bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// bookingController.js
export const updateStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đặt phòng" });
        }
        res.json({ success: true, message: "Trạng thái đã được cập nhật", data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params

    try {
        // Populate để lấy homestayName
        const booking = await Booking.findById(id).populate('homestayId', 'homestayName');
        if (!booking) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đặt phòng" });
        }
        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateBooking = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    const updatedData = req.body; // Dữ liệu cập nhật từ body

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đặt phòng" });
        }
        res.json({ success: true, message: "Cập nhật thành công", data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const removeBooking = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đặt phòng để xóa" });
        }
        res.json({ success: true, message: "Đặt phòng đã được xóa thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBookingHistoryByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Sử dụng populate để lấy thông tin homestayName
        const bookings = await Booking.find({ userId })
            .populate('homestayId', 'homestayName') // Populate homestayName từ bảng Homestay
            .sort({ checkInDate: -1 }); // Sắp xếp theo ngày nhận phòng từ mới đến cũ

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ success: false, message: "Không có lịch sử đặt phòng" });
        }
        res.json({ success: true, data: bookings });
    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ success: false, message: "Error fetching booking history" });
    }
};



