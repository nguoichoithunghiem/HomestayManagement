import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isAuthenticated }) => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                {isAuthenticated && (
                    <>
                        <NavLink to='/list-homestay' className="sidebar-option">
                            <img src={assets.add_icon} alt="" />
                            <p>Quản lý HomeStay</p>
                        </NavLink>
                        <NavLink to='/list-room' className="sidebar-option">
                            <img src={assets.add_icon} alt="" />
                            <p>Quản lý Phòng</p>
                        </NavLink>
                        <NavLink to='/list-user' className="sidebar-option">
                            <img src={assets.add_icon} alt="" />
                            <p>Quản lý Người dùng</p>
                        </NavLink>

                    </>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
