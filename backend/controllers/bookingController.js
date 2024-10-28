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
