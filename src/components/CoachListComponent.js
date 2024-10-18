import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CoachComponent from './CoachComponent';
import Pagination from '@mui/material/Pagination'; // Import Pagination component

const CoachListComponent = ({ searchFilters = {}, limit = Infinity, enablePagination = false }) => {
  const [coaches, setCoaches] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 16; // Số lượng huấn luyện viên mỗi trang

  // Hàm để lấy dữ liệu từ API
  const fetchCoaches = async () => {
    try {
      const response = await fetch('https://bepickleball.vercel.app/api/coach/list');
      const data = await response.json();
      setCoaches(data); // Giả sử dữ liệu trả về là mảng huấn luyện viên
    } catch (error) {
      console.error('Error fetching coaches:', error);
    }
  };

  useEffect(() => {
    fetchCoaches(); // Gọi hàm fetchCoaches khi component được mount
  }, []);

  useEffect(() => {
    // Cập nhật tổng số trang mỗi khi danh sách huấn luyện viên thay đổi
    const filteredCoaches = coaches.filter((coach) => {
      const matchesName = searchFilters.trainerName
        ? coach.name.toLowerCase().includes(searchFilters.trainerName.toLowerCase())
        : true;

      const matchesTypeTrain = searchFilters.typeTrain
        ? coach.name.toLowerCase().includes(searchFilters.typeTrain.toLowerCase())
        : true;

      const matchesLocation = searchFilters.location && searchFilters.location !== 'Other'
        ? coach.address && coach.address.includes(searchFilters.location)
        : searchFilters.otherLocation
          ? coach.address && coach.address.includes(searchFilters.otherLocation)
          : true;

      const matchesLevel = searchFilters.level
        ? parseFloat(coach.skill_level) === parseFloat(searchFilters.level)
        : true;

      return matchesName && matchesLocation && matchesLevel && matchesTypeTrain;
    });

    // Cập nhật tổng số trang dựa trên số huấn luyện viên đã lọc
    setTotalPages(Math.ceil(filteredCoaches.length / itemsPerPage));
  }, [coaches, searchFilters]);

  // Lọc danh sách huấn luyện viên dựa trên tên và trình độ
  const filteredCoaches = coaches.filter((coach) => {
    const matchesName = searchFilters.trainerName
      ? coach.name.toLowerCase().includes(searchFilters.trainerName.toLowerCase())
      : true;

    const matchesTypeTrain = searchFilters.typeTrain
      ? coach.name.toLowerCase().includes(searchFilters.typeTrain.toLowerCase())
      : true;

    const matchesLocation = searchFilters.location && searchFilters.location !== 'Other'
      ? coach.address && coach.address.includes(searchFilters.location)
      : searchFilters.otherLocation
        ? coach.address && coach.address.includes(searchFilters.otherLocation)
        : true;

    const matchesLevel = searchFilters.level
      ? parseFloat(coach.skill_level) === parseFloat(searchFilters.level)
      : true;

    return matchesName && matchesLocation && matchesLevel && matchesTypeTrain;
  });

  // Xác định số lượng huấn luyện viên sẽ được hiển thị cho trang hiện tại
  const displayedCoaches = enablePagination
    ? filteredCoaches.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : filteredCoaches.slice(0, limit); // Hiển thị theo limit nếu không có phân trang

  const handlePageChange = (event, value) => {
    setPage(value); // Cập nhật trang hiện tại
  };

  return (
    <div className="coach-list ms-3" style={{ textAlign: 'center' }}>
      <h2 style={{ fontWeight: '600', margin: "50px 0 30px 0" }}>Huấn Luyện Viên</h2>

      {/* Responsive grid for coach list */}
      <Row className="coach-list-row">
        {displayedCoaches.length > 0 ? (
          displayedCoaches.map((coach, index) => (
            <Col key={index} style={{ padding: 0 }}>
              <CoachComponent
                name={coach.name}
                price={coach.price_per_session.toLocaleString('vi-VN')}
                level={coach.rating}
                contact={coach.contact_info}
                phone={coach?.contact_info.phone}
                images={coach.images}
                address={coach.address}
                description={coach.description}
                style={{
                  width: "250px", /* Kích thước cố định cho mỗi thẻ coach */
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: "center"
                }}
              />
            </Col>
          ))
        ) : (
          <p>Không tìm thấy huấn luyện viên nào.</p>
        )}
      </Row>

      {/* Pagination chỉ hiển thị nếu enablePagination là true */}
      {enablePagination && (
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
      )}
    </div>
  );
};

export default CoachListComponent;
