import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token và cập nhật trạng thái đăng nhập
        localStorage.removeItem('token');
        onLogout(); // Gọi hàm đăng xuất từ App.js
        navigate('/admin/login'); // Chuyển hướng về trang đăng nhập
    };

    return (
        <div className='navbar'>
            <img className='logo' src={assets.logo} alt="Logo" />
            {isAuthenticated ? (
                <div className='navbar-user'>
                    <button className='logout-button' onClick={handleLogout}>Đăng xuất</button>
                </div>
            ) : (
                <button onClick={() => navigate('/admin/login')} className='login-button'>Đăng nhập</button>
            )}
        </div>
    );
}

export default Navbar;
