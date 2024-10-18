import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
const Homepage = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
        </div>
    )
}

export default Homepage
