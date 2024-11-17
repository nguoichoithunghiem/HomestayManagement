import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./HomestayDetail.css"; // Đổi tên file CSS nếu cần
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const HomestayDetail = () => {
    const { id } = useParams();
    const [homestay, setHomestay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kiểm tra xem người dùng có đăng nhập hay không (dựa vào token trong localStorage)
    useEffect(() => {
        const token = localStorage.getItem("token"); // Hoặc sessionStorage.getItem("token") tuỳ vào cách lưu
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const fetchHomestay = async () => {
            try {
                const response = await axios.get(`https://homestaymanagement-backend.onrender.com/api/homestay/${id}`);
                if (response.data.success) {
                    setHomestay(response.data.data);
                } else {
                    setError('Không tìm thấy homestay.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHomestay();
    }, [id]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            <div className="detail-khoiheader">
                <img className="detail-nenpage" src={assets.nendetail} alt="" />
                <div className="detail-text-overlay">HomeStay</div>
            </div>
            <div className="detail-hinhanh-gia">
                <div className="detail-khoi detail-khoi1">
                    <h1 className="detail-name-homestay">{homestay.homestayName}</h1>
                    <img src={`http://localhost:5000/images/${encodeURIComponent(homestay.homestayImage)}`} alt={homestay.homestayName} />
                </div>
                <div className="detail-khoi detail-khoi2">
                    <div className="detail-price-button">
                        <div className="detail-price">Giá từ: {homestay.homestayPrice}.000 VNĐ</div>
                        <div className="detail-buttonLH">
                            {/* Kiểm tra xem người dùng đã đăng nhập chưa */}
                            {isLoggedIn ? (
                                homestay.homestayCategory === "nguyên căn" ? (
                                    <Link to={`/booking/${homestay._id}`}>Đặt Homestay</Link>
                                ) : (
                                    <Link to={`/booking/${homestay._id}`}>Đặt Phòng</Link>
                                )
                            ) : (
                                <Link to="/login">Đăng nhập để đặt phòng</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-content2">
                <div>
                    <div className="detail-title detail-contact">#1. Thông tin liên hệ</div>
                    <table border="1" className="detail-table">
                        <tbody>
                            <tr>
                                <td>Địa điểm</td>
                                <td>Gần rạp chiếu phim CGV</td>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <td>{homestay.homestayAddress}</td>
                            </tr>
                            <tr>
                                <td>Điện thoại</td>
                                <td>01233456789</td>
                            </tr>
                            <tr>
                                <td>Giá từ</td>
                                <td>{homestay.homestayPrice}.000VNĐ</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="detail-title detail-description">#2. Mô tả</div>
                    <div className="detail-description1">
                        {homestay.homestayDescription}
                    </div>
                    <div className="detail-title detail-description">#3. Nội dung</div>
                    <div className="detail-description1">Giá tầm trung</div>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default HomestayDetail;
