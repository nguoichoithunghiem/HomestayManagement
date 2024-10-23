// src/Room.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Room.css";
import { assets } from "../../assets/assets";

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room/list');
                // Lọc các phòng có trạng thái 'available'
                const availableRooms = response.data.data.filter(room => room.roomStatus === 'available');
                setRooms(availableRooms);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            <div className="khoiheader">
                <img className="nenpage" src={assets.nenhomestay2} alt="" />
                <div className="text-overlay">Phòng</div>
            </div>
            <div className="filter-bar">
                <select className="option1">
                    <option value="">Chọn Phòng</option>
                    {rooms.map(room => (
                        <option key={room._id} value={room._id}>
                            {room.roomNumber}
                        </option>
                    ))}
                </select>
                <select>
                    <option value="">Chọn Địa Điểm</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hochiminh">Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                </select>
                <select>
                    <option value="">Khoảng Giá</option>
                    <option value="500000">Dưới 500.000 VNĐ</option>
                    <option value="1000000">500.000 VNĐ - 1.000.000 VNĐ</option>
                    <option value="2000000">Trên 1.000.000 VNĐ</option>
                </select>
                <button type="button">Search</button>
            </div>
            <div className="room-content">
                {rooms.map((room) => (
                    <div key={room._id} className="room-box">
                        <div className="room-price">
                            <h1>{room.roomPrice} VNĐ/Đêm</h1>
                        </div>
                        <div className="room-boxdetail">
                            <h1>Phòng: {room.roomNumber}</h1>
                            {/* Kiểm tra và hiển thị tên HomeStay */}
                            <div>HomeStay: {room.homestayId ? room.homestayId.homestayName : 'N/A'}</div>
                            <div>Mô tả: {room.roomDescription}</div>
                            <div>Loại phòng: {room.roomType}</div>
                            <div className="room-button-xemthem">Xem thêm</div>
                        </div>
                        <img src={`http://localhost:5000/images/${encodeURIComponent(room.roomImage)}`} alt={room.roomDescription} />
                    </div>
                ))}
            </div>
            <div className="footer">
                <div className="contentoffooter">
                    <div className="cot cot1">
                        <div>Về chúng tôi</div>
                        <div className="chuxam">
                            <div>Khám phá các địa điểm yêu thích của bạn tại Hạ Long</div>
                        </div>
                    </div>
                    <div className="cot cot2">
                        <div>Menu</div>
                        <div className="chuxam">
                            <div>Trang chủ</div>
                            <div>Giới thiệu</div>
                            <div>HomeStay</div>
                            <div>Tin tức</div>
                            <div>Liên hệ</div>
                            <div>Đăng ký</div>
                            <div>Đăng nhập</div>
                        </div>
                    </div>
                    <div className="cot cot3">
                        <div>Thông tin địa chỉ</div>
                        <div className="diachi">
                            <div className="tenduongvaicon">
                                <img className="iconplacecolor" src={assets.iconplacecolor} alt="" />
                                <div className="tenduong">Đ. Hoàng Quốc Việt, Hùng Thắng, Thành phố Hạ Long, Quảng Ninh</div>
                            </div>
                            <div className="phonevaicon">
                                <img className="iconplacecolor" src={assets.iconphone} alt="" />
                                <div className="sophone">0123456798</div>
                            </div>
                            <div className="sendvaicon">
                                <img className="iconplacecolor" src={assets.iconsend} alt="" />
                                <div className="email">vantruong@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={assets.nenfooter} alt="" />
            </div>
        </div>
    );
};

export default Room;
