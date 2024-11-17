import React, { useState } from 'react';
import axios from 'axios';
import './ChangePassword.css'
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Lấy userId từ localStorage
  const userId = localStorage.getItem('userId'); // Lưu userId trong localStorage sau khi đăng nhập

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      setError('Cả mật khẩu hiện tại và mật khẩu mới đều phải nhập');
      return;
    }

    if (!userId) {
      setError('Không tìm thấy userId trong localStorage');
      return;
    }

    try {
      const response = await axios.put(`https://homestaymanagement-backend.onrender.com/api/auth/change-password/${userId}`, {
        currentPassword,
        newPassword
      });

      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại');
      setMessage('');
    }
  };

  return (
    <div className="change-password-container">
      <h2>Thay đổi mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đổi mật khẩu</button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ChangePassword;
