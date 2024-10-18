import React, { useEffect, useState } from 'react';
import '../styles/screens/Header.css';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaRegPenToSquare, FaBell } from "react-icons/fa6";
import { FaCheckCircle } from 'react-icons/fa';
import { useNotifications } from './NotificationContext';
import AvaterBlank from '../assets/avt-blank.jpg';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { notifications } = useNotifications(); // Lấy thông báo từ context

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedName = localStorage.getItem('name');
    const storedAvatar = localStorage.getItem('avatar');
    const storedRole = localStorage.getItem('role');

    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      setName(storedName || '');
      setAvatar(storedAvatar || '');
      setRole(storedRole || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    localStorage.removeItem('role'); 
    localStorage.removeItem('token');

    setIsLoggedIn(false);
    setName('');
    setAvatar('');
    setRole('');

    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  }

  const handleProfile = () => {
    navigate('/profile');
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  }
  console.log(avatar);
  
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Logo" />
        </a>
      </div>
      <span className="menu-toggle" onClick={toggleMenu}>&#9776;</span>
      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li><a href="/">Trang chủ</a></li>
        <li><a href="https://jijiball-shop-pickleball.netlify.app/" target="_blank" rel="noopener noreferrer">Cửa Hàng</a></li>
        <li><a href="/court">Giao lưu</a></li>
        <li><a href="/coach">Huấn luyện viên</a></li>
      </ul>
      <ul className='link' style={{ textDecoration: "none" }}>
        {isLoggedIn && role !== 'player' ? (
          <li>
            <button className="post-button">
              <a href="/post-form" style={{ color: "white", backgroundColor: "#064D7E", textDecoration: "none" }}>
                <span id='icon'><FaRegPenToSquare /></span>
                <span id='text'>Đăng Bài Tìm Giao Lưu</span>
              </a>
            </button>
          </li>
        ) : role === 'player' ? (
          <li>
            <button className="post-button">
              <a href="/court-registration-list" style={{ color: "white", backgroundColor: "#064D7E", textDecoration: "none" }}>
                <span id='icon'><FaCheckCircle style={{fontSize: "20px"}}/></span>
                <span id='text'>Sân Đã Đăng Ký</span>
              </a>
            </button>
          </li>
        ) : null}
      </ul>

      {/* Bảng thông báo */}
      {notificationsOpen && (
        <div className={`notification-dropdown ${notificationsOpen ? 'open' : ''}`}>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))
            ) : (
              <li>Không có thông báo nào</li>
            )}
          </ul>
        </div>
      )}

      {isLoggedIn ? (
        <div className="user-section">
          <div className="user-info">
            <img
              src={avatar ? avatar : AvaterBlank}
              alt="User Avatar"
              className="image"
              onClick={handleProfile}
            />
            <span>{name}</span>
          </div>
          <button className="login-button" onClick={handleLogout} style={{ backgroundColor: "#064D7E" }}>Đăng xuất</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button className="login-button" onClick={handleLogin} style={{ backgroundColor: "#064D7E" }}>Đăng Nhập</button>
          <button className="register-button" onClick={handleRegister}>Đăng Ký</button>
        </div>
      )}

      <button className="menu-icon" onClick={toggleMenu}>
        <FaBars size={24} />
      </button>

      {menuOpen && (
        <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/about">Giới thiệu</a></li>
            <li><a href="/court">Giao lưu</a></li>
            <li><a href="/coach">Huấn luyện viên</a></li>
            {isLoggedIn ? (
              <li><a onClick={handleLogout}>Đăng xuất</a></li>
            ) : (
              <>
                <li><a onClick={handleLogin}>Đăng nhập</a></li>
                <li><a onClick={handleRegister}>Đăng ký</a></li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
