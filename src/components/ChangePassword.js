import React, { useState } from 'react';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import '../styles/screens/ChangePassword.css';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp hay không
    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://bepickleball.vercel.app/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword, // Sử dụng camelCase để khớp với yêu cầu của server
          newPassword, // Sử dụng camelCase để khớp với yêu cầu của server
        }),
      });

      if (response.ok) {
        // Nếu đổi mật khẩu thành công
        setShowAlert(true);
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Có lỗi xảy ra khi đổi mật khẩu');
      }
    } catch (error) {
      setErrorMessage('Lỗi kết nối tới máy chủ');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleBackButton = () => {
    navigate('/profile');
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    localStorage.removeItem('role'); 
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <div className="container">
      <div className="form-wrapper reverse">
        <div className="form">
          <button className="back-button" onClick={handleBackButton}>
            <FaArrowLeft />
          </button>
          <h2>Đổi mật khẩu</h2>
          <p className="subtitle">Hãy nhập mật khẩu của bạn</p>

          {/* Input mật khẩu cũ */}
          <div className="input-group">
            <div className="icon-wrapper">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Nhập mật khẩu cũ"
              className="input"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          {/* Input mật khẩu mới */}
          <div className="input-group">
            <div className="icon-wrapper">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              className="input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Input xác nhận mật khẩu mới */}
          <div className="input-group">
            <div className="icon-wrapper">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="button-green" onClick={handleButtonClick}>Tiếp tục</button>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Change Password" className="image" />
      </div>
      {showAlert && (
        <div className="alert">
          <div className="alert-content">
            <h3>Đổi mật khẩu thành công</h3>
            <p>Mật khẩu của bạn đã được đổi thành công. Ấn quay lại để đăng nhập ở màn hình chính</p>
            <button className="button-green" onClick={handleLogout}>Quay lại</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
