import React from "react";
import  "./style.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Sidenav() {
  return (
    <Col xs="3">
        <ul className="list-group">
            <li className="list-group-item list-group-item-action">
            <i class="fas fa-home"></i> Home
            </li>
            <li data-id="FC112017" className="list-group-item list-group-item-action">
                <i class="fas fa-users"></i> FC 11.2017 Conf. Rm.
            </li>
            <li data-id="FC112037" className="list-group-item list-group-item-action">
                <i class="fas fa-users"></i> FC 11.2037 Conf. Rm.
            </li>
            <li className="list-group-item list-group-item-action">
                <i className="far fa-bell fa-fw"></i> Notifications
            </li>
        </ul>
    </Col>

    



  );
}

export default Sidenav;
