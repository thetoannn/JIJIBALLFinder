import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CiLocationOn, CiMedal } from "react-icons/ci";
import { FaArrowUpRightDots, FaFacebook, FaPhone } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { PiUserSquareLight } from "react-icons/pi";
import { useLocation } from "react-router-dom";

const CoachDetailComponent = () => {
    const location = useLocation();
    const { state } = location;
    const {
        name,
        price,
        level,
        phone,
        contact,
        address,
        location: courtLocation,
        type,
        images = [],
        description,
    } = state || {};

    const [selectedImage, setSelectedImage] = useState(images[0] || ""); // Trạng thái cho hình ảnh đã chọn
    const [showOverlay, setShowOverlay] = useState(false); // Trạng thái cho overlay
    console.log(selectedImage);

    // Sử dụng useEffect để cập nhật selectedImage khi state thay đổi
    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0]); // Cập nhật ảnh đầu tiên khi dữ liệu huấn luyện viên thay đổi
        }
    }, [images]); // Lắng nghe sự thay đổi của images

    const handleViewMore = () => {
        alert("Hiển thị thêm hình ảnh...");
    };

    const handleThumbnailClick = (img) => {
        setSelectedImage(img); // Cập nhật hình ảnh đã chọn khi nhấp vào thumbnail
    };

    const handleShowOverlay = () => {
        setShowOverlay(true); // Hiện overlay khi nhấp vào nút "Xem thêm"
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false); // Ẩn overlay khi nhấp vào overlay
    };

    // console.log(description);

    return (
        <div className="court-detail-container">
            <Card id="court-detail-card">
                <Row>
                    <Col md={7} style={{ padding: 0 }}>
                        <Card.Body className="court-card-body">
                            <Row>
                                <Col md={12} style={{ padding: 0 }}>
                                    {/* Hiển thị hình ảnh lớn */}
                                    {selectedImage ? (
                                        <div className="image-container">
                                            <img
                                                src={selectedImage}
                                                alt={`Coach ${name}`}
                                                className="large-image"
                                            />
                                            {showOverlay && (
                                                <div className="overlay" onClick={handleCloseOverlay}>
                                                    <span className="overlay-text">Xem thêm</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="placeholder-image">No Image Available</div>
                                    )}
                                </Col>
                            </Row>

                            <Row className="image-grid">
                                {/* 3 ảnh nhỏ */}
                                {images.slice(0, 3).map((img, index) => (
                                    <Col md={3} key={index} className="small-image-col">
                                        {index === 2 ? ( // Hiển thị nút "Xem thêm" trên ảnh thứ 3
                                            <div
                                                className="small-image-container"
                                                onClick={handleShowOverlay}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Coach ${name} ${index + 1}`}
                                                    className="small-image"
                                                />
                                                <div className="overlay">
                                                    <span
                                                        className="overlay-text"
                                                        onClick={handleViewMore}
                                                    >
                                                        Xem thêm
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={img}
                                                alt={`Coach ${name} ${index + 1}`}
                                                className="small-image"
                                                onClick={() => handleThumbnailClick(img)} // Cập nhật hình ảnh lớn khi nhấp
                                            />
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Col>
                    <Col md={5} className="court-details">
                        <Card.Body id="court-card-body">
                            <Card.Title style={{ fontSize: "32px", fontWeight: "500" }}>
                                {name}
                            </Card.Title>
                            <Card.Text
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    color: "#059A8F",
                                }}
                            >
                                {price.toLocaleString("vi-VN")} VND / người
                            </Card.Text>
                            <Card.Text className="court-info">
                                <div className="court-info-item">
                                    <CiLocationOn className="icon" style={{ color: "#828282" }} />
                                    <a
                                        href={courtLocation}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Khu vực: {address}
                                    </a>
                                </div>
                            </Card.Text>
                            <Card.Text>
                                <CiMedal
                                    className="icon"
                                    style={{ color: "#828282", fontSize: "20px" }}
                                />
                                Thành tích nổi bật: {description}
                            </Card.Text>
                            <Card.Text>
                                <div className="icon" style={{ color: "#828282" }} />Liên hệ:
                                &nbsp;&nbsp;
                                {contact?.phone !== 'Không có số điện thoại' ? (
                                    <a>
                                        <FaPhone style={{ color: "#828282", fontSize: "17px", marginRight: "8px" }} />{contact?.phone}
                                    </a>
                                ) : (
                                    'Không có Số điện thoại'
                                )}
                                &nbsp;&nbsp;
                                {contact?.facebook !== 'Không có Facebook' ? ( 
                                    <a 
                                        href={contact?.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none", color: "#064D7E" }}
                                    >
                                        {/* Icon Facebook */}
                                        <FaFacebook style={{ color: "#828282", fontSize: "20px", marginRight: "8px" }} />
                                        Facebook
                                    </a>
                                ) : (
                                    'Không có Facebook'
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
                {/* Court Description */}
                <Row>
                    <Col className="court-description" style={{ textAlign: "left" }}>
                        <h5 className="des-text-1" style={{ color: "#059A8F" }}>
                            Lưu ý
                        </h5>
                        <h5 className="des-text-2" style={{ color: "#059A8F" }}>
                            Mô tả
                        </h5>
                        <div
                            style={{
                                width: "60px",
                                height: "1.8px",
                                color: "#059A8F",
                                backgroundColor: "#059A8F",
                                margin: "10px 0",
                            }}
                        />
                        <br />
                        <p className="des-text-1">
                            1. Giá trên là giá ghép chung giữa các bạn học viên khoảng 6
                            người/lớp, đã bao gồm toàn bộ chi phí sân và bóng tập. <br />
                            2. Xác minh thông tin HLV: Chúng tôi cung cấp đầy đủ thông tin về
                            trình độ, địa điểm, thành tích, giá tiền của các HLV. Tất cả đều
                            được xác thực. <br />
                            3. Mọi người có thể liên hệ HLV thông qua SĐT và FACEBOOK của họ,
                            trang Web chỉ cung cấp những thông tin uy tín và được kiểm duyệt
                            không hỗ trợ liên hệ. <br />
                            4. Đảm bảo rằng HLV có chuyên môn giảng dạy.
                        </p>
                        <p className="des-text-2">
                            Sân Pickleball có hình chữ nhật với kích thước nhỏ hơn sân tennis,
                            được chia làm hai nửa bởi một lưới ở giữa. Sân thường có các đặc
                            điểm sau: <br />
                            <ol>
                                <li>
                                    Kích thước: Sân có chiều dài 13,41 mét (44 feet) và chiều rộng
                                    6,1 mét (20 feet). Mỗi bên sân có chiều dài 6,71 mét (22
                                    feet).
                                </li>
                                <li>
                                    Lưới: Lưới cao 91,4 cm (36 inch) ở hai đầu và cao 86,4 cm (34
                                    inch) ở giữa. Lưới được căng ngang giữa sân, chia sân thành
                                    hai phần bằng nhau.
                                </li>
                                <li>
                                    Khu vực:
                                    <ul>
                                        <li>
                                            Khu vực không vô lê: Gần lưới, có chiều dài 2,13 mét (7
                                            feet) tính từ lưới về mỗi bên sân, được gọi là khu vực
                                            "kitchen" hoặc "no-volley zone". Trong khu vực này, người
                                            chơi không được thực hiện các cú vô lê (đánh bóng mà không
                                            cho bóng chạm đất trước).
                                        </li>
                                        <li>
                                            Phần sân còn lại: Được chia thành hai phần chính, tương
                                            ứng với phần sân phải và phần sân trái, nơi người chơi có
                                            thể giao bóng và đánh trả.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </p>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default CoachDetailComponent;
