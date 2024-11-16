import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingHistory.css';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');

        if (!storedUserId) {
            setError('User ID không có trong localStorage');
            setLoading(false);
            return;
        }

        // Gọi API để lấy danh sách đặt phòng
        const fetchBookingHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/user-history/${storedUserId}`);
                setBookings(response.data.data);
            } catch (err) {
                setError("Không thể tải lịch sử đặt phòng");
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Hàm ánh xạ trạng thái từ API sang trạng thái người dùng muốn hiển thị
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
