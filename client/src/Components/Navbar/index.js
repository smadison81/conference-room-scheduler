import React from "react";
import "./style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import API from "../../utils/API"


function Navbar() {
  
  return (
    <Jumbotron fluid>
      <Container>
      <img className="mda" src={require("../../images/MDAndersonBlk.png")} alt=""/>
        <div className="lead">Division of Cancer Medicine Conference Room Reservation System </div>
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
      </Container>
    </Jumbotron>
  );
}

export default Navbar;
