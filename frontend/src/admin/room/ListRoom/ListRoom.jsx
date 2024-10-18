import React, { useEffect, useState } from 'react';
import './ListRoom.css';
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListRoom = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/room/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching room list");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error("Error fetching rooms:", error);
        }
    };

    const removeRoom = async (roomId) => {
        try {
            const response = await axios.post(`${url}/api/room/remove`, { id: roomId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error("Error removing room");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
            console.error("Error removing room:", error);
        }
    };

    const updateStatus = async (roomId, newStatus) => {
        try {
            const response = await axios.post(`${url}/api/room/update-status`, { id: roomId, roomStatus: newStatus });
            if (response.data.success) {
                toast.success("Status updated successfully");
                await fetchList();
            } else {
                toast.error("Error updating status");
            }
        } catch (error) {
            toast.error("An error occurred while updating status");
            console.error("Error updating status:", error);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const filteredList = list.filter(item => {
        const nameMatch = item.roomNumber.toLowerCase().includes(searchName.toLowerCase());
        const statusMatch = !searchStatus || item.roomStatus === searchStatus;
        return nameMatch && statusMatch;
    });

    return (
        <div className='list add flex-col'>
            <div className="header">
                <p>Danh sách phòng</p>
                <NavLink to="/add-room">
                    <button className="add-button">Thêm phòng</button>
                </NavLink>
                <input
                    type="text"
                    placeholder="Tìm theo số phòng"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
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
                        <th>Số phòng</th>
                        <th>Loại phòng</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Homestay</th> {/* Column for Homestay Name */}
                        <th>Tình trạng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img src={`${url}/images/${item.roomImage}`} alt={item.roomNumber} className="room-image" />
                            </td>
                            <td>{item.roomNumber}</td>
                            <td>{item.roomType}</td>
                            <td>{item.roomPrice}.000 VNĐ/ Ngày</td>
                            <td>{item.roomDescription}</td>
                            <td>{item.homestayId ? item.homestayId.homestayName : 'N/A'}</td> {/* Display Homestay Name */}
                            <td>
                                <select
                                    value={item.roomStatus}
                                    onChange={(e) => updateStatus(item._id, e.target.value)}
                                >
                                    <option value='available'>có sẵn</option>
                                    <option value='unavailable'>không có sẵn</option>
                                </select>
                            </td>
                            <td>
                                <NavLink to={`/update-room/${item._id}`}>
                                    <button className="edit-button">Sửa</button>
                                </NavLink>
                                <p onClick={() => removeRoom(item._id)} className='cursor'>X</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListRoom;
