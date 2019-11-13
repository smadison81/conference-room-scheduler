import React from "react";
import './style.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';




function Navbar() {
  return (
   <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Card>
            <Card.Body>Conference Room Scheduler</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>Current / Upcoming Events</Card.Body>
          </Card>
        </Col>
      </Row>
  );
}

export default Navbar;
