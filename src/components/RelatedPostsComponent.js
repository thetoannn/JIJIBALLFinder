import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CourtComponent from './CourtComponent';
import '../styles/screens/CourtListComponent.css'; // Import custom CSS

const CourtListComponent = () => {
  const [courts, setCourts] = useState([]); // State để lưu trữ danh sách sân
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
  const [randomCourts, setRandomCourts] = useState([]); // State để lưu trữ danh sách sân ngẫu nhiên

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch('https://bepickleball.vercel.app/api/post/future'); // Địa chỉ API của bạn
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setCourts(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Error fetching courts:', error);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi fetch hoàn tất
      }
    };

    fetchCourts(); // Gọi hàm fetch
  }, []);

  useEffect(() => {
    if (!loading && courts.length > 0) {
      // Chọn ngẫu nhiên 3 sân từ danh sách
      const getRandomCourts = () => {
        const shuffled = courts.sort(() => 0.5 - Math.random()); // Xáo trộn danh sách sân
        return shuffled.slice(0, 3); // Lấy 3 sân đầu tiên
      };

      setRandomCourts(getRandomCourts()); // Cập nhật danh sách sân ngẫu nhiên
    }
  }, [loading, courts]); // Chỉ chạy khi loading hoặc courts thay đổi

  return (
    <div className="court-list-container">
      <h2>Các bài tương tự</h2>
      <Row style={{ padding: "20px" }}>
        {randomCourts.map((court) => (
          <Col key={court._id} md={4} style={{ padding: 0 }}>
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
              style={{ width: "100%", alignItems: 'center', justifyContent: 'center', textAlign: "center" }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourtListComponent;
