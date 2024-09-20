import React from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importing Bootstrap Icons
import logo2 from '../Images/logo.png'; // Replace this with your custom collapse image path

const NavigationBar = ({ collapsed, toggleSidebar }) => {
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm position-fixed w-100"
      style={{ height: '60px', borderBottom: '4px solid #ff7f0e', zIndex: 1001, top: 0, left: 0, right: 0 }}
    >
      <Container fluid>
        <Row className="w-100 align-items-center justify-content-between">
          {/* Collapse Icon Column */}
          <Col xs={2} className="d-flex justify-content-start">
            <img
              src={logo2}
              alt="Collapse Icon"
              onClick={toggleSidebar}
              style={{ width: '55px', height: '35px', cursor: 'pointer' }}
            />
          </Col>

          {/* Logo and Brand Name Column */}
          <Col xs={8} className="d-flex justify-content-start">
            <Navbar.Brand href="#home" className="d-flex align-items-center">
              <span className='d-none d-md-block'>Bajaj Auto Ltd. Waluj MCD Machine Assembly</span>
            </Navbar.Brand>
          </Col>

          {/* Alerts Column */}
          <Col xs={2} className="d-flex justify-content-end">
            <Nav>
              <Nav.Link href="#alerts" className="text-dark d-flex align-items-center">
                <i className="bi bi-bell-fill me-1"></i>
                {!collapsed && <span>Alerts</span>}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;