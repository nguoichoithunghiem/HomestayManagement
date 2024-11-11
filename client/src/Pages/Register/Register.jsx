import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Giữ lại style đã có từ mẫu của bạn
import { assets } from "../../assets/assets"; // Nếu cần assets

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault(); // Ngừng mặc định form gửi đi

    setLoading(true);
    setMessage("");

    // Kiểm tra thông tin đầu vào
    if (!fullName || !email || !phoneNumber || !address || !password || !confirmPassword) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Mật khẩu và xác nhận mật khẩu không trùng khớp!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        email,
        phoneNumber,
        address,
        password,
      });

      if (response.data.message === "Đăng ký thành công!") {
        setMessage("Đăng ký thành công!");
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
      } else {
        setMessage(response.data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
      setMessage("Lỗi server! Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="register-khoiheader">
        <img className="register-nenpage" src={assets.register2} alt="Background" />
        <div className="register-text-overlay">Đăng Ký</div>
      </div>

      <div className="register-body">
        {message && <div className="register-message">{message}</div>} {/* Hiển thị thông báo */}

        {/* Họ và Tên */}
        <div className="register-element">
          <div className="register-tieude">
            <div>Họ tên</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập họ và tên"
          />
        </div>

        {/* Email */}
        <div className="register-element">
          <div className="register-tieude">
            <div>Email</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
        </div>

        {/* Số điện thoại */}
        <div className="register-element">
          <div className="register-tieude">
            <div>Số điện thoại</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Địa chỉ */}
        <div className="register-element">
          <div className="register-tieude">
            <div>Địa chỉ</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ"
          />
        </div>

        {/* Mật khẩu */}
        <div className="register-element">
          <div className="register-tieude">
            <div>Mật khẩu</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="register-element">
          <div className="register-tieude">
            <div>Nhập lại mật khẩu</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu"
          />
        </div>

        {/* Nút đăng ký */}
        <div
          className={`register-button ${loading ? "loading" : ""}`}
          onClick={handleRegister}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </div>
      </div>

      <div className="footer">
        <div className="contentoffooter">
          {/* Footer content goes here */}
        </div>
        <img src={assets.nenfooter} alt="Footer background" />
      </div>
    </div>
  );
};

export default Register;
