import React, { useEffect, useState } from 'react';
import './ListUser.css'; // Đảm bảo bạn đã tạo file CSS
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListUser = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchRole, setSearchRole] = useState("");

    // Lấy danh sách người dùng từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/users/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách người dùng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching users:", error);
        }
    };

    // Xóa người dùng
    const removeUser = async (userId) => {
        try {
            const response = await axios.post(`${url}/api/users/remove`, { id: userId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa người dùng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing user:", error);
        }
    };

    // Hàm để cập nhật vai trò người dùng
    const updateRole = async (userId, newRole) => {
        try {
            const response = await axios.put(`${url}/api/users/update-role/${userId}`, { role: newRole });
            if (response.data.success) {
                toast.success("Cập nhật vai trò thành công");
                await fetchList(); // Làm mới danh sách sau khi cập nhật
            } else {
                toast.error("Lỗi khi cập nhật vai trò: " + response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật vai trò: " + error.response?.data?.message || error.message);
            console.error("Error updating role:", error);
        }
    };

    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Hàm để lọc danh sách người dùng dựa trên tên và vai trò
    const filteredList = list.filter(item => {
        const nameMatch = item.fullName.toLowerCase().includes(searchName.toLowerCase());
        const roleMatch = !searchRole || item.role === searchRole;
        return nameMatch && roleMatch;
    });

    return (
        <div className='list'>
            <div className="header">
                <p>Danh sách Người Dùng</p>
                <NavLink to="/add-user">
                    <button className="add-button">Thêm Người Dùng</button>
                </NavLink>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên người dùng"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
                <select
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="search-input"
                >
                    <option value="">Tất cả vai trò</option>
                    <option value="user">Người dùng</option>
                    <option value="admin">Quản trị viên</option>
                </select>
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Tên Người Dùng</th>
                        <th>Email</th>
                        <th>Điện Thoại</th>
                        <th>Địa Chỉ</th>
                        <th>Vai Trò</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.address}</td>
                            <td>
                                <select
                                    value={item.role}
                                    onChange={(e) => updateRole(item._id, e.target.value)}
                                >
                                    <option value="user">Người dùng</option>
                                    <option value="admin">Quản trị viên</option>
                                </select>
                            </td>
                            <td>
                                <NavLink to={`/update-user/${item._id}`}>
                                    <button className="edit-button">Sửa</button>
                                </NavLink>
                                <p onClick={() => removeUser(item._id)} className='cursor'>X</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUser;
