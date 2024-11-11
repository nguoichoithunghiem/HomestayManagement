import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { assets } from "../../assets/assets"; // Đảm bảo bạn đã có assets như ảnh background
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage(""); // Reset thông báo mỗi khi bắt đầu đăng nhập

    // Kiểm tra thông tin đầu vào
    if (!email || !password) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Kiểm tra phản hồi
      if (response.data.token) {
        setUser(response.data.user.fullName);
        localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
        localStorage.setItem("userId", response.data.user.userId);  // Lưu userId vào localStorage
        navigate("/");  // Chuyển hướng về trang chủ sau khi đăng nhập thành công
      } else {
        setMessage(response.data.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setMessage("Lỗi server! Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header - Background image */}
      <div className="login-khoiheader">
        <img className="login-nenpage" src={assets.login2} alt="Background" />
        <div className="login-text-overlay">Đăng nhập</div>
      </div>

      {/* Form body */}
      <div className="login-body">
        {message && <div className="login-message">{message}</div>} {/* Hiển thị thông báo lỗi */}

        {/* Email input */}
        <div className="login-element">
          <div className="login-tieude">
            <div>Email</div>
            <div className="login-kitu">(*)</div>
          </div>
          <input
            className="login-timkiem"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="login-element">
          <div className="login-tieude">
            <div>Mật khẩu</div>
            <div className="login-kitu">(*)</div>
          </div>
          <input
            className="login-timkiem"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <div
          className={`login-button ${loading ? "loading" : ""}`}
          onClick={handleLogin}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="contentoffooter">
          {/* Nội dung footer (tùy chỉnh theo yêu cầu) */}
        </div>
        <img src={assets.nenfooter} alt="Footer background" />
      </div>
    </div>
  );
};

export default Login;
