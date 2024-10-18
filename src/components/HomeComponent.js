import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../styles/screens/HomeComponent.css';  // Đảm bảo bạn đã tạo file CSS
import Banner1 from '../assets/banner-HLV.png';
import Banner2 from '../assets/banner-2.png';

const HomeComponent = () => {
  const location = useLocation();
  const isNotHomePage = location.pathname !== '/';

  return (
    <div className={`home-component ${isNotHomePage ? 'coach-home' : ''}`}>
      <Carousel className="custom-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner1}
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Banner2}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeComponent;
