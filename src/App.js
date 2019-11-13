import React from "react";
import "./App.css";
import Navbar from './Components/Navbar'
import Sidenav from './Components/Sidenav'
import Calendar from './Components/Calendar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'








function App() {
  return (
    <Container>
     <Navbar />
     <Row>
     <Sidenav />
     <Calendar />
     </Row>
    </Container>
  );
}

export default App;
