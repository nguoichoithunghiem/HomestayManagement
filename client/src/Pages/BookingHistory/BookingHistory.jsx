import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState({});  // Lưu trạng thái đánh giá cho mỗi booking

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId'); // Lấy userId từ localStorage

        if (!storedUserId) {
            setError('User ID không có trong localStorage');
            setLoading(false);
            return;
        }

        // Gọi API để lấy danh sách đặt phòng
        const fetchBookingHistory = async () => {
            try {
                const response = await axios.get(`https://homestaymanagement-backend.onrender.com/api/bookings/user-history/${storedUserId}`);
                setBookings(response.data.data);
            } catch (err) {
                setError("Không thể tải lịch sử đặt phòng");
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, []);

    // Cập nhật trạng thái khi người dùng thay đổi đánh giá
    const handleReviewChange = (bookingId, field, value) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [bookingId]: {
                ...prevReviews[bookingId],
                [field]: value
            }
        }));
    };

    // Gửi đánh giá lên server
    const handleSubmitReview = async (bookingId) => {
        const reviewData = reviews[bookingId];

        if (!reviewData || !reviewData.rating || !reviewData.comment) {
            alert('Vui lòng cung cấp đánh giá hợp lệ!');
            return;
        }

        // Lấy userId từ localStorage
        const userId = localStorage.getItem('userId');
        const homestayId = bookings.find((booking) => booking._id === bookingId)?.homestayId?._id;

        if (!userId || !homestayId) {
            alert('Không tìm thấy thông tin người dùng hoặc homestay. Vui lòng đăng nhập lại.');
            return;
        }

        // Thêm userId và homestayId vào dữ liệu đánh giá
        const reviewPayload = {
            ...reviewData,
            userId,  // Gửi userId kèm theo
            homestayId,  // Gửi homestayId
        };

        try {
            const response = await axios.post(`https://homestaymanagement-backend.onrender.com/api/bookings/${bookingId}/review`, reviewPayload);
            alert('Đánh giá của bạn đã được gửi!');

            // Cập nhật trạng thái đã đánh giá trong frontend
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, hasReviewed: true }  // Cập nhật trạng thái đã đánh giá
                        : booking
                )
            );

            // Xóa phần đánh giá vừa gửi khỏi trạng thái
            setReviews((prevReviews) => {
                const updatedReviews = { ...prevReviews };
                delete updatedReviews[bookingId];  // Xóa phần đánh giá vừa gửi
                return updatedReviews;
            });
        } catch (error) {
            console.error("Error submitting review:", error);
            alert('Đã có lỗi xảy ra khi gửi đánh giá.');
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Processing':
                return 'Đang xử lý';
            case 'Booking Successful':
                return 'Đã đặt phòng thành công';
            case 'Checked In':
                return 'Đã nhận phòng';
            case 'Checked Out':
                return 'Đã trả phòng';
            default:
                return status;
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="booking-history-container">
            <h2>Lịch sử Đặt phòng</h2>
            {bookings.length > 0 ? (
                <table className="booking-history-table">
                    <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Số khách</th>
                            <th>Ghi chú</th>
                            <th>Trạng thái</th>
                            <th>Homestay</th> {/* Thêm cột Homestay */}
                            <th>Đánh giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.fullName}</td>
                                <td>{booking.email}</td>
                                <td>{booking.phoneNumber}</td>
                                <td>{booking.address}</td>
                                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                <td>{booking.numberOfGuests}</td>
                                <td>{booking.notes}</td>
                                <td>{getStatusText(booking.status)}</td>
                                <td>{booking.homestayId?.homestayName || 'Không có thông tin homestay'}</td> {/* Hiển thị tên homestay */}
                                <td>
                                    {/* Hiển thị form đánh giá chỉ khi trạng thái là 'Checked Out' và chưa có đánh giá */}
                                    {booking.status === 'Checked Out' && !booking.hasReviewed ? (
                                        <div>
                                            <label>Đánh giá: </label>
                                            <select
                                                onChange={(e) => handleReviewChange(booking._id, 'rating', e.target.value)}
                                                value={reviews[booking._id]?.rating || ''}
                                            >
                                                <option value="">Chọn đánh giá</option>
                                                <option value="1">1⭐️</option>
                                                <option value="2">2⭐️</option>
                                                <option value="3">3⭐️</option>
                                                <option value="4">4⭐️</option>
                                                <option value="5">5⭐️</option>
                                            </select>
                                            <textarea
                                                onChange={(e) => handleReviewChange(booking._id, 'comment', e.target.value)}
                                                value={reviews[booking._id]?.comment || ''}
                                                placeholder="Bình luận..."
                                            />
                                            <button
                                                onClick={() => handleSubmitReview(booking._id)}
                                                disabled={!reviews[booking._id]?.rating || !reviews[booking._id]?.comment}
                                            >
                                                Gửi Đánh Giá
                                            </button>
                                        </div>
                                    ) : (
                                        <p>Đã đánh giá</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Không có lịch sử đặt phòng nào.</p>
            )}
        </div>
    );
};

export default BookingHistory;
