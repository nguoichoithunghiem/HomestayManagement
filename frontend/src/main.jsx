import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho Toastify

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="top-right" // Đặt vị trí thông báo ở góc trên bên phải
      autoClose={5000} // Tự động đóng sau 5 giây
      hideProgressBar={true} // Ẩn thanh tiến trình
      newestOnTop={true} // Thông báo mới nhất ở trên cùng
      closeOnClick
      rtl={false}
      pauseOnHover
      draggable
      pauseOnFocusLoss
    />
  </BrowserRouter>
);
