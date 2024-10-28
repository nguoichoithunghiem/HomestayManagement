// src/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Giả định bạn lưu token trong localStorage
            if (!token) {
                setError('Bạn chưa đăng nhập');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
            } catch (err) {
                setError('Không thể lấy thông tin người dùng');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Thông Tin Tài Khoản</h1>
            <p><strong>Họ Tên:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Số Điện Thoại:</strong> {user.phoneNumber}</p>
            <p><strong>Địa Chỉ:</strong> {user.address}</p>
            <p><strong>Vai Trò:</strong> {user.role}</p>
        </div>
    );
};


export default UserProfile;
