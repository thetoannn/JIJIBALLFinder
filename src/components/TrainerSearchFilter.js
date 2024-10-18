import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/screens/TrainerSearchFilter.css'; // Ensure to create this CSS file for custom styles

const TrainerSearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    location: '',
    level: '',
    otherLocation: '', // Thêm trường cho tuỳ chọn "Other"
    typeTrain: ''
  });

  const [showOther, setShowOther] = useState(false); // Trạng thái cho việc hiển thị "Other"

  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Chuyển đổi giá trị nhập vào thành chữ thường
    const normalizedValue = capitalizeFirstLetter(value);

    if (name === 'location' && normalizedValue === 'other') {
      setShowOther(true); // Hiển thị trường Other nếu chọn "Other"
    } else if (name === 'location') {
      setShowOther(false); // Ẩn trường Other nếu chọn khác
      setFilters({ ...filters, otherLocation: '' }); // Xoá giá trị Other khi chọn khác
    }
    
    // Cập nhật giá trị bộ lọc và kích hoạt tìm kiếm
    const updatedFilters = { ...filters, [name]: normalizedValue }; // Sử dụng normalizedValue
    setFilters(updatedFilters);

    // Kích hoạt tìm kiếm ngay khi có thay đổi
    onSearch(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = { location: '', level: '', otherLocation: '', typeTrain: '' };
    setFilters(resetFilters);
    setShowOther(false);
    onSearch(resetFilters); // Reset filters in parent
  };

  return (
    <div className="detailed-filter">
      <Form>
        <Row className="g-2">
          <Col xs="auto" className="me-1">
            <Form.Group controlId="formLocation">
              <Form.Control
                type='text'
                placeholder='Nhập thành phố'
                name="location"
                value={filters.location}
                onChange={handleInputChange} // Kích hoạt tìm kiếm ngay lập tức
                className="form-control-sm"
              />
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formOtherLocation">
              <Form.Control
                type="text"
                placeholder="Quận huyện (nếu có)"
                name="otherLocation"
                value={filters.otherLocation}
                onChange={handleInputChange} // Kích hoạt tìm kiếm ngay lập tức
                className="form-control-sm"
              />
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formTypeTrain">
              <Form.Select
                name="typeTrain"
                value={filters.typeTrain}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Hình thức học</option>
                <option value="kèm 1 hoặc 2">kèm 1 hoặc 2</option>
                <option value="ghép nhóm 4-6 người">ghép nhóm 4-6 người</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Button variant="link" className="btn-sm" onClick={handleReset}>
              Xóa lọc
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TrainerSearchFilter;
