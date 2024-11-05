import React, { useEffect, useState } from 'react';
import './UpdateBooking.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBooking = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1, // Default value
        notes: '',
        status: 'Processing'
    });

    const fetchBooking = async () => {
        try {
            const response = await axios.get(`${url}/api/bookings/${id}`);
            if (response.data.success) {
                setBooking(response.data.data);
            } else {
                toast.error("Lỗi khi lấy thông tin đặt phòng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi lấy thông tin");
            console.error("Error fetching booking:", error);
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setBooking((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${url}/api/bookings/update/${id}`, booking); // Changed to PUT
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list-booking');
            } else {
                toast.error("Lỗi khi cập nhật đặt phòng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật");
            console.error("Error updating booking:", error);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, []);

    return (
        <div className='update-booking'>
            <h2>Cập nhật Đặt Phòng</h2>
            <form onSubmit={onSubmitHandler} className='update-form'>
                <div className='form-group'>
                    <label>Tên Khách:</label>
                    <input
                        type='text'
                        name='fullName'
                        value={booking.fullName}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={booking.email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Số Điện Thoại:</label>
                    <input
                        type='text'
                        name='phoneNumber'
                        value={booking.phoneNumber}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Địa Chỉ:</label>
                    <input
                        type='text'
                        name='address'
                        value={booking.address}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Ngày Nhận Phòng:</label>
                    <input
                        type='date'
                        name='checkInDate'
                        value={booking.checkInDate.slice(0, 10)}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Ngày Trả Phòng:</label>
                    <input
                        type='date'
                        name='checkOutDate'
                        value={booking.checkOutDate.slice(0, 10)}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Số Khách:</label>
                    <input
                        type='number'
                        name='numberOfGuests'
                        value={booking.numberOfGuests}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Ghi chú:</label>
                    <textarea
                        name='notes'
                        value={booking.notes}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className='form-group'>
                    <label>Trạng thái:</label>
                    <select
                        name='status'
                        value={booking.status}
                        onChange={onChangeHandler}
                        required
                    >
                        <option value='Processing'>Đang xử lý</option>
                        <option value='Booking Successful'>Đặt phòng thành công</option>
                    </select>
                </div>
                <button type='submit' className='update-btn'>Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateBooking;
