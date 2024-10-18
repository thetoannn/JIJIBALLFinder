import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { CiLocationOn } from "react-icons/ci";
import { FaArrowUpRightDots, FaPhone } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { PiUserSquareLight } from "react-icons/pi";
import { useNotifications } from './NotificationContext'; // Cập nhật đường dẫn
import '../styles/screens/CourtDetailComponent.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';

const CourtDetailComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state = {} } = location;
  const {
    name,
    price,
    slots,
    location: courtLocation,
    type,
    level,
    images = [],
    players_needed,
    applied_players,
    date,
    time,
    contact_info,
    idCourt,
    applied_count
  } = state || {};

  const { addNotification } = useNotifications(); // Lấy hàm addNotification từ context

  const [selectedImage, setSelectedImage] = useState(images[0] || ''); // Trạng thái cho hình ảnh đã chọn
  const [showOverlay, setShowOverlay] = useState(false); // Trạng thái cho overlay

  const handleRegister = async () => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const _id = localStorage.getItem('_id');
    const token = localStorage.getItem('token');
    const postId = idCourt; // Retrieve post ID
    console.log(idCourt, "postId");


    if (!postId) {
      console.error('Post ID is missing.');
      alert('Có lỗi xảy ra, không tìm thấy thông tin sân.');
      return;
    }

    if (loggedInStatus === 'true' && _id && token) {
      try {
        const response = await fetch(`https://bepickleball.vercel.app/api/post/${postId}/apply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            _id,
            court_name: name,
            location: courtLocation,
            slots,
            players_needed,
            skill_level: level,
            play_date: time,
            cost: price,
            contact_info,
            status: 'pending',
          }),
        });

        console.log(response, "response");

        if (response.ok) {
          alert('Bạn đã đăng ký sân thành công!');
          addNotification(`Đặt sân ${name} thành công!`);
          navigate('/court-registration-list');
        } else {
          throw new Error('Đăng ký không thành công');
        }
      } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
        alert('Có lỗi xảy ra khi đăng ký sân.');
      }
    } else {
      navigate('/login');
    }
  };


  const getPhoneNumber = (contactInfo) => {
    if (!contactInfo || typeof contactInfo !== 'string') {
      return 'Không có số điện thoại';
    }
    const match = contactInfo.match(/SĐT:\s?(\d+)/);
    return match ? match[1] : 'Không có số điện thoại';
  };

  const getFacebook = (contactInfo) => {
    if (!contactInfo || typeof contactInfo !== 'string') {
      return 'Không có Facebook';
    }

    // Biểu thức chính quy để tìm URL Facebook
    const match = contactInfo.match(/Facebook:\s*(https?:\/\/www\.facebook\.com\/[^\s,]+)/);

    return match ? match[1] : 'Không có Facebook';
  };


  const handleViewMore = () => {
    alert('Hiển thị thêm hình ảnh...');
  };

  const handleThumbnailClick = (img) => {
    setSelectedImage(img); // Cập nhật hình ảnh đã chọn khi nhấp vào thumbnail
  };

  const handleShowOverlay = () => {
    setShowOverlay(true); // Hiện overlay khi nhấp vào nút "Xem thêm"
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false); // Ẩn overlay khi nhấp vào overlay
  };

  // console.log(slots);


  return (
    <div className="court-detail-container">
      <Card id="court-detail-card">
        <Row>
          <Col md={7} style={{ padding: 0 }}>
            <Card.Body className='court-card-body'>
              <Row>
                <Col md={12} style={{ padding: 0 }}>
                  {/* Hiển thị hình ảnh lớn */}
                  {selectedImage ? (
                    <div className="image-container">
                      <img src={selectedImage} alt={`Court ${name}`} className="large-image" />
                      {showOverlay && (
                        <div className="overlay" onClick={handleCloseOverlay}>
                          <span className="overlay-text">Xem thêm</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="placeholder-image">No Image Available</div>
                  )}
                </Col>
              </Row>

              <Row className="image-grid">
                {/* 3 ảnh nhỏ */}
                {images.slice(1, 4).map((img, index) => (
                  <Col md={3} key={index} className="small-image-col">
                    {index === 2 ? ( // Hiển thị nút "Xem thêm" trên ảnh thứ 3
                      <div className="small-image-container" onClick={handleShowOverlay}>
                        <img
                          src={img}
                          alt={`Court ${name} ${index + 1}`}
                          className="small-image"
                        />
                        <div className="overlay">
                          <span className="overlay-text" onClick={handleViewMore}>Xem thêm</span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={img}
                        alt={`Court ${name} ${index + 1}`}
                        className="small-image"
                        onClick={() => handleThumbnailClick(img)} // Cập nhật hình ảnh lớn khi nhấp
                      />
                    )}
                  </Col>
                ))}

              </Row>
            </Card.Body>
          </Col>
          <Col md={5} className="court-details">
            <Card.Body id='court-card-body'>
              <div className="badge-container">
                <Button variant="outline-primary" className="court-badge">
                  {type}
                </Button>
              </div>
              <Card.Title style={{ fontSize: "32px", fontWeight: "500", whiteSpace: "nowrap"}}>{name}</Card.Title>
              <Card.Text className='court-info'>
                <div className="court-info-item">
                  <CiLocationOn className="icon" style={{ color: "#828282" }} />
                  <a
                    href={courtLocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#064D7E"}}
                  >
                    {name}
                  </a>
                </div>
                <div className="court-info-item">
                  <FaArrowUpRightDots className="icon" style={{ color: "#828282", fontSize: "20px" }} />
                  Trình độ: {level ? level.toFixed(1) : '1-2'}
                </div>
              </Card.Text>
              <Card.Text style={{ fontSize: "24px", fontWeight: "600", color: "#059A8F" }}>
                {price.toLocaleString('vi-VN')} VND / người
              </Card.Text>
              <Card.Text>
                <PiUserSquareLight className="icon" style={{ color: "#828282" }} />Slot đã đặt: <span style={{ color: "red" }}>{slots - players_needed}/{slots} người</span>
              </Card.Text>
              <Card.Text>
                <IoIosInformationCircle className="icon" style={{ color: "#828282", fontSize: "20px" }} />Ngày chơi: {date} <br />
                <div style={{ marginLeft: '1.75rem' }}> Thời gian chơi: {time} </div>
              </Card.Text>
              <Card.Text>
                <div className="icon" style={{ color: "#828282" }} />Liên hệ:
                &nbsp;&nbsp;
                {getPhoneNumber(contact_info) !== 'Không có số điện thoại' ? (
                  <a>
                    <FaPhone style={{ color: "#828282", fontSize: "17px", marginRight: "8px" }} />{getPhoneNumber(contact_info)}
                  </a>
                ) : (
                  'Không có Số điện thoại'
                )}
                &nbsp;&nbsp;
                {getFacebook(contact_info) !== 'Không có Facebook' ? (
                  <a
                    href={getFacebook(contact_info)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#064D7E" }}
                  >
                    {/* Icon Facebook */}
                    <FaFacebook style={{ color: "#828282", fontSize: "20px", marginRight: "8px" }} />
                    Facebook
                  </a>
                ) : (
                  'Không có Facebook'
                )}
              </Card.Text>
              {/* <Card.Text>
                <div className="icon" style={{ color: "#828282" }} />Facebook: {getFacebook(contact_info)}
              </Card.Text> */}
              <Card.Text>

              </Card.Text>


              {/* Kiểm tra nếu số lượng người đã đặt = slots */}
              {players_needed == 0 ? (
                <Button className="register-btn" variant="danger" disabled>
                  Đã đầy
                </Button>
              ) : (
                <Button className="register-btn" variant="primary" onClick={handleRegister}>
                  Đăng kí giao lưu
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
        {/* Court Description */}
        <Row>
          <Col className='court-description' style={{ textAlign: "left" }}>
            <h5 className='des-text-1' style={{ color: "#059A8F" }}>Lưu ý</h5>
            <h5 className='des-text-2' style={{ color: "#059A8F" }}>Mô tả</h5>
            <div
              style={{
                width: "60px",
                height: "1.8px",
                color: "#059A8F",
                backgroundColor: "#059A8F",
                margin: "10px 0",
              }}
            />
            <br />
            <p className='des-text-1'>
              1. "Xé vé" là hình thức thu tiền trọn gói cho cả buổi chơi (thường
              2-3 giờ) bao gồm: sân + bóng + nước uống (Aqua/Dasani). <br />
              2. Hình thức này rất phù hợp với những người có công việc bận rộn
              không có nhóm chơi cố định hoặc có thời gian rảnh mà không kiếm
              được đồng đội chơi cùng. <br />
              3. Sau khi đăng ký giao lưu thành công, mọi người thể kiểm tra lại
              thông qua chức năng sân đã đăng ký. <br />
              4. Mọi người hoàn toàn có thể hủy sân sau khi đặt nếu có việc đột
              suất. <br />
              5. Chúng tôi hoàn toàn không thu bất kì phí nào của người chơi,
              vui lòng thanh toán trực tiếp với chủ sân.
            </p>
            <p className='des-text-2'>Sân Pickleball có hình chữ nhật với kích thước nhỏ hơn sân tennis, được chia làm hai nửa bởi một lưới ở giữa. Sân thường có các đặc điểm sau: <br />
              <ol>
                <li>Kích thước: Sân có chiều dài 13,41 mét (44 feet) và chiều rộng 6,1 mét (20 feet). Mỗi bên sân có chiều dài 6,71 mét (22 feet).</li>
                <li>Lưới: Lưới cao 91,4 cm (36 inch) ở hai đầu và cao 86,4 cm (34 inch) ở giữa. Lưới được căng ngang giữa sân, chia sân thành hai phần bằng nhau.</li>
                <li>Khu vực:
                  <ul>
                    <li>
                      Khu vực không vô lê: Gần lưới, có chiều dài 2,13 mét (7 feet) tính từ lưới về mỗi bên sân, được gọi là khu vực "kitchen" hoặc "no-volley zone". Trong khu vực này, người chơi không được thực hiện các cú vô lê (đánh bóng mà không cho bóng chạm đất trước).
                    </li>
                    <li>
                      Phần sân còn lại: Được chia thành hai phần chính, tương ứng với phần sân phải và phần sân trái, nơi người chơi có thể giao bóng và đánh trả.
                    </li>
                  </ul>
                </li>
              </ol>
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CourtDetailComponent;
