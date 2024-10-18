import React, { useEffect, useState } from 'react';
import './UpdateHomestay.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateHomestay = ({ url }) => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Để điều hướng sau khi cập nhật
    const [homestay, setHomestay] = useState({
        homestayName: '',
        homestayAddress: '',
        homestayPrice: '',
        homestayDescription: '',
        homestayCategory: '',
        homestayImage: null,
        status: 'available' // Thêm trạng thái với giá trị mặc định
    });

    // Hàm để lấy thông tin homestay hiện tại
    const fetchHomestay = async () => {
        try {
            const response = await axios.get(`${url}/api/homestay/${id}`); // Cập nhật endpoint theo cấu trúc của bạn
            if (response.data.success) {
                setHomestay(response.data.data); // Giả sử response.data.data có trường status
            } else {
                toast.error("Lỗi khi lấy thông tin homestay");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching homestay:", error);
        }
    };

    // Hàm để xử lý thay đổi input
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setHomestay((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm để xử lý submit form
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('homestayName', homestay.homestayName);
        formData.append('homestayAddress', homestay.homestayAddress);
        formData.append('homestayPrice', homestay.homestayPrice);
        formData.append('homestayDescription', homestay.homestayDescription);
        formData.append('homestayCategory', homestay.homestayCategory);
        formData.append('status', homestay.status); // Thêm trạng thái vào formData
        if (homestay.homestayImage) {
            formData.append('homestayImage', homestay.homestayImage);
        }

        try {
            const response = await axios.post(`${url}/api/homestay/update/${id}`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list-homestay'); // Điều hướng đến danh sách homestay
            } else {
                toast.error("Lỗi khi cập nhật homestay");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật");
            console.error("Error updating homestay:", error);
        }
    };

    useEffect(() => {
        fetchHomestay(); // Gọi hàm lấy thông tin homestay khi component được mount
    }, []);

    return (
        <div className='update-homestay'>
            <h2>Cập nhật Homestay</h2>
            <form onSubmit={onSubmitHandler} className='update-form'>
                <div className='form-group'>
                    <label>Tên Homestay:</label>
                    <input
                        type='text'
                        name='homestayName'
                        value={homestay.homestayName}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Địa chỉ:</label>
                    <input
                        type='text'
                        name='homestayAddress'
                        value={homestay.homestayAddress}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Giá:</label>
                    <input
                        type='number'
                        name='homestayPrice'
                        value={homestay.homestayPrice}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Mô tả:</label>
                    <textarea
                        name='homestayDescription'
                        value={homestay.homestayDescription}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Danh mục:</label>
                    <select
                        name='homestayCategory'
                        value={homestay.homestayCategory}
                        onChange={onChangeHandler}
                        required
                    >
                        <option value='Nguyên căn'>Nguyên căn</option>
                        <option value='Phòng'>Phòng</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Trạng thái:</label>
                    <select
                        name='status'
                        value={homestay.status}
                        onChange={onChangeHandler}
                        required
                    >
                        <option value='available'>Available</option>
                        <option value='unavailable'>Unavailable</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Hình ảnh:</label>
                    <input
                        type='file'
                        name='homestayImage'
                        onChange={(e) => setHomestay((prev) => ({ ...prev, homestayImage: e.target.files[0] }))}
                    />
                </div>
                <button type='submit' className='update-btn'>Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateHomestay;
