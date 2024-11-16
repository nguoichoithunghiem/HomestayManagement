import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    notes: { type: String, default: "" },
    homestayId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'homestay' }, // Reference to Homestay
    roomNumber: { type: String, required: false }, // Optional
    status: {
        type: String,
        enum: ['Processing', 'Booking Successful', 'Checked In','Checked Out'],
        default: 'Processing'
    },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;

