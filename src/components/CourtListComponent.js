import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import CourtComponent from './CourtComponent';
import Pagination from '@mui/material/Pagination';
import '../styles/screens/CourtListComponent.css';

const CourtListComponent = ({ filteredResults }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  // useEffect để thiết lập loading và gọi hàm fetch
  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true); // Thiết lập loading trước khi fetch dữ liệu
      try {
        const response = await fetch('https://bepickleball.vercel.app/api/post/future'); // Địa chỉ API của bạn
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        // Xử lý dữ liệu nếu cần
        // setCourts(data); // Nếu bạn muốn lưu courts vào state
      } catch (error) {
        console.error('Error fetching courts:', error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi fetch hoàn tất
      }
    };

    fetchCourts(); // Gọi hàm fetch khi component mount
  }, []); // Chỉ gọi một lần khi mount

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentCourts = filteredResults.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="court-list-container">
      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row style={{ padding: '20px' }}>
            {currentCourts.map((court) => (
              <Col key={court._id} md={3} style={{ padding: 0 }}>
                <CourtComponent
                  name={court.court_name}
                  price={court.cost}
                  slots={court.total_players}
                  location={court.location}
                  type={court.court_type}
                  level={parseFloat(court.skill_level)}
                  images={court.images}
                  players_needed={court.players_needed}
                  applied_players={court.applied_players}
                  date={court.play_date}
                  time={court.play_time}
                  contact_info={court.contact_info}
                  applied_count={court.applied_count}
                  idCourt={court._id || court.id}
                  userName={court.user_id.username}
                />
              </Col>
            ))}
          </Row>

          <div className='pagination'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              siblingCount={2}
              boundaryCount={1}
              variant="outlined"
              shape="circular"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '50%',
                  margin: '0 5px',
                  color: '#000',
                  backgroundColor: '#fff',
                  width: '30px',
                  height: '43px',
                  fontWeight: 600,
                  '&.Mui-selected': {
                    backgroundColor: '#2d70a1 !important',
                    color: '#fff',
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CourtListComponent;
