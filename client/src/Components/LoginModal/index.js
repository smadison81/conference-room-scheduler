import React from "react";
import "./style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import $ from 'jquery'

export default class LoginModal extends React.Component {

    
  render() {
    return (
      <Modal
        fade
        id="login"
        tabindex="-1"
        role="dialog"
        aria-labelledby="SecurityLogin"
        aria-hidden="true"
      >
        <Modal.Dialog role="document" style="width:425px;margin-top: 15%">
          <Modal.Content>
            <Modal.Header>
              <h4>
                {" "}
                <Modal.Title id="exampleModalLabel" />
                <i className="far fa-user-chart"></i> CONFERENCE ROOM LOGIN
              </h4>
            </Modal.Header>
            <Modal.Body>
              <form>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-user"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="email"
                    className="form-control form-control-lg userid"
                    id="username"
                    autocomplete="current-password"
                    placeholder="Active Directory Username"
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="far fa-key-skeleton"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="password"
                    className="form-control form-control-lg userpassword"
                    autocomplete="current-password"
                    id="password"
                    placeholder="Active Directory Password"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i
                        id="eye"
                        className="fas fa-fw fa-eye field-icon toggle-password"
                      ></i>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>

                <Row>
                  <Col sm="8">
                    <Button
                      type="button"
                      className="btn btn-link iForgot"
                      link="https://oneaccess.mdanderson.org/"
                    >
                      Forgot Password <i className="fas fa-link"></i>
                    </Button>
                  </Col>
                  <Col sm="4">
                    <Button
                      id="#login2App"
                      type="button"
                      className="btn btn-primary float-right btn-lg login2App"
                    >
                      {" "}
                      Login <i className="fas fa-sign-in-alt fa-fw "></i>
                    </Button>
                  </Col>
                </Row>
              </form>
            </Modal.Body>
            <div id="loginMessage"></div>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>
    );
  }
}
