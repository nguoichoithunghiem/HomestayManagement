import React, { useEffect, useState } from 'react';
import './ListBooking.css';
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListBooking = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchName, setSearchName] = useState(""); // Tìm kiếm theo tên khách
    const [searchStatus, setSearchStatus] = useState(""); // Tìm kiếm theo trạng thái

    // Lấy danh sách đặt phòng từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/bookings/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách đặt phòng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching bookings:", error);
        }
    };

    // Xóa đặt phòng
    const removeBooking = async (id) => {
        try {
            const response = await axios.delete(`${url}/api/bookings/remove/${id}`);
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật danh sách bookings
            } else {
                toast.error("Lỗi khi xóa đặt phòng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing booking:", error);
        }
    };

    // Cập nhật trạng thái đặt phòng
    const updateStatus = async (bookingId, newStatus) => {
        try {
            const response = await axios.post(`${url}/api/bookings/update-status`, { id: bookingId, status: newStatus });
            if (response.data.success) {
                toast.success("Trạng thái đã được cập nhật");
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi cập nhật trạng thái");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
            console.error("Error updating status:", error);
        }
    };

    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Hàm để lọc danh sách đặt phòng dựa trên tên và trạng thái
    const filteredList = list.filter(item => {
        const nameMatch = item.fullName.toLowerCase().includes(searchName.toLowerCase());
        const statusMatch = !searchStatus || item.status === searchStatus;
        return nameMatch && statusMatch;
    });

    return (
        <div className='list add flex-col'>
            <div className="header">
                <p>Danh sách Đặt Phòng</p>
                {/* Input tìm kiếm theo tên khách */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên khách"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
                {/* Input tìm kiếm theo trạng thái */}
                <select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="search-input"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Processing">Đang xử lý</option>
                    <option value="Booking Successful">Đặt phòng thành công</option>
                </select>
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Tên Khách</th>
                        <th>Email</th>
                        <th>Số Điện Thoại</th>
                        <th>Địa Chỉ</th>
                        <th>Ngày Nhận Phòng</th>
                        <th>Ngày Trả Phòng</th>
                        <th>Số Khách</th>
                        <th>Trạng Thái</th>
                        <th>Homestay</th> {/* Cột mới để hiển thị tên homestay */}
                        <th>Số Phòng</th> {/* Thêm cột số phòng */}
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.length > 0 ? (
                        filteredList.map((item) => (
                            <tr key={item._id}>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.address}</td>
                                <td>{new Date(item.checkInDate).toLocaleDateString()}</td>
                                <td>{new Date(item.checkOutDate).toLocaleDateString()}</td>
                                <td>{item.numberOfGuests}</td>
                                <td>
                                    <select
                                        value={item.status}
                                        onChange={(e) => updateStatus(item._id, e.target.value)} // Cập nhật trạng thái
                                    >
                                        <option value="Processing">Đang xử lý</option>
                                        <option value="Booking Successful">Đặt phòng thành công</option>
                                        <option value="Checked In">Đã nhận phòng</option>
                                        <option value="Checked Out">Đã trả phòng</option> {/* Thêm trạng thái "Checked Out" */}
                                    </select>
                                </td>
                                <td>{item.homestayId?.homestayName}</td>
                                <td>{item.roomNumber || 'Chưa có phòng'}</td> {/* Hiển thị số phòng nếu có */}
                                <td>
                                    <NavLink to={`/update-booking/${item._id}`}>
                                        <button className="edit-button">Sửa</button>
                                    </NavLink>
                                    <button onClick={() => removeBooking(item._id)} className='cursor'>X</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" style={{ textAlign: 'center' }}>Không có đặt phòng nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListBooking;
