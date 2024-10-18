// src/Footer.js

import React from "react";
import "../styles/screens/Footer.css";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="head-footer ">
          <div className="logo-footer">
            <h1><a style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} href="/"> Ji Ji Ball </a> </h1>
            <p>Phục vụ những nhu cầu thiết yếu của cộng đồng PICKLEBALL</p>
          </div>
        </div>
        <div className="text-link ">
          <div className="links">
            <div className="link-info">
              <h4>Về chúng tôi</h4>
              <p>Giới thiệu</p>
              <p>Hướng dẫn sử dụng</p>
              <p>Phản hồi, góp ý</p>
            </div>
            <div className="link-info">
              <h4>Hợp tác và liên kết</h4>
              <p>
                Cùng JIJI Pickleball phát triển cộng đồng Pickleball tại Việt Nam
              </p>
              <div className="contact">
                <h4>Liên hệ với chúng tôi qua:</h4>
                <div className="social-icons" id="social-icons">
                  <a
                    href="https://web.facebook.com/profile.php?id=61566880312514"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
