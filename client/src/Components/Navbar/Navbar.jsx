import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
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
        <Link to="/news">Tin Tức</Link>
        <Link to="#lien-he">Liên Hệ</Link>
        {!user ? (
          <>
            <Link to="/register">Đăng Ký</Link>
            <Link to="/login">Đăng Nhập</Link>
          </>
        ) : (
          <>
            <span className="nav-user">{user}</span>
            <div className="nav-logout" onClick={onLogout}>Đăng Xuất</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
