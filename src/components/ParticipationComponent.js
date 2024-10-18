import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUserFriends, FaClipboardList, FaUsers } from 'react-icons/fa';
import '../styles/screens/ParticipationComponent.css'; // Add necessary styles here
import { useNavigate } from 'react-router-dom';

const ParticipationComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/court');
  }

  return (
    <div className="participation-section">
      <h2 className="text-center">Tham gia giao lưu</h2>
      <Row className="participation-content">
        {/* Left Section */}
        <Col md={7} className="left-section">
          <h4>Đến với chúng tôi bạn sẽ được <span className="highlight">trải nghiệm !</span></h4>
          <div className="feature-list">
            <div className="feature-item">
              <FaMapMarkerAlt className="icon" />
              <div>
                <h5>Chọn sân nhanh chóng</h5>
                <p>Thông qua các buổi giao lưu, các bạn sẽ đăng ký sân Pickleball phù hợp nhất với vị trí của mình.</p>
              </div>
            </div>
            <div className="feature-item">
              <FaUserFriends className="icon" />
              <div>
                <h5>Tập hợp những người có chung đam mê</h5>
                <p>Giúp bạn có cơ hội gặp gỡ những người có cùng sở thích và cùng đam mê Pickleball.</p>
              </div>
            </div>
            <div className="feature-item">
              <FaClipboardList className="icon" />
              <div>
                <h5>Hướng dẫn cho người mới</h5>
                <p>Nếu bạn là người mới tham gia, chúng tôi sẽ giúp bạn làm quen với bộ môn Pickleball qua các hoạt động giao lưu.</p>
              </div>
            </div>
            <div className="feature-item">
              <FaUsers className="icon" />
              <div>
                <h5>Nhóm người chơi đa dạng</h5>
                <p>Tham gia nhóm với những người chơi Pickleball từ nhiều nơi để học hỏi và vui chơi.</p>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Section */}
        <Col md={5} className="right-section">
          <div className="image-container">
            <img
              src={process.env.PUBLIC_URL + '/assets/images/banner.png'}
              alt="Pickleball Experience"
              className="img-fluid participation-image w-100"
            />
            <div className="image-content">
              <h2 style={{textAlign: "left"}}>Đừng bỏ lỡ cơ hội thử sức với môn thể thao đang được yêu thích này!</h2>
              <button className="participation-button button" onClick={() => window.location.href = '/court'}>Tham gia giao lưu ngay</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ParticipationComponent;
