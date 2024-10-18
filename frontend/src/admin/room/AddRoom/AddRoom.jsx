import React, { useEffect, useState } from 'react';
import './AddRoom.css';
import { assets } from '../../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const AddRoom = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        roomNumber: "",         // New field
        roomType: "",           // New field
        roomPrice: "",
        roomDescription: "",
        status: "available",
        homestayId: "",
    });
    const [homestays, setHomestays] = useState([]);

    const fetchHomestays = async () => {
        try {
            const response = await axios.get(`${url}/api/homestay/list`);
            if (response.data.success) {
                setHomestays(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách homestay");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi lấy danh sách homestay");
            console.error("Error fetching homestays:", error);
        }
    };

    useEffect(() => {
        fetchHomestays();
    }, []);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Log form data for debugging
        console.log("Form Data:", data);

        const formData = new FormData();
        formData.append("roomNumber", data.roomNumber); // Add roomNumber
        formData.append("roomType", data.roomType);     // Add roomType
        formData.append("roomPrice", data.roomPrice);
        formData.append("roomDescription", data.roomDescription);
        if (image) {
            formData.append("roomImage", image);
        }
        formData.append("status", data.status);
        formData.append("homestayId", data.homestayId);

        try {
            const response = await axios.post(`${url}/api/room/add`, formData);
            if (response.data.success) {
                setData({
                    roomNumber: "",
                    roomType: "",
                    roomPrice: "",
                    roomDescription: "",
                    status: "available",
                    homestayId: "",
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm phòng");
            console.error("Error:", error.response ? error.response.data : error);
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Tải lên hình ảnh</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-room-number flex-col">
                    <p>Số phòng</p>
                    <input onChange={onChangeHandler} value={data.roomNumber} type="text" name='roomNumber' placeholder='Nhập số phòng' required />
                </div>
                <div className="add-room-type flex-col">
                    <p>Loại phòng</p>
                    <input onChange={onChangeHandler} value={data.roomType} type="text" name='roomType' placeholder='Nhập loại phòng' required />
                </div>
                <div className="add-room-description flex-col">
                    <p>Mô tả phòng</p>
                    <textarea onChange={onChangeHandler} value={data.roomDescription} name="roomDescription" rows="6" placeholder='Viết mô tả phòng ở đây' required></textarea>
                </div>
                <div className="add-room-price flex-col">
                    <p>Giá phòng</p>
                    <input onChange={onChangeHandler} value={data.roomPrice} type="number" name='roomPrice' placeholder='Giá phòng' required />
                </div>
                <div className="add-homestay flex-col">
                    <p>Chọn Homestay</p>
                    <select onChange={onChangeHandler} name="homestayId" value={data.homestayId} required>
                        <option value="">Chọn homestay</option>
                        {homestays.map(homestay => (
                            <option key={homestay._id} value={homestay._id}>
                                {homestay.homestayName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="add-status flex-col">
                    <p>Trạng thái phòng</p>
                    <select onChange={onChangeHandler} name="status" value={data.status}>
                        <option value="available">Có sẵn</option>
                        <option value="unavailable">Không có sẵn</option>
                    </select>
                </div>
                <button type='submit' className='add-btn'>THÊM PHÒNG</button>
            </form>
        </div>
    );
};

export default AddRoom;
