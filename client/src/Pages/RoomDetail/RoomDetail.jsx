import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./RoomDetail.css"; // Đảm bảo file CSS này tồn tại
import { assets } from "../../assets/assets"; // Đảm bảo rằng assets được định nghĩa
import { Link } from "react-router-dom";

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`https://homestaymanagement-backend.onrender.com/api/room/${id}`);
                if (response.data.success) {
                    setRoom(response.data.data);
                } else {
                    setError('Không tìm thấy phòng.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [id]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            <div className="detail-khoiheader">
                <img className="detail-nenpage" src={assets.nendetail} alt="Background" />
                <div className="detail-text-overlay">Chi tiết Phòng</div>
            </div>
            <div className="detail-hinhanh-gia">
                <div className="detail-khoi detail-khoi1">
                    <h1 className="detail-name-room">Phòng {room.roomNumber}</h1>
                    <img src={`http://localhost:5000/images/${encodeURIComponent(room.roomImage)}`} alt={room.roomDescription} />
                </div>
                <div className="detail-khoi detail-khoi2">
                    <div className="detail-price-button">
                        <div className="detail-price">Giá từ: {room.roomPrice} VNĐ/Đêm</div>
                        <div className="detail-buttonLH">
                            <Link to={`/homestay`}>Đặt phòng tại trang HomeStay</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-content2">
                <div>
                    <div className="detail-title detail-contact">#1. Thông tin phòng</div>
                    <table border="1" className="detail-table">
                        <tbody>
                            <tr>
                                <td>Loại phòng</td>
                                <td>{room.roomType}</td>
                            </tr>
                            <tr>
                                <td>Trạng thái</td>
                                <td>{room.roomStatus === 'available' ? 'Còn trống' : room.roomStatus}</td>
                            </tr>
                            <tr>
                                <td>HomeStay</td>
                                <td>{room.homestayId ? room.homestayId.homestayName : 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="detail-title detail-description">#2. Mô tả</div>
                    <div className="detail-description1">{room.roomDescription}</div>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
