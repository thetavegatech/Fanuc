import React from 'react'
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';

function Files() {
  return (
    <div>
       {/* Navigation */}
       <nav
  style={{
    backgroundColor: 'gray',
    height: '5%',  // Adjust height automatically to content
    // padding: '10px 0',  // Padding for better look
    width: '100%',  // Full width for the navigation
  }}
  className="text-white"
>
  <Container fluid>
    <Row className="w-140 gx-1 text-center">  {/* Increased gap between columns using gx-4 */}
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
        <a href="/alert" className="text-white text-center px-3 py-2" style={{ fontSize: '1.2rem' }}>
          Alerts
        </a>
      </Col>
      {/* <Col xs={12} md={1} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
        <a href="/toolstatistics" className="text-white text-center px-3 py-2" style={{ fontSize: '1.2rem' }}>
          Toolstatics
        </a>
      </Col> */}
    </Row>
  </Container>
</nav>
    </div>
  )
}

export default Files
