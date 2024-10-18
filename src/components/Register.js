import React, { useState } from 'react';
import { FaUser, FaPhone, FaLock, FaRedo, FaArrowLeft, FaMailBulk } from 'react-icons/fa';
import '../styles/bootstraps/custom_bootstrap.css';
import '../styles/screens/Register.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, phone } = formData;

    // Kiểm tra xem các trường bắt buộc đã được điền đầy đủ hay không
    // if (!username || !email || !password || !confirmPassword || !phone) {
    //   toast.error("Vui lòng điền đầy đủ thông tin!");
    //   return;
    // }

    // // Kiểm tra tính hợp lệ email
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!emailRegex.test(email)) {
    //   toast.error("Email không hợp lệ!");
    //   return;
    // }

    // Kiểm tra tính hợp lệ của số điện thoại (ví dụ: độ dài tối thiểu là 10)
    if (phone.length !== 10) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    // Kiểm tra tính hợp lệ của mật khẩu (ví dụ: độ dài tối thiểu là 6)
    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await fetch("https://bepickleball.vercel.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          phone,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Đã xảy ra lỗi, vui lòng thử lại sau!");
        return;
      }

      console.log(data);
      toast.success("Đăng ký thành công!");
      
      navigate('/login');
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <div className="register-container-fluid">
      <ToastContainer />
      <div className="form-wrapper d-flex flex-row bg-white w-85 h-85 overflow-hidden position-relative">
        <div className="image-wrapper w-50">
          <img src={process.env.PUBLIC_URL + '/assets/images/Register.png'}
            alt="Register"
            className="image w-100 h-100" />
        </div>
        <div className='wrapper w-50 h-100'>
          <button className="btn border" style={{ position: "absolute", top: "14%", left: "53.5%" }} onClick={handleBackButton}>
            <FaArrowLeft className='fa-icon' />
          </button>
          <div className="form w-80">
            <form onSubmit={handleSubmit}>
              <div className='form-header d-flex flex-column align-items-center mb-4'>
                <h2 className='font-weight-bold mb-4' style={{ fontSize: "3rem" }}>Đăng ký</h2>
                <p className="subtitle">Hãy tạo tài khoản mới để đến với chúng tôi</p>
              </div>

              <div className="input-group">
                <div className="icon-wrapper">
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder="Nhập tên người dùng"
                  className="input"
                  name='username'
                  id='username'
                  onChange={handleChange}
                  value={formData.username} />
              </div>
              <div className="input-group">
                <div className="icon-wrapper">
                  <MdEmail />
                </div>
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="input"
                  name='email'
                  id='email'
                  onChange={handleChange}
                  value={formData.email} />
              </div>
              <div className="input-group">
                <div className="icon-wrapper">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="input"
                  name='phone'
                  id='phone'
                  onChange={handleChange}
                  value={formData.phone} />
              </div>
              <div className="input-group">
                <div className="icon-wrapper">
                  <FaLock />
                </div>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="input"
                  name='password'
                  id='password'
                  onChange={handleChange}
                  value={formData.password} />
              </div>
              <div className="input-group">
                <div className="icon-wrapper">
                  <FaRedo />
                </div>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="input"
                  name='confirmPassword'
                  id='confirmPassword'
                  onChange={handleChange}
                  value={formData.confirmPassword} />
              </div>
              <button type='submit' className="button">Đăng ký</button>
              <p className="link-wrapper">
                Đã có tài khoản? <a href="/login" className="link d-inline">Đăng nhập</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
