import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Booking.css";
import { assets } from "../../assets/assets";

const Booking = () => {
    const { homestayId } = useParams();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: 1,
        notes: "",
        roomNumber: "", // Optional field
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:5000/api/bookings`, {
                ...formData,
                homestayId,
            });
            if (response.data.success) {
                setSuccessMessage("Đặt phòng thành công!");
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    checkInDate: "",
                    checkOutDate: "",
                    numberOfGuests: 1,
                    notes: "",
                    roomNumber: "",
                });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Đã có lỗi xảy ra: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="booking-khoiheader">
                <img className="booking-nenpage" src={assets.nenbooking} alt="" />
                <div className="booking-text-overlay">Đặt phòng</div>
            </div>
            <div className="booking-contact">
                <div className="booking-kichthuoc">
                    <div className="booking-contact1 contact1">
                        <div className="booking-ellipse-icon">
                            <div className="booking-ellipse"></div>
                            <img src={assets.placewhite} alt="" />
                        </div>
                        <div className="booking-title-contact">Address</div>
                        <div className="booking-note-title">123 Lê Duẩn, Q1, TP.HCM</div>
                    </div>
                    <div className="booking-contact1 contact2">
                        <div className="booking-ellipse-icon">
                            <div className="booking-ellipse"></div>
                            <img src={assets.phonewhite} alt="" />
                        </div>
                        <div className="booking-title-contact">Contact Number</div>
                        <div className="booking-note-title">+ 1235 4678 89</div>
                    </div>
                    <div className="booking-contact1 contact3">
                        <div className="booking-ellipse-icon">
                            <div className="booking-ellipse"></div>
                            <img src={assets.sentwhite} alt="" />
                        </div>
                        <div className="booking-title-contact">Email Address</div>
                        <div className="booking-note-title">info@yoursite.com</div>
                    </div>
                    <div className="booking-contact1 contact4">
                        <div className="booking-ellipse-icon">
                            <div className="booking-ellipse"></div>
                            <img src={assets.world} alt="" />
                        </div>
                        <div className="booking-title-contact">Website</div>
                        <div className="booking-note-title">yoursite.com</div>
                    </div>
                </div>
            </div>
            <div className="booking-content2">
                <div className="booking-column booking-column1">
                    <div className="booking-tenphong">Phòng Luxury</div>
                    <div>HomeStay: chất lượng và san trọng</div>
                    <div>Địa điểm: Gần những điểm du lịch</div>
                    <div>Số lượng người tối đa: 4 </div>
                    <div>Giảm giá: 0% </div>
                    <div className="booking-icon-phone">
                        <div className="booking-iconphone">
                            <img src={assets.hotline} alt="" />
                        </div>
                        <div className="booking-phone">
                            <div>0123.465.789</div>
                            <div>0123.465.789</div>
                        </div>
                    </div>
                    <div className="booking-icon-travel">
                        <img src={assets.travel} alt="" />
                    </div>
                </div>
                <div className="booking-column booking-column2">
                    <h2>Thông tin đặt phòng</h2>
                    {successMessage && <div>{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Họ tên</div>
                                <div className="booking-kitu">(*)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="text"
                                name="fullName"
                                placeholder="Họ và tên"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Email</div>
                                <div className="booking-kitu">(*)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Số điện thoại</div>
                                <div className="booking-kitu">(*)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="text"
                                name="phoneNumber"
                                placeholder="Số điện thoại"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Địa chỉ</div>
                                <div className="booking-kitu">(*)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Ngày nhận phòng</div>
                                <div className="booking-kitu">(*)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="date"
                                name="checkInDate"
                                value={formData.checkInDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Ngày trả phòng</div>
                                <div className="booking-kitu">(*)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="date"
                                name="checkOutDate"
                                value={formData.checkOutDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Số lượng khách</div>
                                <div className="booking-kitu">(*)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="number"
                                name="numberOfGuests"
                                value={formData.numberOfGuests}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Số phòng (nếu có)</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="text"
                                name="roomNumber"
                                placeholder="Số phòng (nếu có)"
                                value={formData.roomNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Ghi chú</div>
                            </div>
                            <textarea
                                className="booking-timkiem"
                                name="notes"
                                placeholder="Ghi chú"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="booking-button" type="submit" disabled={loading}>
                            {loading ? "Đang đặt..." : "Đặt phòng"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
