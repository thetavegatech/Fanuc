import { useParams } from "react-router-dom";
import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Navbar,
  Nav,
  Footer,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MachineDetails = () => {
  const { id } = useParams(); // Extract the machine ID from the URL

  return (
    <div
      fluid
      style={{
        marginTop: "4rem",
        backgroundColor: "white",
        maxWidth: "100%",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        // marginBottom: "10px",
        height: "Auto",
      }}
    >
      {/* Top Filters */}
      <Row
        style={{
          backgroundColor: "#f2f2f2",
          padding: "10px",
          borderRadius: "2px",
          marginBottom: "5px",
        }}
        className="align-items-center"
      >
        <Col
          xs={12}
          md={5}
          className="d-flex justify-content-between mb-3 mb-md-0"
          style={{ gap: "10px" }}
        >
          <Button
            variant="outline-primary"
            className="custom-btn"
            style={{ flex: "1" }}
          >
            This Shift
          </Button>
          <Button
            variant="outline-secondary"
            className="custom-btn"
            style={{ flex: "1" }}
          >
            Last Shift
          </Button>
          <Button
            variant="outline-success"
            className="custom-btn"
            style={{ flex: "1" }}
          >
            Last Hr
          </Button>
          <Button
            variant="outline-info"
            className="custom-btn"
            style={{ flex: "1" }}
          >
            Today
          </Button>
        </Col>

        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-md-center mb-3 mb-md-0"
        >
          <InputGroup>
            <InputGroup.Text>From:</InputGroup.Text>
            <Form.Control type="date" />
            <InputGroup.Text>To:</InputGroup.Text>
            <Form.Control type="date" />
          </InputGroup>
        </Col>

        <Col xs={12} md={3} className="d-flex justify-content-md-end">
          <Form.Control
            type="search"
            placeholder="Search"
            style={{ width: "100%", maxWidth: "200px" }}
          />
        </Col>
      </Row>

      <nav style={{ marginBottom: "5px" }}>
        <ul className="d-flex justify-content-between">
          <li>
            <a href="/summary">Summary</a>
          </li>
          <li>
            <a href="/monitoring">Monitoring</a>
          </li>
          <li>
            <a href="/maintenance">Maintenance</a>
          </li>
          <li>
            <a href="/report">Report</a>
          </li>
          <li>
            <a href="/alert">Alerts</a>
          </li>
        </ul>
      </nav>
      {/* Machine Info Section */}
      <nav className="nav1">
        <ul className="d-flex justify-content-between align-items-center minimized-nav">
          <li>
            <h5 className="small-text">CNC-1 Crank Shaft</h5>
            {/* <p className="small-text">Crank Shaft</p> */}
          </li>
          <li>
            <p className="small-text">Work 3:12</p>
            {/* <h4 className="small-text">3:12</h4> */}
          </li>
          <li className="small-text">Idle for 3 Minutes</li>
        </ul>
      </nav>

      {/* Navigation */}
      {/* <Navbar style={{ backgroundColor: '#ff7f0e' }} className="text-white">
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
            <Nav.Link href="/report" className="text-white">Report</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="Alerts.js" className="text-white">Alerts</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar> */}

      {/* Machine Info Section */}

      {/* Table Section */}
      <Container fluid className="mb-4" style={{ paddingTop: "2rem" }}>
        <Table striped bordered hover responsive="sm">
          <thead className="" style={{backgroundColor: "#f8c9a1"}}>
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
              <td>
                M010 S11 01 - Cutting Black Starter Interlock (M010 S11 01)
              </td>
              <td>613</td>
              <td>1</td>
              <td>31m 36s</td>
              <td>43m ago</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                M010 S11 01 - Cutting Black Starter Interlock (M010 S11 01)
              </td>
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
