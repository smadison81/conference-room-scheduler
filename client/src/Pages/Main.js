import React from "react";
import "../App.css";
import Navbar from '../Components/Navbar'
import Sidenav from '../Components/Sidenav'
import Calendar from '../Components/Calendar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';




function Main() {
  return (
    <div className="container concon">
     <Navbar />
     <Row>
     <Sidenav />
     <Calendar />
     </Row>
    </div>
  );
}

export default Main;