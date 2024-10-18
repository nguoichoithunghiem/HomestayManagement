import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

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
      if (response.data.success) {
        setUser(response.data.user.fullName);
        localStorage.setItem("token", response.data.token); // Lưu token nếu cần
        navigate("/");
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
      <div className="login-khoiheader">
        <img className="login-nenpage" src={assets.login2} alt="Background" />
        <div className="login-text-overlay">Đăng nhập</div>
      </div>
      <div className="login-body">
        {message && <div className="login-message">{message}</div>}

        <div className="login-element">
          <div className="login-tieude">
            <div>Email</div>
            <div className="login-kitu">(*)</div>
          </div>
          <input
            className="login-timkiem"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-element">
          <div className="login-tieude">
            <div>Mật khẩu</div>
            <div className="login-kitu">(*)</div>
          </div>
          <input
            className="login-timkiem"
            type="password"
            placeholder="Mật Khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`login-button ${loading ? "loading" : ""}`}
          onClick={handleLogin}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </div>
      </div>
      <div className="footer">
        <div className="contentoffooter">
          {/* Nội dung footer như trước */}
        </div>
        <img src={assets.nenfooter} alt="Footer background" />
      </div>
    </div>
  );
};

export default Login;
