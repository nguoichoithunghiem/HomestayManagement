import Review from '../models/reviewModel.js';
import Booking from '../models/bookingModel.js';  // Import model Booking (nếu chưa có)

// Thêm đánh giá cho một booking
const addReview = async (req, res) => {
    const { bookingId } = req.params;  // Lấy bookingId từ params
    const { rating, comment, userId } = req.body;  // Lấy rating, comment, userId từ body request

    try {
        // Kiểm tra xem booking có tồn tại hay không
        const booking = await Booking.findById(bookingId).populate('homestayId'); // Populate homestayId

        if (!booking) {
            return res.status(404).json({ message: 'Booking không tồn tại.' });
        }

        // Kiểm tra nếu booking đã được đánh giá
        const existingReview = await Review.findOne({ bookingId, userId });
        if (existingReview) {
            return res.status(400).json({ message: 'Bạn đã đánh giá cho booking này rồi.' });
        }

        // Tạo một review mới và thêm homestayId vào
        const newReview = new Review({
            bookingId,
            userId,
            rating,
            comment,
            homestayId: booking.homestayId._id  // Lưu homestayId từ booking
        });

        // Lưu đánh giá vào cơ sở dữ liệu
        await newReview.save();

        // Cập nhật booking trạng thái đã có đánh giá (nếu cần thiết)
        await Booking.findByIdAndUpdate(bookingId, { hasReviewed: true });

        res.status(201).json({ message: 'Đánh giá đã được gửi thành công.' });
    } catch (error) {
        console.error('Lỗi khi lưu đánh giá:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lưu đánh giá.' });
    }
};


// Lấy tất cả đánh giá của một booking
const getReviewsByBookingId = async (req, res) => {
    const { bookingId } = req.params;  // Lấy bookingId từ params

    try {
        // Lấy tất cả đánh giá liên quan đến bookingId
        const reviews = await Review.find({ bookingId })
            .populate('userId', 'fullName email')  // Lấy thông tin người đánh giá
            .exec();

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'Không có đánh giá cho booking này.' });
        }

        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Lỗi khi lấy đánh giá:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy đánh giá.' });
    }
};

// Xóa đánh giá
const removeReview = async (req, res) => {
    const { reviewId } = req.params;  // Lấy reviewId từ URL params

    try {
        // Tìm và xóa review theo ID
        const review = await Review.findByIdAndDelete(reviewId);

        // Kiểm tra nếu không tìm thấy review
        if (!review) {
            return res.status(404).json({ success: false, message: 'Đánh giá không tồn tại.' });
        }

        // Trả về phản hồi thành công
        return res.status(200).json({ success: true, message: 'Đánh giá đã được xóa thành công.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xóa đánh giá.' });
    }
};

// Cập nhật trạng thái đánh giá (ví dụ, đã xử lý)
const updateReviewStatus = async (req, res) => {
    const { reviewId } = req.params;
    const { status } = req.body;  // status có thể là "approved", "rejected", hoặc các trạng thái khác.

    try {
        // Kiểm tra xem review có tồn tại không
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Đánh giá không tồn tại.' });
        }

        // Cập nhật trạng thái cho đánh giá
        review.status = status;
        await review.save();

        res.status(200).json({ message: 'Trạng thái đánh giá đã được cập nhật.' });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái đánh giá:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật trạng thái.' });
    }
};
const getAllReviews = async (req, res) => {
    try {
        // Lấy tất cả đánh giá và populate thông tin người đánh giá, bookingId và homestayId
        const reviews = await Review.find()
            .populate('userId', 'fullName email')  // Lấy thông tin người đánh giá
            .populate({
                path: 'bookingId',  // Populate bookingId từ review
                select: 'homestayId',  // Chỉ lấy homestayId từ booking
                populate: {
                    path: 'homestayId',  // Populate homestayId từ booking
                    select: 'homestayName homestayAddress homestayDescription'  // Lấy thông tin homestay
                }
            })
            .exec();

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'Không có đánh giá nào.' });
        }

        // Thêm thông tin homestay vào mỗi review
        const reviewsWithHomestay = reviews.map(review => {
            return {
                ...review.toObject(),
                homestay: review.bookingId?.homestayId // Lấy thông tin homestay từ bookingId
            };
        });

        res.status(200).json({ reviews: reviewsWithHomestay });
    } catch (error) {
        console.error('Lỗi khi lấy tất cả đánh giá:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy đánh giá.' });
    }
};

export { addReview, getReviewsByBookingId, removeReview, updateReviewStatus, getAllReviews };
