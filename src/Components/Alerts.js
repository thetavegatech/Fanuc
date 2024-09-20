
import { useParams, Link } from 'react-router-dom';
import React from 'react';
import { Container, Row, Col, Table, Navbar, Nav, Footer, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Files from './Files';

const MachineDetails = () => {
  const { id } = useParams();  // Extract the machine ID from the URL

  return (
    <div
      style={{
        backgroundColor: 'white',
        maxWidth: '100%',
        borderRadius: '8px',
        padding: '0px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        marginTop: '55px',
        height: 'auto',
      }}
    >
      {/* Top Filters */}
      <Row
        style={{
          backgroundColor: '#f2f2f2',
          padding: '8px',
          borderRadius: '2px',
          marginLeft: '1px',
        }}
        className="align-items-center"
      >
        <Col xs={12} md={5} className="d-flex justify-content-between mb-3 mb-md-0" style={{ gap: '10px' }}>
          <Button variant="primary" style={{ flex: '1' }}>
            This Shift
          </Button>
          <Button variant="secondary" style={{ flex: '1' }}>
            Last Shift
          </Button>
          <Button variant="success" style={{ flex: '1' }}>
            Last Hr
          </Button>
          <Button variant="info" style={{ flex: '1' }}>
            Today
          </Button>
        </Col>

        <Col xs={12} md={4} className="d-flex justify-content-md-center mb-3 mb-md-0">
          <InputGroup>
            <InputGroup.Text>From:</InputGroup.Text>
            <Form.Control type="date" />
            <InputGroup.Text>To:</InputGroup.Text>
            <Form.Control type="date" />
          </InputGroup>
        </Col>

        <Col xs={12} md={3} className="d-flex justify-content-md-end">
          <Form.Control type="search" placeholder="Search" style={{ width: '100%', maxWidth: '200px' }} />
        </Col>
      </Row>

      {/* Navigation */}
      {/* <Navbar style={{ backgroundColor: '#ff7f0e' }} className="text-white">
        <Nav className="w-100 d-flex justify-content-between">
          <Nav.Item>
            <Nav.Link as={Link} to="/" className="text-white">Summary</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={`/machine/${id}`} className="text-white">Monitoring</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/maintenance" className="text-white">Maintenance</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/report" className="text-white border-2">Report</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/alerts" className="text-white">Alerts</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar> */}
       {/* <nav
  style={{
    backgroundColor: 'gray',
    height: '5%',  // Adjust height automatically to content
    padding: '10px 0',  // Padding for better look
    width: '100%',  // Full width for the navigation
  }}
  className="text-white me-2"
>
  <Container fluid>
    <Row className="w-140 gx-1 text-center">   Increased gap between columns using gx-4
      <Col xs={12} md={2} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
        <a href="/summary" className="text-white text-center px-3 py-2" style={{ fontSize: '1.2rem' }}>
          Summary
        </a>
      </Col>
      <Col xs={12} md={3} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
        <a href="/monitoring" className="text-white text-center px-3 py-2" style={{ fontSize: '1.2rem' }}>
          Monitoring
        </a>
      </Col>
      <Col xs={12} md={2} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
        <a href="/maintenance" className="text-white text-center px-3 py-2" style={{ fontSize: '1.2rem' }}>
          Maintenance
        </a>
      </Col>
      <Col xs={12} md={2} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
        <a href="/report" className="text-white text-center px-3 py-2" style={{ fontSize: '1.2rem' }}>
          Report
        </a>
      </Col>
      <Col xs={12} md={2} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
        <a href="/alerts" className="text-white text-center px-3 py-2" style={{ fontSize: '1.2rem' }}>
          Alerts
        </a>
      </Col>
    </Row>
  </Container>
</nav> */}
<Files />

      {/* Machine Info Section */}
      <Container fluid className="my-0 rounded bg-primary">
      <Row className="text-center py-2" style={{ backgroundColor: '#ff7f0e' }}>
        <Col>
          <h5 className="text-white">CNC-1 Crank Shaft</h5>
        </Col>
        <Col>
          <h5 className="text-white">Work 3:12</h5>
        </Col>
        <Col>
          <h5 className="text-white">Idle for 3 Minutes</h5>
        </Col>
      </Row>
    </Container>


      {/* Table Section */}
      <Container fluid className="mb-4">
        <Table striped bordered hover responsive="sm">
          <thead className='bg-primary rounded'>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Events</th>
              <th>Machines</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>M010 S11 01 - Cutting Black Starter Interlock (M010 S11 01)</td>
              <td>613</td>
              <td>1</td>
              <td>31m 36s</td>
              <td>43m ago</td>
            </tr>
            <tr>
              <td>2</td>
              <td>M010 S11 01 - Cutting Black Starter Interlock (M010 S11 01)</td>
              <td>613</td>
              <td>1</td>
              <td>31m 36s</td>
              <td>43m ago</td>
            </tr>
            {/* Additional rows as needed */}
          </tbody>
        </Table>
      </Container>

      {/* Footer */}
      {/* <Footer className="bg-warning text-white text-center p-3" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        &copy; 2024 Thetavega Tech Pvt. Ltd.
      </Footer> */}
    </div>
  );
};

export default MachineDetails;
