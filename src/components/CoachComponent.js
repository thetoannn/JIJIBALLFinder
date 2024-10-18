import React, {memo, useEffect } from 'react';
import '../styles/screens/CoachComponent.css'; // Custom CSS for card styling
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


const CoachComponent = memo(({ name, price, level, phone, images, contact, address, description }) => {
  const navigate = useNavigate();

  // Handle card click to navigate with coach details
  const handleCardClick = () => {
    navigate('/coach/coach-detail', {
      state: {
        name,
        price,
        level,
        phone,
        images,
        contact,
        address,
        description
      }
    });
    window.location.reload();
  }  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="card coach-card" onClick={handleCardClick}>
      {/* Image at the top */}
      <img
        src={images[0]}
        alt={`Coach ${name}`}
        className="card-img-top card-image"
      />

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <p className="card-text" id='price-text'>
          {price} VND/buổi
        </p>

        <p className="card-text level-text" style={{ marginBottom: 0, padding: 0 }}>
          <CiLocationOn /> Khu vực: {address}
        </p>

        {/* Contact buttons: Facebook and Zalo */}
        <div className="row contact-buttons">
          <div className="col">
            <button className="btn btn-outline-primary contact-btn" style={{ color: "#FFFFFF", backgroundColor: "#2D70A1", borderColor: "#2D70A1" }}>
               {contact?.facebook && (
                <a style={{ color: "#FFFFFF", textDecoration: "none" }} href="/coach/coach-detail" target="_blank" rel="noopener noreferrer">
                  Xem thông tin liên hệ
                </a>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CoachComponent;
