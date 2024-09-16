import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importing Bootstrap Icons
// import logo1 from '../Image/Thetavega.png';
import logo2 from '../Images/logo.png'; // Replace this with your custom collapse image path

const NavigationBar = ({ collapsed, toggleSidebar }) => {
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm position-fixed w-100" // Full width with fixed position at the top
      style={{
        height: '60px', // Fixed height for the navbar
        borderBottom: '4px solid #ff7f0e', // Orange line below navbar
        zIndex: 1001, // Ensure it stays on top of the content
        top: 0, // Fix the navbar to the top of the screen
        left: 0, // Ensure the navbar starts from the left edge
        right: 0, // Ensure the navbar extends to the right edge
      }}
    >
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* Custom Collapse Icon */}
        <img
          src={logo2} // Custom collapse image
          alt="Collapse Icon"
          onClick={toggleSidebar} // Handle sidebar collapse/expand onClick
          style={{
            width: '55px', // Adjust size of the icon
            marginRight:'10px',
            height: '35px',
            cursor: 'pointer',
          }}
        />

        {/* Logo and Brand Name */}
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          {/* <img src={logo1} alt="Logo" style={{ width: '45px', height: '50px', marginRight: '0px' }} /> Logo */}
          {/* {!collapsed && <span>Bajaj Auto Ltd. Waluj MCD Machine Assembly</span>} */}
          {/* <img src={logo1} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} /> Logo */}
          <span>Bajaj Auto Ltd. Waluj MCD Machine Assembly</span>
        </Navbar.Brand>

        {/* Alerts Section */}
        <Nav className="ms-auto">
          <Nav.Link href="#alerts" className="text-dark d-flex align-items-center">
            <i className="bi bi-bell-fill me-1"></i> {!collapsed && <span>Alerts</span>}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;