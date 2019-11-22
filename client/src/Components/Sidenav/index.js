import React from "react";
import "./style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function Sidenav() {
  return (
    <Col md="2">
      <ListGroup>
        <li
          id="userinfo"
          className="list-group-item list-group-item-action"
          style={{ marginBottom: "5px" }}
        >
          Welcome...
          <br />
          <i className="fas fa-user-astronaut"></i>{" "}
          <span style={{ color: "dodgerBlue" }}>Default User</span>
        </li>
        <li className="list-group-item list-group-item-action">
          <i className="fas fa-home"></i> Home
        </li>
        <li
          data-id="FC112017"
          className="list-group-item list-group-item-action"
        >
          <i className="fas fa-users"></i> FC 11.2017
        </li>
        <li
          data-id="FC112037"
          className="list-group-item list-group-item-action"
        >
          <i className="fas fa-users"></i> FC 11.2037
        </li>
        <li className="list-group-item list-group-item-action">
          <i className="far fa-bell fa-fw"></i> Notifications
        </li>
        <li className="list-group-item list-group-item-action">
          {/* <i className="fas fa-sign-out-alt"></i> */}
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ListGroup>
    </Col>
  );
}

export default Sidenav;
