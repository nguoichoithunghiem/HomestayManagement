import React, { useEffect, useState } from 'react';
import './ListHomestay.css';
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListHomestay = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchName, setSearchName] = useState(""); // Thêm state cho tìm kiếm theo tên
    const [searchStatus, setSearchStatus] = useState(""); // Thêm state cho tìm kiếm theo trạng thái

    // Lấy danh sách homestay từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/homestay/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách homestay");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching homestays:", error);
        }
    };

    // Xóa homestay
    const removeHomestay = async (homestayId) => {
        try {
            const response = await axios.post(`${url}/api/homestay/remove`, { id: homestayId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa homestay");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing homestay:", error);
        }
    };

    // Hàm để cập nhật trạng thái homestay
    const updateStatus = async (homestayId, newStatus) => {
        try {
            const response = await axios.post(`${url}/api/homestay/update-status`, { id: homestayId, status: newStatus });
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

    // Hàm để lọc danh sách homestay dựa trên tên và trạng thái
    const filteredList = list.filter(item => {
        const nameMatch = item.homestayName.toLowerCase().includes(searchName.toLowerCase());
        const statusMatch = !searchStatus || item.status === searchStatus;
        return nameMatch && statusMatch;
    });

    return (
        <div className='list add flex-col'>
            <div className="header">
                <p>Danh sách Homestay</p>
                <NavLink to="/add-homestay">
                    <button className="add-button">Thêm Homestay</button>
                </NavLink>
                {/* Input tìm kiếm theo tên */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên homestay"
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
                    <option value="available">Có sẵn</option>
                    <option value="unavailable">Không có sẵn</option>
                </select>
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên Homestay</th>
                        <th>Địa chỉ</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Loại Homestay</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img src={`${url}/images/${item.homestayImage}`} alt={item.homestayName} className="homestay-image" />
                            </td>
                            <td>{item.homestayName}</td>
                            <td>{item.homestayAddress}</td>
                            <td>{item.homestayPrice}.000 VNĐ / Ngày</td>
                            <td>{item.homestayDescription}</td>
                            <td>{item.homestayCategory}</td>
                            <td>
                                <select
                                    value={item.status}
                                    onChange={(e) => updateStatus(item._id, e.target.value)} // Cập nhật trạng thái ngay lập tức
                                >
                                    <option value='available'>có sẵn</option>
                                    <option value='unavailable'>không có sẵn</option>
                                </select>
                            </td>
                            <td>
                                <NavLink to={`/update-homestay/${item._id}`}>
                                    <button className="edit-button">Sửa</button>
                                </NavLink>
                                <p onClick={() => removeHomestay(item._id)} className='cursor'>X</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListHomestay;
