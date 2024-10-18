import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    roomType: { type: String, required: true },
    roomPrice: { type: Number, required: true },
    roomDescription: { type: String, required: true },
    homestayId: { type: mongoose.Schema.Types.ObjectId, ref: 'homestay', required: true }, // Reference to the homestay
    roomStatus: { type: String, required: true, enum: ['available', 'unavailable'] }, // Status field
    roomImage: { type: String, required: true } // Add roomImage field
});

// Use the roomModel if it already exists
const roomModel = mongoose.models.room || mongoose.model("room", roomSchema);

export default roomModel;
