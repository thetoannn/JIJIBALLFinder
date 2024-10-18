import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Sử dụng axios để lấy dữ liệu
import '../styles/screens/CourtListComponent.css'; // Import custom CSS
import CoachComponent from './CoachComponent';

const CoachListComponent = () => {
    const [coaches, setCoaches] = useState([]);
    const [randomCoaches, setRandomCoaches] = useState([]); // State để lưu trữ danh sách huấn luyện viên ngẫu nhiên
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm để lấy dữ liệu từ API
    const fetchCoaches = async () => {
        try {
            const response = await axios.get('https://bepickleball.vercel.app/api/coach/list');
            setCoaches(response.data); // Giả sử dữ liệu trả về là mảng huấn luyện viên
        } catch (error) {
            console.error('Error fetching coaches:', error);
            setError('Có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoaches(); // Gọi hàm fetchCoaches khi component được mount
    }, []);

    useEffect(() => {
        if (!loading && coaches.length > 0) {
            // Chọn ngẫu nhiên 3 huấn luyện viên từ danh sách
            const getRandomCoaches = () => {
                const shuffled = coaches.sort(() => 0.5 - Math.random()); // Xáo trộn danh sách huấn luyện viên
                return shuffled.slice(0, 3); // Lấy 3 huấn luyện viên đầu tiên
            };

            setRandomCoaches(getRandomCoaches()); // Cập nhật danh sách huấn luyện viên ngẫu nhiên
        }
    }, [loading, coaches]); // Chỉ chạy khi danh sách coaches thay đổi

    if (loading) {
        return <div>Đang tải dữ liệu...</div>; // Thông báo khi đang tải
    }

    if (error) {
        return <div>{error}</div>; // Hiển thị lỗi nếu có
    }

    return (
        <div className="court-list-container">
            <h2>Các huấn luyện viên tương tự</h2>
            <Row style={{ padding: "20px" }}>
                {randomCoaches.map((coach) => (
                    <Col key={coach._id} md={4} style={{ padding: 0 }} >
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
                                textAlign: "center",
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default CoachListComponent;
