import React from "react";
import { Bar } from 'react-chartjs-2';
import './Report.css';
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
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Maintenance() {
  // Sample data for bar chart
  const barChartData = {
    labels: ['1/27', '1/37', '1/47', '1/57'],
    datasets: [
      {
        label: 'Assigned',
        data: [50, 40, 40, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
      },
      {
        label: 'Unassigned',
        data: [104, 137, 143, 150],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estimated Work',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="content container-fluid mt-5">
      {/* Filter Div */}
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
      {/* Graph and Upcoming Workload Section */}
      <div className="container">
  <div className="row">
    {/* Bar Chart */}
    <div className="col-12 col-md-6">
      <div className="graph">
        <h5>Estimate Work</h5>
        <Bar className="barChart" data={barChartData} options={barChartOptions} />
      </div>
    </div>

    {/* Tables: Upcoming Workload & Element Details */}
    <div className="col-12 col-md-6">
      {/* Upcoming Workload */}
      <div className="workload-section mb-4">
        <h5>Upcoming Workload</h5>
        <div className="table-wrapper">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th />
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
                <td>104</td>
                <td>137</td>
                <td>143</td>
                <td>150</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>154</td>
                <td>174</td>
                <td>193</td>
                <td>190</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Element Details */}
      <div className="element-details-section">
        <h5>Element Details</h5>
        <div className="table-wrapper">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Machine Id</th>
                <th>Machine Name</th>
                <th>Element Id</th>
                <th>Element Name</th>
                <th>Element Description</th>
                <th>Type</th>
                <th>Frequency</th>
                <th>Condition Tag</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Machine001</td>
                <td>Elem001</td>
                <td>Element A</td>
                <td>Description A</td>
                <td>Type A</td>
                <td>Weekly</td>
                <td>Good</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Machine002</td>
                <td>Elem002</td>
                <td>Element B</td>
                <td>Description B</td>
                <td>Type B</td>
                <td>Monthly</td>
                <td>Average</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Asset Table */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th></th>
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
            <td><input type="checkbox" style={{ transform: 'scale(1.5)' }} /></td>
            <td>MPT-38</td>
            <td>CNC-1</td>
            <td>1000 Hour</td>
            <td>PRIMITIVE</td>
            <td></td>
            <td>10/09/2024</td>
            <td></td>
            <td></td>
            <td className="notice-icon">⚠️</td>
          </tr>
          <tr>
            <td><input type="checkbox" style={{ transform: 'scale(1.5)' }} /></td>
            <td>MPT-36</td>
            <td>CNC-2</td>
            <td>50 Hour</td>
            <td>PRIMITIVE</td>
            <td></td>
            <td>11/09/2024</td>
            <td></td>
            <td></td>
            <td className="notice-icon">⚠️</td>
          </tr>
          <tr>
            <td><input type="checkbox" style={{ transform: 'scale(1.5)' }} /></td>
            <td>MPT-32</td>
            <td>CNC-3</td>
            <td>30 Hour</td>
            <td>PRIMITIVE</td>
            <td></td>
            <td>09/09/2024</td>
            <td></td>
            <td></td>
            <td className="notice-icon">⚠️</td>
          </tr>
          <tr>
            <td><input type="checkbox" style={{ transform: 'scale(1.5)' }} /></td>
            <td>MPT-37</td>
            <td>CNC-4</td>
            <td>Monthly</td>
            <td>PRIMITIVE</td>
            <td></td>
            <td>09/09/2024</td>
            <td></td>
            <td></td>
            <td className="notice-icon">⚠️</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Maintenance;
