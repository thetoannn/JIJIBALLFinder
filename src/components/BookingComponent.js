import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';

const BookingComponent = () => {
  return (
    <div className="booking-form">
      <h2>Đặt sân Pickleball</h2>
      <Form>
        <Form.Group controlId="formCourt">
          <Form.Label>Sân <FaCalendarAlt /></Form.Label>
          <Form.Control as="select">
            <option>Sân 1 - 100.000 VND</option>
            <option>Sân 2 - 120.000 VND</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formSlots">
          <Form.Label>Số người <FaUsers /></Form.Label>
          <Form.Control type="number" min="1" max="8" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Xác nhận đặt sân
        </Button>
      </Form>
    </div>
  );
}

export default BookingComponent;
