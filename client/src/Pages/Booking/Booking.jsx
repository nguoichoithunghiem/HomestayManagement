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
    const [errorMessage, setErrorMessage] = useState("");  // State to hold error messages

    // Lấy ID người dùng từ localStorage hoặc bất kỳ phương thức nào khác
    const userId = localStorage.getItem("userId");

    // Hàm kiểm tra email hợp lệ
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    // Hàm kiểm tra số điện thoại hợp lệ (giả sử số điện thoại phải có 10 chữ số)
    const isValidPhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phoneNumber);
    };

    // Hàm kiểm tra ngày nhận phòng và trả phòng
    const isValidDateRange = (checkInDate, checkOutDate) => {
        return new Date(checkInDate) < new Date(checkOutDate);
    };

    // Hàm kiểm tra số lượng khách
    const isValidNumberOfGuests = (numberOfGuests) => {
        return numberOfGuests > 0;
    };

    // Hàm xử lý sự thay đổi trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Hàm xử lý form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");  // Reset error message on form submission

        // Kiểm tra các trường bắt buộc
        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.address ||
            !formData.checkInDate || !formData.checkOutDate || !formData.numberOfGuests) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin!");
            setLoading(false);
            return;
        }

        // Kiểm tra email hợp lệ
        if (!isValidEmail(formData.email)) {
            setErrorMessage("Email không hợp lệ!");
            setLoading(false);
            return;
        }

        // Kiểm tra số điện thoại hợp lệ
        if (!isValidPhoneNumber(formData.phoneNumber)) {
            setErrorMessage("Số điện thoại không hợp lệ (phải có 10 chữ số)!");
            setLoading(false);
            return;
        }

        // Kiểm tra ngày trả phòng phải sau ngày nhận phòng
        if (!isValidDateRange(formData.checkInDate, formData.checkOutDate)) {
            setErrorMessage("Ngày trả phòng phải sau ngày nhận phòng!");
            setLoading(false);
            return;
        }

        // Kiểm tra số lượng khách hợp lệ
        if (!isValidNumberOfGuests(formData.numberOfGuests)) {
            setErrorMessage("Số lượng khách phải lớn hơn 0!");
            setLoading(false);
            return;
        }

        try {
            // Gửi dữ liệu lên API
            const response = await axios.post(`http://localhost:5000/api/bookings`, {
                ...formData,
                homestayId,
                userId,
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
                    roomNumber: "", // Reset roomNumber
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
            
            <div className="booking-content2">
                <div className="booking-column booking-column1">
                    {/* Homestay information */}
                    <div className="booking-tenphong">Phòng Luxury</div>
                    <div>HomeStay: chất lượng và sang trọng</div>
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
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                        {/* Optional Room Number field */}
                        <div className="booking-hoten">
                            <div className="booking-tieude">
                                <div>Số phòng</div>
                            </div>
                            <input
                                className="booking-timkiem"
                                type="text"
                                name="roomNumber"
                                placeholder="Số phòng (Nếu có)"
                                value={formData.roomNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="booking-hoten">
                            <div className="booking-tieude">Ghi chú</div>
                            <textarea
                                className="booking-timkiem"
                                name="notes"
                                placeholder="Ghi chú"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Đang xử lý..." : "Đặt phòng"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
