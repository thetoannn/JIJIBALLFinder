import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios'; // Sử dụng axios để gửi yêu cầu API
import '../styles/screens/CoachList.css'; // Custom CSS

const CoachList = () => {
  const [coaches, setCoaches] = useState([]); // Khởi tạo coaches là một mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        // Sử dụng phương thức GET để lấy danh sách huấn luyện viên
        const response = await axios.get('https://bepickleball.vercel.app/api/coach/list');

        console.log('Fetched coaches:', response.data); // Kiểm tra dữ liệu nhận được
        setCoaches(response.data); // Đặt coaches từ dữ liệu nhận được
      } catch (error) {
        console.error('Error fetching coaches:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  // Hàm xóa huấn luyện viên
  const handleDelete = async (coachId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thực hiện hành động này.');
      return;
    }
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa huấn luyện viên này?');
    if (!confirmDelete) return;
    console.log('Xóa huấn luyện là:', coachId);

    console.log(token, "token");
    
    

    try {
      const response = await axios.delete(`https://bepickleball.vercel.app/api/coach/delete/${coachId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.status === 200) {
        setCoaches(coaches.filter((coach) => coach._id !== coachId)); // Cập nhật danh sách huấn luyện viên
        alert('Huấn luyện viên đã được xóa thành công');
      } else {
        alert('Xóa huấn luyện viên thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi xóa huấn luyện viên:', error);
      alert('Có lỗi xảy ra khi xóa huấn luyện viên');
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Thông báo khi đang tải
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="coach-list">
      <h4>Danh sách Huấn luyện viên</h4> {/* Đổi tiêu đề cho chính xác */}
      <div className="coach-items scrollable-list">
        {coaches.length === 0 ? ( // Kiểm tra nếu coaches là mảng rỗng
          <div>Không có huấn luyện viên nào.</div>
        ) : (
          // Hiển thị tối đa 3 huấn luyện viên
          coaches.map((coach) => (
            <div key={coach._id} className="coach-item">
              <img
                src={coach.images || '/assets/images/default-coach.png'}
                alt={coach.name}
                className="coach-image"
              />
              <div className="coach-details">
                <h5>{coach.name}</h5>
                <p style={{ color: '#828282' }}>SDT: {coach.contact_info.phone}</p>
              </div>
              <div className="coach-actions">
                <Button variant="danger" onClick={() => handleDelete(coach._id)}>Xóa bài</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoachList;
