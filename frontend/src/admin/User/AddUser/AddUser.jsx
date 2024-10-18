import React, { useState } from 'react';
import './AddUser.css'; // Giả sử bạn sử dụng cùng một kiểu dáng
import axios from "axios";
import { toast } from 'react-toastify';

const AddUser = ({ url }) => {
    const [data, setData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        role: "user" // Có thể sửa theo vai trò bạn muốn
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/users/add`, data);
            if (response.data.success) {
                setData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    password: "",
                    role: "user" // Đặt lại về giá trị mặc định
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm người dùng");
            console.error("Error:", error);
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-user-name flex-col">
                    <p>Tên người dùng</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.fullName}
                        type="text"
                        name='fullName'
                        placeholder='Nhập tên người dùng'
                        required
                    />
                </div>
                <div className="add-user-email flex-col">
                    <p>Email</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        name='email'
                        placeholder='Nhập email'
                        required
                    />
                </div>
                <div className="add-user-phone flex-col">
                    <p>Điện thoại</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.phoneNumber}
                        type="tel"
                        name='phoneNumber'
                        placeholder='Nhập số điện thoại'
                        required
                    />
                </div>
                <div className="add-user-address flex-col">
                    <p>Địa chỉ</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.address}
                        type="text"
                        name='address'
                        placeholder='Nhập địa chỉ'
                        required
                    />
                </div>
                <div className="add-user-password flex-col">
                    <p>Mật khẩu</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        name='password'
                        placeholder='Nhập mật khẩu'
                        required
                    />
                </div>
                <div className="add-role flex-col">
                    <p>Vai trò</p>
                    <select onChange={onChangeHandler} name="role">
                        <option value="user">Người dùng</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                </div>
                <button type='submit' className='add-btn'>THÊM</button>
            </form>
        </div>
    );
};

export default AddUser;
