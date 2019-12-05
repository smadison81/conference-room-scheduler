import React from "react";
import "./style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import API from "../../utils/API";
import moment from "moment";


export default class Navbar extends React.Component {
  
  state = {
    calendarEvent: [],
    start: "",
    end: "",
    title: "",
    description: "",
    id: "",
    time: moment().format("dddd, Do MMMM, h:mm A")
  };

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  getEvents = () => {
    API.getEvents()
      .then(res => {
        this.setState({ calendarEvent: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { time, calendarEvent } = this.state;
    return (
      <Jumbotron fluid>
        <Container>
          <img
            className="mda"
            src={require("../../images/MDAndersonBlk.png")}
            alt=""
          />
          <div className="lead">
            {" "}
          </div>
          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <Card style={{backgroundColor: "transparent"}}>
                <Card.Body className="clock">{time}</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{backgroundColor: "transparent"}}>
                <Card.Body className="clock">{this.calendarEvent}</Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}
