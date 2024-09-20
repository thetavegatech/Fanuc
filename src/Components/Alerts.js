
import { useParams, Link } from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import { Container, Row, Col, Table, Navbar, Nav, Footer, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Files from './Files';
import axios from 'axios'; // Import axios for API calls

const MachineDetails = () => {
  const { id } = useParams();  // Extract the machine ID from the URL
  const [alerts, setAlerts] = useState([]); // State to hold alerts data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

   // Fetch alerts data when component mounts or when machineId changes
   useEffect(() => {
    const fetchAlertsData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`http://localhost:5001/api/alerts`);
        setAlerts(response.data); // Set the alerts data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching alerts data:', err);
        setError('Failed to fetch alerts data');
        setLoading(false);
      }
    };

    fetchAlertsData();
  }, [id]); // Re-fetch data when the machine ID changes


  return (
    <div
    fluid
      style={{
        backgroundColor: "white",
        maxWidth: "100%",
        borderRadius: "8px",
        padding: "2px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "50px",
        height: "Auto"
      }}
      >

      {/* Top Filters */}
      <Row className="align-items-center bg-transparent p-2 rounded mt-2">
  <Col xs={12} md={5} className="mb-3 mb-md-0">
    <Row className="g-2 ms-1">
      <Col xs={6} md={3}>
        <Button variant="primary"
          className="w-100 border-primary text-primary bg-transparent d-flex align-items-center justify-content-center"
          style={{ borderWidth: '2px', height: "2rem" }} // Maintain height for buttons
        >
          This Shift
        </Button>
      </Col>
      <Col xs={6} md={3}>
        <Button variant="secondary"
          className="w-100 border-secondary text-secondary bg-transparent d-flex align-items-center justify-content-center"
          style={{ borderWidth: '2px', height: "2rem", flex: '1'  }}
        >
          Last Shift
        </Button>
      </Col>
      <Col xs={6} md={3}>
        <Button variant="success"
          className="w-100 border-success text-success bg-transparent d-flex align-items-center justify-content-center"
          style={{ borderWidth: '2px', height: "2rem" }}
        >
          Last Hr
        </Button>
      </Col>
      <Col xs={6} md={3}>
        <Button variant="info"
          className="w-100 border-info text-info bg-transparent d-flex align-items-center justify-content-center"
          style={{ borderWidth: '2px', height: "2rem" }}
        >
          Today
        </Button>
      </Col>
    </Row>
  </Col>

  <Col xs={12} md={3} className="mb-3 mb-md-0">
    <InputGroup className="align-items-center">
      <InputGroup.Text style={{ height: '2rem', lineHeight: '2rem' }}>From:</InputGroup.Text>
      <Form.Control type="date" className="form-control form-control-sm" style={{ height: '2rem' }} />
      <InputGroup.Text style={{ height: '2rem', lineHeight: '2rem' }}>To:</InputGroup.Text>
      <Form.Control type="date" className="form-control form-control-sm" style={{ height: '2rem' }} />
    </InputGroup>
  </Col>

  <Col xs={12} md={4} className="d-flex justify-content-md-center mb-3 mb-md-0">
    <Form.Control type="search" placeholder="Search" className="w-100 form-control-sm" style={{ maxWidth: "200px", height: '2rem' }} />
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
              <th>Triggered At</th>
              <th>Resolved At</th>
              <th>Shift</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <tr key={alert._id}>
                  <td>{index + 1}</td>
                  <td>{alert.alertType}</td>
                  <td>{new Date(alert.triggeredAt).toLocaleString()}</td>
                  <td>{alert.resolvedAt ? new Date(alert.resolvedAt).toLocaleString() : 'Not Resolved'}</td>
                  <td>{alert.shiftId}</td>
                  <td>{alert.resolvedAt ? 'Resolved' : 'Active'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No alerts found for this machine.
                </td>
              </tr>
            )}
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
