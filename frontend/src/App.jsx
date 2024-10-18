import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddHomestay from './admin/homestay/addHomestay/addHomestay';
import ListHomestay from './admin/homestay/ListHomestay/ListHomestay';
import UpdateHomestay from './admin/homestay/UpdateHomestay/UpdateHomestay';
import AddRoom from './admin/room/AddRoom/AddRoom';
import UpdateRoom from './admin/room/UpdateRoom/UpdateRoom';
import ListRoom from './admin/room/ListRoom/ListRoom';
import AdminLogin from './admin/AdminLogin/AdminLogin';
import ListUser from './admin/User/ListUser/ListUser';
import Adduser from './admin/User/AddUser/Adduser';
import UpdateUser from './admin/User/UpdateUser/UpdateUser';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const url = "http://localhost:5000";

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <hr />
      <div className="app-content">
        <Sidebar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/" /> : <AdminLogin onLogin={handleLogin} />} />
          <Route path="/" element={isAuthenticated ? <h1>Trang Chính</h1> : <Navigate to="/admin/login" />} />
          <Route path="/add-homestay" element={isAuthenticated ? <AddHomestay url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="/list-homestay" element={isAuthenticated ? <ListHomestay url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="/update-homestay/:id" element={isAuthenticated ? <UpdateHomestay url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="/list-room" element={isAuthenticated ? <ListRoom url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="/add-room" element={isAuthenticated ? <AddRoom url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="/update-room/:id" element={isAuthenticated ? <UpdateRoom url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="*" element={<Navigate to="/admin/login" />} />
          <Route path="/list-user" element={isAuthenticated ? <ListUser url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="/add-user" element={isAuthenticated ? <Adduser url={url} /> : <Navigate to="/admin/login" />} />
          <Route path="/update-user/:id" element={isAuthenticated ? <UpdateUser url={url} /> : <Navigate to="/admin/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
