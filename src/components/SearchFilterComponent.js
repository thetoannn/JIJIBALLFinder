import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchFilterComponent = () => {
  const [filters, setFilters] = useState({
    location: '',
    startTime: '',
    level: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
  };

  return (
    <div className="search-filter">
      <h2>Tìm kiếm sân</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLocation">
          <Form.Label>Địa điểm</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Nhập địa điểm"
            value={filters.location}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formStartTime">
          <Form.Label>Giờ bắt đầu</Form.Label>
          <Form.Control
            type="time"
            name="startTime"
            value={filters.startTime}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLevel">
          <Form.Label>Trình độ</Form.Label>
          <Form.Control as="select" name="level" value={filters.level} onChange={handleInputChange}>
            <option value="1.0-2.0">1.0 - 2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="4.0">4.0</option>
            <option value="5.5">5.5+</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          <FaSearch /> Tìm kiếm
        </Button>
      </Form>
    </div>
  );
}

export default SearchFilterComponent;
