import React from 'react';
import { Container, Row, Col, Table,Button, InputGroup, Form  } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // Assuming you're using Chart.js
import 'chart.js/auto'; // Chart.js autoloading
import Files from './Files';
import { useParams } from 'react-router-dom';

const MachineDetails = () => {
  // const { machineId } = useParams(); // Get the machine ID from the URL
  const { machineId: routeMachineId } = useParams();
  const machineId = routeMachineId || 'MACHINE2';
  // Sample data for the bar chart
  const chartData = {
    labels: ['1/27', '1/37', '1/47', '1/57'],
    datasets: [
      {
        label: 'Assigned',
        backgroundColor: '#36A2EB',
        data: [60, 50, 30, 40],
      },
      {
        label: 'Unassigned',
        backgroundColor: '#FF6384',
        data: [120, 140, 120, 130],
      },
    ],
  };

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
        <Files />

      {/* Top Machine Info Section */}
      <Container fluid className="my-0 rounded me-4 ">
         {/* First Row - Headings */}
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

      {/* Second Section with Chart and Tables */}
      <Container fluid>
        <Row className="mt-4 ms-2">
          {/* First Column with Chart */}
          <Col xs={12} md={6}>
            <h4 className="text-center">Estimated Work</h4>
            <Bar data={chartData} options={{ maintainAspectRatio: true }} />
          </Col>

          {/* Second Column with Two Tables */}
          <Col xs={12} md={6}>
            {/* First Table Row */}
           {/* First Table Row */}
<Row className="mb-4">
  <Col>
    <h4 className="text-center">Upcoming Maintenance Schedule</h4>
    {/* Add a div with overflow-auto to enable the scrollbar */}
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>1/27</th>
            <th>1/37</th>
            <th>1/47</th>
            <th>1/57</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Assigned</td>
            <td>50</td>
            <td>40</td>
            <td>40</td>
            <td>40</td>
          </tr>
          <tr>
            <td>Unassigned</td>
            <td>70</td>
            <td>100</td>
            <td>90</td>
            <td>90</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </Col>
</Row>

{/* Second Table Row */}
<Row>
  <Col>
    <h4 className="text-center">Last 10 Maintenance Schedule</h4>
    {/* Add a div with overflow-auto to enable the scrollbar */}
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Machine Name</th>
            <th>Element ID</th>
            <th>Element Name</th>
            <th>Element Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MPT-38</td>
            <td>CNC-1</td>
            <td>120</td>
            <td>Element-A</td>
            <td>Crank Shaft Assembly</td>
          </tr>
          <tr>
            <td>MPT-36</td>
            <td>CNC-2</td>
            <td>121</td>
            <td>Element-B</td>
            <td>Engine Housing</td>
          </tr>
          <tr>
            <td>MPT-36</td>
            <td>CNC-2</td>
            <td>121</td>
            <td>Element-B</td>
            <td>Engine Housing</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </Col>
</Row>

          </Col>
        </Row>

        {/* Third Section - Full Width Table */}
        <Row className="mt-4">
          <Col>
            <h4 className="text-center">Last 10 Breakdown Report</h4>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Asset ID</th>
                  <th>Machine Name</th>
                  <th>PM No</th>
                  <th>Work Type</th>
                  <th>Priority</th>
                  <th>Next Date</th>
                  <th>Estimate HR</th>
                  <th>Assigned To</th>
                  <th>Notice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MPT-38</td>
                  <td>CNC-1</td>
                  <td>1000 Hour</td>
                  <td>PRIMITIVE</td>
                  <td>High</td>
                  <td>10/09/2024</td>
                  <td>5</td>
                  <td>John</td>
                  <td>⚠️</td>
                </tr>
                <tr>
                  <td>MPT-36</td>
                  <td>CNC-2</td>
                  <td>50 Hour</td>
                  <td>PRIMITIVE</td>
                  <td>Medium</td>
                  <td>11/09/2024</td>
                  <td>2</td>
                  <td>Mike</td>
                  <td>⚠️</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MachineDetails;