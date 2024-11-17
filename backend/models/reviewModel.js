import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking' // Tham chiếu đến Booking
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Tham chiếu đến User (người đánh giá)
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Đánh giá có thể từ 1 đến 5 sao
    },
    comment: {
        type: String,
        required: false,
        default: "" // Bình luận có thể rỗng
    },
    homestayId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Homestay' // Tham chiếu đến Homestay mà đánh giá này thuộc về
    }
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
