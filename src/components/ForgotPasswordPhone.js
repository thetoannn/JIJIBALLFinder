import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../styles/screens/ForgotPassword.css';

const ForgotPasswordPhone = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://bepickleball.vercel.app/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (window.confirm(data.message || 'Yêu cầu thành công! Kiểm tra email của bạn.')) {
          navigate('/login');  // Chuyển đến trang login khi người dùng chọn "OK"
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } catch (error) {
      alert('Có lỗi xảy ra trong quá trình gửi yêu cầu.');
    }
  };

  const hanleBack = () => {
    navigate('/login');  
  }

  return (
    <div className="container">
      <div className="form-wrapper reverse">
        <div className="form">
          <button className="back-button" onClick={hanleBack}>
            <FaArrowLeft />
          </button>
          <h2>Quên mật khẩu</h2>
          <p className="subtitle">Hãy nhập email của bạn</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="icon-wrapper">
                <MdEmail />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button-green">Nhận mật khẩu mới</button>
          </form>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Change Password" className="image" />
      </div>
    </div>
  );
};

export default ForgotPasswordPhone;
