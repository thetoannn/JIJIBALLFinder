import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import '../styles/screens/PostForm.css'; // Add your custom styles

const PostForm = () => {
  const [formData, setFormData] = useState({
    trainerName: '',
    experience: '',
    images: [],
    phoneNumber: '',
    price_per_session: '',
    zaloLink: '',
    facebookLink: '',
    trainerLocation: '',
    description: '',
    rememberChoice: false,
    address: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState({ success: false, error: null }); 

  // Effect to load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input for images
      setFormData({ ...formData, [name]: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log("Updated Post State:", { ...formData, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, rememberChoice: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thực hiện hành động này.');
      return;
    }

    // Check if remember choice is checked
    if (formData.rememberChoice) {
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      localStorage.removeItem('formData');
    }

    // Log data for testing
    console.log('Form Data Submitted:', formData);

    // Prepare form data for submission
    const data = new FormData();
    data.append('name', formData.trainerName);
    data.append('price_per_session', formData.price_per_session); // Correct the field name
    data.append('address', formData.address); // Append the address field
    data.append('contact_info[phone]', formData.phoneNumber);
    data.append('contact_info[facebook]', formData.facebookLink);
    data.append('description', formData.description);

    // Append the file if selected
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        data.append(`images`, image); // Đính kèm từng ảnh vào FormData
      });
    } else {
      alert('No image selected. Please upload an image.');
      return; // Prevent submission if no image is selected
    }

    for (let pair of data.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    // Send data to the API
    try {
      const response = await fetch('https://bepickleball.vercel.app/api/coach/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const result = await response.json();
      console.log('Response from API:', result);
      console.log('Response status:', response);

      if (response.ok) {
        console.log('Form submitted successfully!');
        setSubmissionStatus({ success: true, error: null }); // Set success status
      } else {
        console.error('Error in submission:', result.error);
        setSubmissionStatus({ success: false, error: result.error }); // Set error status
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus({ success: false, error: 'An unexpected error occurred.' });
    }
  };

  return (
    <Form className="post-form" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/post-background.png)` }} onSubmit={handleSubmit}>
      <h4 style={{ textAlign: 'left' }}>Bài đăng</h4>

      {submissionStatus.success && (
        <Alert variant="success" onClose={() => setSubmissionStatus({ success: false, error: null })} dismissible>
          Đăng bài thành công!
        </Alert>
      )}
      {submissionStatus.error && (
        <Alert variant="danger" onClose={() => setSubmissionStatus({ success: false, error: null })} dismissible>
          {submissionStatus.error}
        </Alert>
      )}
      {/* Tên huấn luyện viên */}
      <Form.Group controlId="trainerName">
        <Form.Control
          type="text"
          placeholder="Nhập tên huấn luyện viên"
          name="trainerName"
          value={formData.trainerName}
          onChange={handleInputChange}
          style={{ width: '90%', marginBottom: "20px" }}
        />
      </Form.Group>

      {/* Trình độ và input ảnh */}
      <Row>
        <Col md={6} style={{ padding: 0 }}>
        <Form.Group controlId="images">
            <Form.Control
              type="file"
              name="images"
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
              multiple
            />
          </Form.Group>
        </Col>
        <Col md={6} style={{ padding: 0 }}>
        <Form.Group controlId="price_per_session">
            <Form.Control
              type="text"
              placeholder="Nhập giá tiền"
              name="price_per_session"
              value={formData.price_per_session}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Số điện thoại và Giá tiền */}
      <Row>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="phoneNumber">
            <Form.Control
              type="text"
              placeholder="Nhập số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
        <Col md={6} style={{ padding: 0 }}>
          <Form.Group controlId="facebookLink">
            <Form.Control
              type="text"
              placeholder="Nhập link Facebook"
              name="facebookLink"
              value={formData.facebookLink}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Link Zalo và Facebook */}
      <Row>
        <Col style={{ padding: 0 }}>
        <Form.Group controlId="address">
            <Form.Control
              type="text"
              placeholder="Khu vực cụ thể"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              style={{ padding: 0, width: '90%' }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="description">
        <Form.Control
          type="text"
          placeholder="Thành tích cá nhân"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          style={{ width: '90%', marginBottom: "20px" }}
        />
      </Form.Group>

      {/* Checkbox: Remember my choices */}
      <Form.Group controlId="rememberChoice">
        <Form.Check
          type="checkbox"
          label="Lưu lựa chọn của bạn cho lần sau"
          checked={formData.rememberChoice}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="me-2" style={{backgroundColor: "#2D70A1", color: 'white', borderRadius: '25px'}}>
        Đăng bài
      </Button>
      <Button variant="secondary" type="button" style={{backgroundColor: "white", color: '#2D70A1', borderRadius: '25px'}}>
        Hủy bỏ
      </Button>
    </Form>
  );
};

export default PostForm;
