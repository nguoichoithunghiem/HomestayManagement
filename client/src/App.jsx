import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Introduce from "./Pages/Introduce/Introduce";
import HomeStay from "./Pages/HomeStay/HomeStay";
import News from "./Pages/News/News";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null); // Đặt user về null
    localStorage.removeItem("token"); // Xóa token khỏi localStorage nếu bạn đã lưu
  };

  return (
    <>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/homestay" element={<HomeStay />} />
          <Route path="/news" element={<News />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
      <footer />
    </>
  );
};

export default App;
