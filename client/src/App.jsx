import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Introduce from "./Pages/Introduce/Introduce";
import HomeStay from "./Pages/HomeStay/HomeStay";
import News from "./Pages/News/News";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import BookingHistory from "./Pages/BookingHistory/BookingHistory";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import Room from "./Pages/Room/Room";
import UserProfile from "./Pages/UserProfile/UserProfile";
import HomestayDetail from "./Pages/HomestayDetail/HomestayDetail";
import Booking from "./Pages/Booking/Booking";
import RoomDetail from "./Pages/RoomDetail/RoomDetail";
import Footerx from "./Components/Footer/Footer"

const App = () => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(atob(token.split('.')[1])).userId : null; // Giải mã token để lấy thông tin người dùng
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
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
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/profile-user" element={<UserProfile user={user} />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="/homestay/:id" element={<HomestayDetail />} />
          <Route path="/booking/:homestayId" element={<Booking />} />
        </Routes>
        <Footerx />
      </div>

    </>
  );
};

export default App;
