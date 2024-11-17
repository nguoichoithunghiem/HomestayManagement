import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Room.css";
import { assets } from "../../assets/assets";

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Các trạng thái cho các bộ lọc
    const [homestayId, setHomestayId] = useState(""); // HomeStay
    const [priceRange, setPriceRange] = useState(""); // Khoảng giá
    const [roomType, setRoomType] = useState(""); // Loại phòng

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('https://homestaymanagement-backend.onrender.com/api/room/list');
                const availableRooms = response.data.data.filter(room => room.roomStatus === 'available');
                setRooms(availableRooms);
                setFilteredRooms(availableRooms); // Mặc định hiển thị tất cả
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    // Hàm lọc phòng theo các tiêu chí
    const filterRooms = () => {
        let filtered = [...rooms];

        // Lọc theo HomeStay
        if (homestayId) {
            filtered = filtered.filter(room => room.homestayId && room.homestayId._id === homestayId);
        }

        // Lọc theo loại phòng
        if (roomType) {
            filtered = filtered.filter(room => room.roomType.toLowerCase() === roomType.toLowerCase());
        }

        // Lọc theo khoảng giá
        if (priceRange) {
            const priceLimit = parseInt(priceRange, 10);
            if (priceLimit === 500000) {
                filtered = filtered.filter(room => room.roomPrice <= 500);
            } else if (priceLimit === 1000000) {
                filtered = filtered.filter(room => room.roomPrice > 500 && room.roomPrice <= 1000);
            } else if (priceLimit === 2000000) {
                filtered = filtered.filter(room => room.roomPrice > 1000);
            }
        }

        setFilteredRooms(filtered); // Cập nhật danh sách đã lọc
    };

    // Xử lý sự thay đổi của các bộ lọc
    const handleHomestayChange = (e) => {
        setHomestayId(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
    };

    // Gọi hàm lọc mỗi khi một trong các bộ lọc thay đổi
    useEffect(() => {
        filterRooms();
    }, [homestayId, priceRange, roomType]);

    // Định dạng giá tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price * 1000); // Nhân với 1000 để hiển thị đúng giá
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            <div className="khoiheader">
                <img className="nenpage" src={assets.nenhomestay2} alt="" />
                <div className="text-overlay">Phòng</div>
            </div>
            <div className="filter-bar">
                {/* Bộ lọc HomeStay */}
                <select className="option12" value={homestayId} onChange={handleHomestayChange}>
                    <option value="">Chọn HomeStay</option>
                    {rooms.map(room => room.homestayId && (
                        <option key={room.homestayId._id} value={room.homestayId._id}>
                            {room.homestayId.homestayName}
                        </option>
                    ))}
                </select>

                {/* Bộ lọc Khoảng giá */}
                <select value={priceRange} onChange={handlePriceRangeChange}>
                    <option value="">Khoảng Giá</option>
                    <option value="500000">Dưới 500.000 VNĐ</option>
                    <option value="1000000">500.000 VNĐ - 1.000.000 VNĐ</option>
                    <option value="2000000">Trên 1.000.000 VNĐ</option>
                </select>

                {/* Bộ lọc Loại phòng */}
                <select value={roomType} onChange={handleRoomTypeChange}>
                    <option value="">Chọn Loại Phòng</option>
                    <option value="Phòng đơn">Phòng đơn</option>
                    <option value="Phòng đôi">Phòng đôi</option>
                    <option value="Phòng gia đình">Phòng gia đình</option>
                </select>

                <button type="button" onClick={filterRooms}>Tìm Kiếm</button>
            </div>

            <div className="room-content">
                {filteredRooms.map((room) => (
                    <div key={room._id} className="room-box">
                        <div className="room-price">
                            <h1>{formatPrice(room.roomPrice)} / Đêm</h1>
                        </div>
                        <div className="room-boxdetail">
                            <h1>Phòng: {room.roomNumber}</h1>
                            <div>HomeStay: {room.homestayId ? room.homestayId.homestayName : 'N/A'}</div>
                            <div>Loại phòng: {room.roomType}</div>
                            <div className="room-button-xemthem">
                                <Link to={`/room/${room._id}`}>Xem thêm</Link>
                            </div>
                        </div>
                        <img src={`https://homestaymanagement-backend.onrender.com/images/${encodeURIComponent(room.roomImage)}`} alt={room.roomDescription} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Room;
