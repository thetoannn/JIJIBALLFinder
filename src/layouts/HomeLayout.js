import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Import Header component
import HomeComponent from '../components/HomeComponent'; // Import HomeComponent
import ParticipationComponent from '../components/ParticipationComponent'; // Import ParticipationComponent
import CoachListComponent from '../components/CoachListComponent'; // Import CoachListComponent
import Footer from '../components/Footer'; // Import Footer component
import NewsComponent from '../components/NewsComponent';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa6';
import '../styles/layouts/HomeLayout.css';

const HomeLayout = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="home-layout" style={{ backgroundColor: "#F0F0F0" }}>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="content-container">
        <div className="main-content">
          {/* Home Component */}
          <div>
            <HomeComponent />
          </div>

          <div id='body-home'>
            {/* Participation Section */}
            <ParticipationComponent />

            {/* Coach List Section */}
            <CoachListComponent limit={8} enablePagination={false} />

            <Link
              to="/coach"
              style={{
                textDecoration: 'none',
                color: "#828282",
                marginTop: "20px",
                display: window.innerWidth <= 430 ? 'none' : 'block' // Kiểm tra kích thước màn hình
              }}
            >
              Xem thêm
            </Link>

            {/* News Section */}
            <NewsComponent />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />

      {/* Back to top button */}
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default HomeLayout;
