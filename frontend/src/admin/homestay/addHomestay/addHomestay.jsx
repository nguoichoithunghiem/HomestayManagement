import React, { useState } from 'react';
import './addHomestay.css';  // Giả sử bạn sử dụng cùng một kiểu dáng
import { assets } from '../../../assets/assets'; // Thư viện assets của bạn
import axios from "axios";
import { toast } from 'react-toastify';

const AddHomestay = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        homestayName: "",
        homestayAddress: "",
        homestayPrice: "",
        homestayDescription: "",
        homestayCategory: "Nguyên căn", // Có thể sửa theo danh mục bạn muốn
        status: "available" // Thêm trạng thái
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("homestayName", data.homestayName);
        formData.append("homestayAddress", data.homestayAddress);
        formData.append("homestayPrice", data.homestayPrice);
        formData.append("homestayDescription", data.homestayDescription);
        formData.append("homestayCategory", data.homestayCategory);
        formData.append("homestayImage", image);
        formData.append("status", data.status); // Thêm trạng thái vào formData

        try {
            const response = await axios.post(`${url}/api/homestay/add`, formData);
            if (response.data.success) {
                setData({
                    homestayName: "",
                    homestayAddress: "",
                    homestayPrice: "",
                    homestayDescription: "",
                    homestayCategory: "Nguyên căn", // Đặt lại về giá trị mặc định
                    status: "available" // Đặt lại trạng thái mặc định
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm homestay");
            console.error("Error:", error);
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
                <div className="add-homestay-name flex-col">
                    <p>Tên homestay</p>
                    <input onChange={onChangeHandler} value={data.homestayName} type="text" name='homestayName' placeholder='Nhập tên homestay' required />
                </div>
                <div className="add-homestay-address flex-col">
                    <p>Địa chỉ homestay</p>
                    <input onChange={onChangeHandler} value={data.homestayAddress} type="text" name='homestayAddress' placeholder='Nhập địa chỉ' required />
                </div>
                <div className="add-homestay-description flex-col">
                    <p>Mô tả homestay</p>
                    <textarea onChange={onChangeHandler} value={data.homestayDescription} name="homestayDescription" rows="6" placeholder='Viết nội dung ở đây' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Danh mục homestay</p>
                        <select onChange={onChangeHandler} name="homestayCategory">
                            <option value="Nguyên căn">Nguyên căn</option>
                            <option value="Phòng">Phòng</option>
                        </select>
                    </div>
                    <div className="div add-price flex-col">
                        <p>Giá homestay</p>
                        <input onChange={onChangeHandler} value={data.homestayPrice} type="number" name='homestayPrice' placeholder='$20' required />
                    </div>
                </div>
                <div className="add-status flex-col">
                    <p>Trạng thái homestay</p>
                    <select onChange={onChangeHandler} name="status">
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>
                <button type='submit' className='add-btn'>THÊM</button>
            </form>
        </div>
    );
};

export default AddHomestay;
