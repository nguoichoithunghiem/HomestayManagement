import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
    const {
        fullName,
        email,
        phoneNumber,
        address,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        notes,
        homestayId,
        roomNumber
    } = req.body;

    try {
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
            roomNumber
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({
            success: true,
            message: "Đặt phòng thành công!",
            data: savedBooking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getBookings = async (req, res) => {
    console.log("Received request to get bookings");
    try {
        const bookings = await Booking.find();
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
    const { id } = req.params; // Assuming you pass the ID in the URL parameters

    try {
        const booking = await Booking.findById(id);
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

