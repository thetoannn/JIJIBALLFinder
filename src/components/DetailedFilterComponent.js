import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS của DatePicker
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/screens/DetailedFilterComponent.css';

const DetailedFilterComponent = ({ setFilteredResults, allCourts }) => {
  const [filters, setFilters] = useState({
    location: '',
    otherLocation: '',
    startTime: '',
    playType: '',
    level: '',
    courtType: '',
    numPeople: '',
    playDate: null, // Thay đổi giá trị khởi tạo
  });

  const [showOther, setShowOther] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'location' && value.toLowerCase() === 'other') {
      setShowOther(true);
    } else if (name === 'location') {
      setShowOther(false);
      setFilters({ ...filters, otherLocation: '' });
    }

    const normalizedValue = capitalizeFirstLetter(value);
    const updatedFilters = { ...filters, [name]: normalizedValue };
    setFilters(updatedFilters);

    // Gọi hàm lọc ngay khi giá trị thay đổi
    filterResults(updatedFilters);
  };

  const handleDateChange = (date) => {
    const updatedFilters = { ...filters, playDate: date };
    setFilters(updatedFilters);
    filterResults(updatedFilters); // Gọi hàm lọc
  };

  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const filterResults = (updatedFilters) => {
    const formattedPlayDate = updatedFilters.playDate
      ? new Date(updatedFilters.playDate).toLocaleDateString('vi-VN')
      : '';

    const filteredResults = allCourts.filter(court => {
      const locationFilter = updatedFilters.location === 'Other'
        ? court.court_name && court.court_name.toLowerCase().includes(updatedFilters.otherLocation.toLowerCase())
        : updatedFilters.location
          ? court.court_name && court.court_name.toLowerCase().includes(updatedFilters.location.toLowerCase())
          : true;

      const otherLocationFilter = updatedFilters.otherLocation
        ? court.court_name && court.court_name.toLowerCase().includes(updatedFilters.otherLocation.toLowerCase())
        : true;

      const playTypeFilter = updatedFilters.playType
        ? court.court_name && court.court_name.toLowerCase().includes(updatedFilters.playType.toLowerCase())
        : true;


      const startTimeFilter = updatedFilters.startTime
        ? court.play_time === updatedFilters.startTime
        : true;

      const levelFilter = updatedFilters.level
        ? court.skill_level && court.skill_level.includes(updatedFilters.level)
        : true;

      const courtTypeFilter = updatedFilters.courtType
        ? court.court_type && court.court_type.includes(updatedFilters.courtType)
        : true;

      const playDateFilter = formattedPlayDate
        ? court.play_date === formattedPlayDate
        : true;

      return (
        locationFilter &&
        otherLocationFilter &&
        startTimeFilter &&
        playTypeFilter &&
        levelFilter &&
        courtTypeFilter &&
        playDateFilter
      );
    });

    setFilteredResults(filteredResults);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      otherLocation: '',
      startTime: '',
      level: '',
      courtType: '',
      numPeople: '',
      playDate: null // Thay đổi giá trị khởi tạo
    });
    setShowOther(false);
    setFilteredResults(allCourts);
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
                onChange={handleInputChange}
                className="form-control-sm"
              />
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formOtherLocation">
              <Form.Control
                type="text"
                placeholder="Quận huyện (nếu cần)"
                name="otherLocation"
                value={filters.otherLocation}
                onChange={handleInputChange} // Kích hoạt tìm kiếm ngay lập tức
                className="form-control-sm"
              />
            </Form.Group>
          </Col>

          {/* {showOther && (
            <Col xs="auto" className="me-1">
              <Form.Group controlId="formOtherLocation">
                <Form.Control
                  type="text"
                  placeholder="Nhập địa điểm khác"
                  name="otherLocation"
                  value={filters.otherLocation}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>
            </Col>
          )} */}

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formPlayDate">
              <DatePicker
                selected={filters.playDate}
                onChange={handleDateChange}
                placeholderText="Ngày chơi" // Placeholder
                className="form-control form-control-sm"
                dateFormat="dd/MM/yyyy" // Định dạng ngày
              />
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formStartTime">
              <Form.Control
                as="select"
                name="startTime"
                value={filters.startTime}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Chọn giờ</option>
                {Array.from({ length: 48 }, (_, i) => {
                  const hour = String(Math.floor(i / 2)).padStart(2, '0');
                  const minute = i % 2 === 0 ? '00' : '30';
                  return (
                    <option key={i} value={`${hour}:${minute}`}>
                      {`${hour}:${minute}`}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formPlayType">
              <Form.Control
                as="select"
                name="playType"
                value={filters.playType}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Chọn loại nhóm</option>
                <option value="Xé Vé">Xé Vé</option>
                <option value="Giao Lưu">Giao Lưu</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formLevel">
              <Form.Control
                as="select"
                name="level"
                value={filters.level}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Trình độ</option>
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
          </Col>

          <Col xs="auto" className="me-1">
            <Form.Group controlId="formCourtType">
              <Form.Control
                as="select"
                name="courtType"
                value={filters.courtType}
                onChange={handleInputChange}
                className="form-control-sm"
              >
                <option value="">Loại sân</option>
                <option value="Sân Có Mái Che">Có mái che</option>
                <option value="Sân không có mái che">Không có mái che</option>
              </Form.Control>
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

export default DetailedFilterComponent;
