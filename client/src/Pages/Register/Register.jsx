import React, { useState } from "react";
import "./Register.css";
import { assets } from "../../assets/assets";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "", // Đổi từ phone thành phoneNumber
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { fullName, email, phoneNumber, address, password, confirmPassword } = formData;

    if (!fullName || !email || !phoneNumber || !address || !password || !confirmPassword) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      return false;
    }

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp!");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    const { password, confirmPassword, ...userData } = formData;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, password }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Đăng ký thành công!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(result.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Lỗi server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="register-khoiheader">
        <img className="register-nenpage" src={assets.register2} alt="" />
        <div className="register-text-overlay">Đăng ký</div>
      </div>
      <div className="register-body">
        {message && <div className="register-message">{message}</div>}

        <div className="register-hoten">
          <div className="register-tieude">
            <div>Họ tên</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Họ và tên"
          />
        </div>

        <div className="register-hoten">
          <div className="register-tieude">
            <div>Email</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="register-hoten">
          <div className="register-tieude">
            <div>Số điện thoại</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="text"
            name="phoneNumber" // Đổi thành phoneNumber
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Số điện thoại"
          />
        </div>

        <div className="register-hoten">
          <div className="register-tieude">
            <div>Địa chỉ</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
          />
        </div>

        <div className="register-hoten">
          <div className="register-tieude">
            <div>Mật khẩu</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
          />
        </div>

        <div className="register-hoten">
          <div className="register-tieude">
            <div>Nhập lại mật khẩu</div><div className="register-kitu">(*)</div>
          </div>
          <input
            className="register-timkiem"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
          />
        </div>

        <div
          className={`register-button ${loading ? "loading" : ""}`}
          onClick={handleSubmit}
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </div>
      </div>
      <div className="footer">
        {/* Nội dung footer */}
      </div>
    </div>
  );
};

export default Register;
