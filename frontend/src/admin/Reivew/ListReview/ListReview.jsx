import React, { useEffect, useState } from 'react';
import './ListReview.css'; // Thêm file CSS cho giao diện
import axios from 'axios';
import { toast } from 'react-toastify';

const ListReview = ({ url }) => {
    const [reviews, setReviews] = useState([]);  // Lưu danh sách đánh giá
    const [searchName, setSearchName] = useState("");  // Tìm kiếm theo tên khách
    const [searchRating, setSearchRating] = useState("");  // Tìm kiếm theo đánh giá
    const [homestays, setHomestays] = useState({});  // Lưu thông tin homestay đã lấy

    // Lấy danh sách đánh giá từ API
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${url}/api/reviews`);  // API lấy danh sách đánh giá
            if (response.data.reviews) {
                setReviews(response.data.reviews);
                // Sau khi lấy đánh giá, lấy thông tin homestay
                fetchHomestayDetails(response.data.reviews);
            } else {
                toast.error("Lỗi khi lấy danh sách đánh giá");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi lấy danh sách đánh giá");
            console.error("Error fetching reviews:", error);
        }
    };

    // Lấy thông tin homestay từ homestayId
    const fetchHomestayDetails = async (reviews) => {
        let homestayData = {};
        // Lọc ra các homestayId duy nhất
        const homestayIds = [...new Set(reviews.map((review) => review.homestayId))];

        // Gọi API để lấy thông tin cho từng homestayId duy nhất
        for (const homestayId of homestayIds) {
            if (homestayId) {
                try {
                    // Giả sử bạn có API `/api/homestay/{id}` để lấy thông tin homestay
                    const response = await axios.get(`${url}/api/homestay/${homestayId}`);
                    homestayData[homestayId] = response.data.homestayName;
                } catch (error) {
                    console.error("Error fetching homestay details:", error);
                }
            }
        }

        // Cập nhật dữ liệu homestay vào state
        setHomestays(homestayData);
    };

    // Xóa đánh giá
    const removeReview = async (id) => {
        try {
            // Gửi yêu cầu DELETE đến API để xóa đánh giá
            const response = await axios.delete(`${url}/api/reviews/remove/${id}`);
            if (response.data.success) {
                toast.success("Đánh giá đã được xóa");
                await fetchReviews(); // Cập nhật lại danh sách sau khi xóa
            } else {
                toast.error("Lỗi khi xóa đánh giá");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing review:", error);
        }
    };

    // Gọi fetchReviews khi component được mount
    useEffect(() => {
        fetchReviews();
    }, []);

    // Hàm để lọc danh sách đánh giá dựa trên tên khách và rating
    const filteredReviews = reviews.filter((item) => {
        const nameMatch = item.userId?.fullName.toLowerCase().includes(searchName.toLowerCase());
        const ratingMatch = !searchRating || item.rating === parseInt(searchRating);
        return nameMatch && ratingMatch;
    });

    return (
        <div className='list-reviews flex-col'>
            <div className="header">
                <p>Danh sách Đánh Giá</p>
                {/* Input tìm kiếm theo tên khách */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên khách"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
                {/* Input tìm kiếm theo rating */}
                <select
                    value={searchRating}
                    onChange={(e) => setSearchRating(e.target.value)}
                    className="search-input"
                >
                    <option value="">Tất cả mức đánh giá</option>
                    <option value="1">1 sao</option>
                    <option value="2">2 sao</option>
                    <option value="3">3 sao</option>
                    <option value="4">4 sao</option>
                    <option value="5">5 sao</option>
                </select>
            </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th>Tên Khách</th>
                        <th>Email</th>
                        <th>Đánh Giá</th>
                        <th>Bình Luận</th>
                        <th>Homestay</th> {/* Thêm cột Homestay */}
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
                            <tr key={review._id}>
                                <td>{review.userId?.fullName}</td>
                                <td>{review.userId?.email}</td>
                                <td>{review.rating} sao</td>
                                <td>{review.comment}</td>
                                {/* Hiển thị tên homestay */}
                                <td>{homestays[review.homestayId] || 'Đang tải thông tin homestay...'}</td>
                                <td>
                                    <button
                                        onClick={() => removeReview(review._id)}
                                        className='cursor'
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>Không có đánh giá nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListReview;
