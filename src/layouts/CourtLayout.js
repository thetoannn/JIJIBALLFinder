import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HomeComponent from '../components/HomeComponent';
import DetailedFilterComponent from '../components/DetailedFilterComponent';
import CourtListComponent from '../components/CourtListComponent';
import Footer from '../components/Footer';
import '../styles/screens/CourtListComponent.css';

const CourtLayout = () => {
  const [allCourts, setAllCourts] = useState([]); // Chứa tất cả sân
  const [filteredResults, setFilteredResults] = useState([]); // Chứa kết quả lọc

  // Hàm để lấy toàn bộ danh sách sân khi trang tải
  const fetchAllCourts = async () => {
    try {
      const response = await fetch('https://bepickleball.vercel.app/api/post/future', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courts');
      }

      const data = await response.json();
      setAllCourts(data); // Lưu toàn bộ sân vào allCourts
      setFilteredResults(data); // Ban đầu hiển thị tất cả sân
    } catch (error) {
      console.error('Error fetching courts:', error);
    }
  };

  useEffect(() => {
    fetchAllCourts(); // Lấy dữ liệu khi component tải lần đầu
  }, []);

  return (
    <div className="court-layout" style={{ backgroundColor: "#F0F0F0" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        {/* Home Component */}
        <HomeComponent />
        <div id='body-court'>
          {/* Filter Component */}
          {/* Truyền dữ liệu sân và hàm lọc kết quả */}
          <DetailedFilterComponent setFilteredResults={setFilteredResults} allCourts={allCourts} />

          {/* Court List Component */}
          {/* Hiển thị kết quả đã lọc */}
          <CourtListComponent filteredResults={filteredResults} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CourtLayout;
