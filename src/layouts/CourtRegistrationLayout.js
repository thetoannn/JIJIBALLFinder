import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HomeComponent from '../components/HomeComponent';
import CourtRegistrationList from '../components/CourtRegistrationList';
import Footer from '../components/Footer';
import '../styles/screens/CourtListComponent.css';

const CourtRegistrationLayout = () => {

  return (
    <div className="court-layout" style={{ backgroundColor: "#F0F0F0" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        {/* Home Component */}
        <HomeComponent />
        <div id='body-court' style={{minHeight: '50vh'}}>
          {/* Filter Component */}
          {/* Truyền dữ liệu sân và hàm lọc kết quả */}

          {/* Court List Component */}
          {/* Hiển thị kết quả đã lọc */}
          <CourtRegistrationList />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CourtRegistrationLayout;
