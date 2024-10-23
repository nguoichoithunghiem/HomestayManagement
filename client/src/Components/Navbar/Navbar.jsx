import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái để kiểm soát dropdown

  // Hàm xử lý mở/đóng dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <h1>Van Truong</h1>
        <h2>HOTEL AGENCY</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/introduce">Giới thiệu</Link>
        <Link to="/homestay">HomeStay</Link>
        <Link to="/rooms">Phòng</Link>
        <Link to="/news">Tin Tức</Link>
        <Link to="#lien-he">Liên Hệ</Link>
        {!user ? (
          <>
            <Link to="/register">Đăng Ký</Link>
            <Link to="/login">Đăng Nhập</Link>
          </>
        ) : (
          <div className="nav-user" onClick={toggleDropdown}>
            {user} ▼
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/booking-history" onClick={() => setIsDropdownOpen(false)}>Lịch sử đặt phòng</Link>
                <Link to="/account-info" onClick={() => setIsDropdownOpen(false)}>Thông tin tài khoản</Link>
                <Link to="/change-password" onClick={() => setIsDropdownOpen(false)}>Đổi mật khẩu</Link>
                <div className="nav-logout" onClick={onLogout}>Đăng Xuất</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
