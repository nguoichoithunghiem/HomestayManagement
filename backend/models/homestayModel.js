import mongoose from "mongoose";

const homestaySchema = new mongoose.Schema({
    homestayName: { type: String, required: true },
    homestayAddress: { type: String, required: true },
    homestayPrice: { type: Number, required: true },
    homestayDescription: { type: String, required: true },
    homestayCategory: { type: String, required: true },
    homestayImage: { type: String, required: true },
    status: { type: String, required: true, enum: ['available', 'unavailable'] } // Thêm trường status
});


// Sử dụng mô hình homestay nếu chưa tồn tại
const homestayModel = mongoose.models.homestay || mongoose.model("homestay", homestaySchema);

export default homestayModel;
