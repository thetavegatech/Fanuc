import React from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import ToolsLifeChart from "../Chart/ToolsLifeChart";
import BatteryStats from "../Chart/BatteryStats";
import ServoTempCharta from '../Chart/ServoTemp';
import EncoderChart from '../Chart/EncoderChart'
import SpindleCharta from "../Chart/SpindleChart";
import ServoLoadCharta from "../Chart/ServoLoadChart";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Files from "./Files";

// Register necessary chart components for line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dummy line chart data
const lineChartData = {
  labels: [
    "Tool 1",
    "Tool 2",
    "Tool 3",
    "Tool 4",
    "Tool 5",
    "Tool 6",
    "Tool 7",
    "Tool 8",
    "Tool 9",
    "Tool 10",
    "Tool 11",
    "Tool 12",
    "Tool 13",
    "Tool 14",
  ],
  datasets: [
    {
      label: "Set Life",
      data: [80, 90, 75, 85, 60, 70, 90, 65, 85, 50, 55, 45, 40, 95],
      borderColor: "rgba(54, 162, 235, 0.8)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
      tension: 0.4, // This adds smooth curves to the line
    },
    {
      label: "Actual Life",
      data: [70, 85, 65, 80, 55, 60, 85, 55, 80, 45, 50, 40, 35, 90],
      borderColor: "rgba(255, 99, 132, 0.8)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
      tension: 0.4, // Smooth curves for this line as well
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

{
  /* ToolLifeChart Component */
}
const ToolLifeChart = ({machineId}) => (
  <div className="card d-flex flex-column h-100 w-100">
    <div className="card-header">
      <h3>
        <b>Tool Life - Set Life vs Actual Life (5 Tools)</b>
      </h3>
    </div>
    <div className="card-body flex-fill">
      {/* Line Chart Display */}
      <div className="w-100" style={{ height: "400px" }}>
        {/* <Line data={lineChartData} options={lineChartOptions} /> */}
        <ToolsLifeChart  machineId={machineId}  />
      </div>
    </div>
  </div>
);


function ComponentName() {


  const machineId = 'MACHINE3';

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
      {/* Dashboard Stats and Charts */}
      <div className="row mb-2 d-flex">
        {/* First Div - ToolLifeChart */}
        <div className="col-12 col-lg-8 mb-4 d-flex">
          <ToolLifeChart machineId={machineId} />
        </div>

        {/* Second Div - BatteryStatus */}
        <div className="col-12 col-lg-4 mb-4 d-flex">
          <BatteryStats machineId={machineId} />
        </div>
      </div>

      {/* 2nd row  */}
      <div className="row mb-2">
        <div className="col-lg-6 col-md-12">
          <SpindleCharta machineId={machineId} />
        </div>
        <div className="col-lg-6 col-md-12">
        <ServoTempCharta machineId={machineId} />
        </div>
      </div>
      {/* 3rd row  */}
      <div className="row" style={{marginBottom : "3rem"}}>
        {/* Fifth Div */}
        <div className="col-lg-6">
          <ServoLoadCharta machineId={machineId} />
        </div>
        <div className="col-lg-6">
          <EncoderChart  machineId={machineId} />
        </div>
      </div>
    </div>
  );
}

export default ComponentName;
