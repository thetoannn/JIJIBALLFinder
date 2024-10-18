import React, { useState } from 'react';
import Header from '../components/Header';
import HomeComponent from '../components/HomeComponent';
import TrainerSearchFilter from '../components/TrainerSearchFilter';
import CoachListComponent from '../components/CoachListComponent';
import Footer from '../components/Footer';

const CoachLayout = () => {
  const [searchFilters, setSearchFilters] = useState({
    trainerName: '',
    experienceLevel: '',
    typeTrain: ''
  });

  // Hàm để nhận thông tin tìm kiếm từ TrainerSearchFilter
  const handleSearch = (filters) => {
    setSearchFilters(filters); // Cập nhật bộ lọc tìm kiếm
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <Header />
      <HomeComponent />
      {/* Truyền hàm handleSearch cho TrainerSearchFilter */}
      <TrainerSearchFilter onSearch={handleSearch} />
      {/* Truyền searchFilters và bật phân trang cho CoachListComponent */}
      <CoachListComponent searchFilters={searchFilters} limit={Infinity} enablePagination={true} />
      <Footer />
    </div>
  );
};

export default CoachLayout;
