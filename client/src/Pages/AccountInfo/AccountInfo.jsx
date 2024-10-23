// src/pages/AccountInfo.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token'); // Lấy token từ local storage
            if (!token) {
                setError('Bạn chưa đăng nhập.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserInfo(response.data.data); // Lưu thông tin người dùng
                setLoading(false);
            } catch (err) {
                setError(err.response?.data.message || 'Lỗi khi gọi API');
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Thông tin tài khoản</h1>
            <p><strong>Họ và tên:</strong> {userInfo.fullName}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Số điện thoại:</strong> {userInfo.phoneNumber}</p>
            <p><strong>Địa chỉ:</strong> {userInfo.address}</p>
            <p><strong>Vai trò:</strong> {userInfo.role}</p>
        </div>
    );
};

export default AccountInfo;
