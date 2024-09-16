import { useParams } from 'react-router-dom';
import React from 'react';
import { Container, Row, Col, Table, Navbar, Nav, Footer, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Alerts() {
    return (
        <div 
        fluid
          style={{
            backgroundColor: "white",
            maxWidth: "100%",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            marginTop: "0px",
            height: "Auto"
          }}>
         
          {/* Top Filters */}
          <Row
            style={{
              backgroundColor: "#f2f2f2",
              padding: "10px",
              borderRadius: "2px",
            }}
            className="align-items-center"
          >
            <Col xs={12} md={5} className="d-flex justify-content-between mb-3 mb-md-0" style={{ gap: "10px" }}>
              <Button variant="primary" style={{ flex: "1" }}>This Shift</Button>
              <Button variant="secondary" style={{ flex: "1" }}>Last Shift</Button>
              <Button variant="success" style={{ flex: "1" }}>Last Hr</Button>
              <Button variant="info" style={{ flex: "1" }}>Today</Button>
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
              <Form.Control type="search" placeholder="Search" style={{ width: "100%", maxWidth: "200px" }} />
            </Col>
          </Row>
    
          {/* Navigation */}
          <Navbar style={{ backgroundColor: '#ff7f0e' }} className="text-white">
            <Nav className="w-100 d-flex justify-content-between">
              <Nav.Item>
                <Nav.Link href="MachineDetails.js" className="text-white">Summary</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="Diagnostics.js" className="text-white">Monitoring</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="maintenance.js" className="text-white">Maintenance</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="report.js" className="text-white">Report</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="Alerts.js" className="text-white">Alerts</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
    
          {/* Machine Info Section */}
          <Container fluid className="my-4">
            <Row className="d-flex justify-content-between align-items-center bg-light p-3 shadow-sm rounded">
              <Col md={4}>
                <h5>CNC-1</h5>
                <p>Crank Shaft</p>
              </Col>
              <Col md={4} className="text-center">
                <p style={{ marginBottom: '0' }}>Work</p>
                <h4 style={{ marginBottom: '0' }}>3:12</h4>
              </Col>
              <Col md={4} className="text-end">
                <p style={{ marginBottom: '0' }}>Idle for 3 Minutes</p>
              </Col>
            </Row>
          </Container>
    
          {/* Table Section */}
          <Container fluid className="mb-4">
            <Table striped bordered hover responsive="sm">
              <thead>
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
      )
}

export default Alerts