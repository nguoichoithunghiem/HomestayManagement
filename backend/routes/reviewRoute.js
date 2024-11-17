import express from 'express';
import { addReview, getReviewsByBookingId, removeReview, updateReviewStatus, getAllReviews } from '../controllers/reviewController.js';

const router = express.Router();

// Thêm đánh giá cho một booking
router.post('/:bookingId/review', addReview);

// Lấy tất cả đánh giá của một booking
router.get('/:bookingId/reviews', getReviewsByBookingId);
router.get("/", getAllReviews);

// Xóa đánh giá
router.delete('/remove/:reviewId', removeReview);    // Xóa đánh giá theo reviewId

// Cập nhật trạng thái đánh giá (ví dụ: đã duyệt, từ chối)
router.post('/update-status/:reviewId', updateReviewStatus);  // Cập nhật trạng thái đánh giá

export default router;
