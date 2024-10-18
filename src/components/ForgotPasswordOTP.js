import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/screens/ForgotPassword.css';

const ForgotPasswordOTP = () => {
  return (
    <div className="container">
      <div className="form-wrapper reverse">
        {/* <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Forgot Password" className="image" /> */}
        <div className="form">
          <button className="back-button">
            <FaArrowLeft />
          </button>
          <h2>Quên mật khẩu</h2>
          <p className="subtitle">Hãy nhập mã OTP đã gửi đến số điện thoại</p>
          <p className="phone-number">01384342123</p>
          <div className="otp-group">
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
          </div>
          <button className="button-green">Tiếp tục</button>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'} alt="Change Password" className="image" />
      </div>
    </div>
  );
};

export default ForgotPasswordOTP;
