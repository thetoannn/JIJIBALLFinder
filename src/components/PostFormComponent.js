import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaDollarSign, FaPhoneAlt, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/screens/PostFormComponent.css';


const PostFormComponent = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    name: '',
    location: '',
    courtType: '',
    playTime: '',
    slots: 0,
    date: new Date(), // Initialize with a Date object
    price: '',
    phone: '',
    facebook: '',
    image: [],
    level: '<2.0', // Added default value for skill level
    playEnd: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "date") {
        const dateValue = new Date(value);
        setPost({ ...post, [name]: dateValue });
    } else if (name === "image") {
        setPost({ ...post, image: [...files] }); // Capture the first file selected
    } else {
        setPost({ ...post, [name]: value });
    }
    console.log("Updated Post State:", { ...post, [name]: value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    console.log('Token:', token);
  
    if (!post.date) {
        alert('Please enter a valid date.');
        return;
    }
  
    const dateObject = new Date(post.date);
  
    if (isNaN(dateObject)) {
        alert('Please enter a valid date.');
        return;
    }
  
    const formattedDate = formatDate(dateObject);
    console.log("Formatted Date:", formattedDate, "typeDate", typeof (formattedDate));

    if (!post.location || post.slots <= 0 || !post.courtType || !post.price || !post.phone) {
        alert('Please fill in all required fields.');
        return;
    }
  
    // Create a FormData object to send form data and file
    const formData = new FormData();
    formData.append("court_name", post.name);
    formData.append("location", post.location);
    formData.append("total_players", post.slots);
    formData.append("court_type", post.courtType);
    formData.append("players_needed", post.memberSlots);
    formData.append("skill_level", post.level);
    formData.append("play_date", formattedDate);
    formData.append("cost", post.price);
    formData.append("play_time", `${post.playTime} - ${post.playEnd}`);
    formData.append("contact_info", `SĐT: ${post.phone}, Facebook: ${post.facebook}`);
    
    // Append the image file (the actual file, not the path)
    if (post.image.length > 0) {
      post.image.forEach((image, index) => {
        formData.append(`images`, image); // Multiple images can be appended with the same key
      });
    } else {
      alert('Please upload at least one image.');
      return;
    }
  
    try {
        const response = await fetch("https://bepickleball.vercel.app/api/post/create", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`, // Only authorization header
            },
            body: formData, // Use FormData as the body
        });
        console.log("-------", response);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Response Error:', errorData);
            alert(`${errorData.error}`);
            return;
        }
  
        const result = await response.json();
        setShowModal(true); // Show modal on success
    } catch (error) {
        console.error(error);
        alert('Có lỗi xảy ra khi đăng bài!');
    }
};


  // Utility function to format Date object to DD-MM-YYYY
  const formatDate = (dateObject) => {
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`; // Return formatted date
  };


  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className='post-back'>
      <Row className="g-3">
        {/* Bên trái: Thông tin chung */}
        <Col md={6} style={{ padding: 0 }} className="g-3">
          <Card className="mb-4 card" id='card-1'>
            <Card.Body style={{ padding: 0 }}>
              <Card.Title id='post-card-title'>Thông tin chung</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupName">
                  <Form.Label><FaMapMarkerAlt /> Tên sân</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nhập tên sân"
                    value={post.name}
                    onChange={handleInputChange}
                    style={{ width: '90%' }}
                  />
                </Form.Group>

                <Form.Group controlId="formLocation">
                  <Form.Label><FaMapMarkerAlt /> Liên kết địa điểm</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Nhập liên kết địa điểm"
                    value={post.location}
                    onChange={handleInputChange}
                    style={{ width: '90%' }}
                  />
                </Form.Group>

                <Form.Group controlId="formSlots" style={{ width: '90%', textAlign: 'center' }}>
                  <Form.Label><FaUsers /> Số người trên sân (bắt buộc)</Form.Label>
                  <Form.Control
                    type="number"
                    name="slots"
                    value={post.slots}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCourtType">
                  <Form.Label>Loại sân:</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Sân Không Có Mái Che"
                      name="courtType"
                      value="Sân không có mái che"
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Sân Có Mái Che"
                      name="courtType"
                      value="Sân Có Mái Che"
                      onChange={handleInputChange}
                    />
                  </div>
                </Form.Group>

                {/* Tải lên hình ảnh và video */}
                <Form.Group controlId="formImage" style={{ width: '90%', textAlign: 'center' }}>
                  <Form.Label>Thêm ảnh/Video (bắt buộc)</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    style={{ height: '210px', borderRadius: '10px' }}
                    name="image"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
              <br />
            </Card.Body>
          </Card>
        </Col>

        {/* Bên phải: Thông tin khác trong 3 thẻ */}
        <Col md={6} style={{ padding: 0 }} className="g-3">
          <Row style={{ margin: 0 }}>
            <Col md={6} style={{ padding: 0 }} className="g-3">
              <Row style={{ margin: 0 }}>
                {/* Yêu cầu về thành viên */}
                <Col md={12} style={{ padding: 0 }}>
                  <Card className="mb-3 card" id='card-2'>
                    <Card.Body style={{ padding: 0 }}>
                      <Card.Title id='post-card-title'>Yêu cầu về thành viên</Card.Title>

                      <Form.Group controlId="formMemberSlots" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaUsers /> Số người cần tuyển (bắt buộc)</Form.Label>
                        <Form.Control
                          type="number"
                          name="memberSlots"
                          value={post.memberSlots}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="formLevel" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label>Trình độ (bắt buộc)</Form.Label>
                        <Form.Control as="select" name="level" onChange={handleInputChange}>
                          <option value="<2.0">1.0 - 2.0 (Newbie)</option>
                          <option value="2.5">2.5</option>
                          <option value="3.0">3.0</option>
                          <option value="3.5">3.5</option>
                          <option value="4.0">4.0</option>
                          <option value="4.5">4.5</option>
                          <option value="5.0">5.0</option>
                          <option value="5.5+">5.5+</option>
                        </Form.Control>
                      </Form.Group>
                      <br />
                    </Card.Body>
                  </Card>
                </Col>

                {/* Thời gian và chi phí */}
                <Col md={12} style={{ padding: 0 }}>
                  <Card className="mb-3 card" id='card-2'>
                    <Card.Body style={{ padding: 0 }}>
                      <Card.Title id='post-card-title'>Thời gian và chi phí</Card.Title>

                      <Form.Group controlId="formDate" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaCalendarAlt /> Ngày (bắt buộc)</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={post.date.toISOString().substring(0, 10)}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="playTime" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label>Thời gian bắt đầu</Form.Label>
                        <Form.Control as="select" name="playTime" onChange={handleInputChange}>
                        <option value="00:00">00:00</option>
  <option value="00:30">00:30</option>
  <option value="01:00">01:00</option>
  <option value="01:30">01:30</option>
  <option value="02:00">02:00</option>
  <option value="02:30">02:30</option>
  <option value="03:00">03:00</option>
  <option value="03:30">03:30</option>
  <option value="04:00">04:00</option>
  <option value="04:30">04:30</option>
  <option value="05:00">05:00</option>
  <option value="05:30">05:30</option>
  <option value="06:00">06:00</option>
  <option value="06:30">06:30</option>
  <option value="07:00">07:00</option>
  <option value="07:30">07:30</option>
  <option value="08:00">08:00</option>
  <option value="08:30">08:30</option>
  <option value="09:00">09:00</option>
  <option value="09:30">09:30</option>
  <option value="10:00">10:00</option>
  <option value="10:30">10:30</option>
  <option value="11:00">11:00</option>
  <option value="11:30">11:30</option>
  <option value="12:00">12:00</option>
  <option value="12:30">12:30</option>
  <option value="13:00">13:00</option>
  <option value="13:30">13:30</option>
  <option value="14:00">14:00</option>
  <option value="14:30">14:30</option>
  <option value="15:00">15:00</option>
  <option value="15:30">15:30</option>
  <option value="16:00">16:00</option>
  <option value="16:30">16:30</option>
  <option value="17:00">17:00</option>
  <option value="17:30">17:30</option>
  <option value="18:00">18:00</option>
  <option value="18:30">18:30</option>
  <option value="19:00">19:00</option>
  <option value="19:30">19:30</option>
  <option value="20:00">20:00</option>
  <option value="20:30">20:30</option>
  <option value="21:00">21:00</option>
  <option value="21:30">21:30</option>
  <option value="22:00">22:00</option>
  <option value="22:30">22:30</option>
  <option value="23:00">23:00</option>
  <option value="23:30">23:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="playEnd" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label>Thời gian kết thúc</Form.Label>
                        <Form.Control as="select" name="playEnd" onChange={handleInputChange}>
                        <option value="00:00">00:00</option>
  <option value="00:30">00:30</option>
  <option value="01:00">01:00</option>
  <option value="01:30">01:30</option>
  <option value="02:00">02:00</option>
  <option value="02:30">02:30</option>
  <option value="03:00">03:00</option>
  <option value="03:30">03:30</option>
  <option value="04:00">04:00</option>
  <option value="04:30">04:30</option>
  <option value="05:00">05:00</option>
  <option value="05:30">05:30</option>
  <option value="06:00">06:00</option>
  <option value="06:30">06:30</option>
  <option value="07:00">07:00</option>
  <option value="07:30">07:30</option>
  <option value="08:00">08:00</option>
  <option value="08:30">08:30</option>
  <option value="09:00">09:00</option>
  <option value="09:30">09:30</option>
  <option value="10:00">10:00</option>
  <option value="10:30">10:30</option>
  <option value="11:00">11:00</option>
  <option value="11:30">11:30</option>
  <option value="12:00">12:00</option>
  <option value="12:30">12:30</option>
  <option value="13:00">13:00</option>
  <option value="13:30">13:30</option>
  <option value="14:00">14:00</option>
  <option value="14:30">14:30</option>
  <option value="15:00">15:00</option>
  <option value="15:30">15:30</option>
  <option value="16:00">16:00</option>
  <option value="16:30">16:30</option>
  <option value="17:00">17:00</option>
  <option value="17:30">17:30</option>
  <option value="18:00">18:00</option>
  <option value="18:30">18:30</option>
  <option value="19:00">19:00</option>
  <option value="19:30">19:30</option>
  <option value="20:00">20:00</option>
  <option value="20:30">20:30</option>
  <option value="21:00">21:00</option>
  <option value="21:30">21:30</option>
  <option value="22:00">22:00</option>
  <option value="22:30">22:30</option>
  <option value="23:00">23:00</option>
  <option value="23:30">23:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formPrice" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaDollarSign /> Giá/người (bắt buộc)</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          placeholder="Nhập giá"
                          value={post.price}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <br />
                    </Card.Body>
                  </Card>
                </Col>

                {/* Thông tin liên hệ */}
                <Col md={12} style={{ padding: 0 }}>
                  <Card className="mb-3 card" id='card-2'>
                    <Card.Body style={{ padding: 0 }}>
                      <Card.Title style={{ textAlign: "center" }}>Thông tin liên hệ</Card.Title>

                      <Form.Group controlId="formPhone" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaPhoneAlt /> Số điện thoại (bắt buộc)</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Nhập số điện thoại"
                          value={post.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="formFacebook" style={{ width: '90%', textAlign: 'center' }}>
                        <Form.Label><FaFacebook /> Facebook</Form.Label>
                        <Form.Control
                          type="text"
                          name="facebook"
                          placeholder="Nhập Facebook"
                          value={post.facebook}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <br />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Hành động submit */}
          <div className="form-actions">
            <Form.Check type="checkbox" label={<span className="custom-label">&nbsp;&nbsp; Lưu lựa chọn của bạn cho lần sau</span>} className="d-flex justify-content-center" style={{ color: "fff" }} />
            <div className="d-flex justify-content-center">
              <Button variant="secondary" id='btn-post-1' className="post-form-button me-2">Hủy bỏ</Button>
              <Button variant="primary" type="submit" className='post-form-button' onClick={handleSubmit}>Đăng bài</Button>
            </div>
          </div>

          {/* Modal thành công */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bài đăng của bạn đã thành công!</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default PostFormComponent;
