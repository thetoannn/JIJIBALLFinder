import React, {useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { CiLocationOn } from "react-icons/ci";
import { PiUserRectangleLight } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import '../styles/screens/CourtComponent.css'; // Import custom CSS
import NoImage from '../assets/no-image.jpg'; 

const CourtComponent = ({ name, price, slots, location, type, level, images = [], applied_players, players_needed, date, time, contact_info, applied_count, idCourt, userName }) => { // Added time here
  const navigate = useNavigate();

  // Fallback level if it's undefined
  const displayedLevel = level ? level.toFixed(1) : "1-2";

  // Handle card click to navigate with court details
  const handleCardClick = () => {
    navigate('/court/court-detail', {
      state: {
        name,
        price,
        slots,
        location,
        type,
        level,
        images,
        applied_players,
        players_needed,
        time,
        contact_info,
        applied_count,
        idCourt,
        userName,
        date
      }
    });
  
    window.location.reload(); // If reloading is necessary (though be cautious about this)
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Card className={`court-card ${slots - players_needed >= slots ? 'full-court' : ''}`} onClick={handleCardClick}>
    <div className="top-left-badge">
      {type === 'Sân Có Mái Che' ? 'Sân Có Mái Che' : 'Sân không có mái che'}
    </div>
  
    <div className="top-right-badge">
      {displayedLevel}
    </div>
  
    <div
      className="card-image"
      style={{
        backgroundImage: `url(${images.length > 0 ? images[0] : NoImage})`, // Thay thế bằng hình ảnh mặc định nếu không có
      }}
      alt={`Court ${name}`}
    />
  
    <Card.Body style={{ padding: "0px", margin: "8px", marginBottom: "0px", marginRight: "0px" }}>
      <Card.Title className="court-name">{name}</Card.Title>
  
      <Card.Text className="price-text" style={{ marginTop: "10px" }}>
        {price.toLocaleString('vi-VN')} VND /người
      </Card.Text>
  
      <Row style={{ padding: "0px", margin: "0px", marginBottom: "10px" }}>
        <Col className="location" md={7}>
          <MdDateRange style={{fontSize: "16px"}}/> {date}
        </Col>
        <Col className="slots-text" md={5}>
          {slots-players_needed >= slots ? (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Đã đầy</span> // Hiển thị khi đã đầy
          ) : (
            <span>
              <PiUserRectangleLight /> {slots-players_needed}/{slots} người
            </span>
          )}
        </Col>
      </Row>
    </Card.Body>
  </Card>
  
  );
};

export default CourtComponent;
