import React from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
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
const ToolLifeChart = () => (
  <div className="card d-flex flex-column h-100 w-100">
    <div className="card-header">
      <h3>
        <b>Tool Life - Set Life vs Actual Life (14 Tools)</b>
      </h3>
    </div>
    <div className="card-body flex-fill">
      {/* Line Chart Display */}
      <div className="w-100" style={{ height: "400px" }}>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  </div>
);

{
  /* BatteryStatus Component */
}
const BatteryStatus = () => (
  <div className="card d-flex flex-column h-100 w-100">
    <div className="card-header">
      <h3>Battery Health Status</h3>
    </div>
    <div className="card-body flex-fill">
      <div className="row">
        {[1, 2, 3, 4].map((i) => (
          <div className="col-12 col-md-6 mb-4" key={i}>
            <div
              className="card p-3"
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <div className="battery-container m-2">
                  <div
                    className="battery"
                    style={{
                      width: "80px",
                      height: "110px",
                      border: "2px solid #ccc",
                      borderRadius: "5px",
                      position: "relative",
                    }}
                  >
                    <div
                      className="battery-level"
                      style={{
                        height: `${i * 10}%`,
                        background: i === 4 ? "red" : "green",
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                      }}
                    ></div>
                  </div>
                  <div className="battery-text mt-2">Battery {i}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Dummy data for the charts
const dummyLineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Spindle Chart Component
const SpindleChart = () => (
  <div className="card mb-4 d-flex flex-column h-100">
    <div className="card-header">
      <h3>Spindle Load, Temperature & Speed</h3>
    </div>
    <div className="card-body flex-fill">
      <div className="filters mb-3 d-flex">
        <input
          type="date"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <input
          type="time"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <select className="form-select me-2" style={{ width: "auto" }}>
          <option value="">Shift</option>
          <option value="1">Shift 1</option>
          <option value="2">Shift 2</option>
          <option value="3">Shift 3</option>
        </select>
        <button className="btn btn-primary btn-sm">Apply</button>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={dummyLineChartData} options={chartOptions} />
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-6 ">
            <p>
              <strong>Spindle 1 Temp:</strong> 6.27
            </p>
            <p>
              <strong>Spindle 2 Temp:</strong> 3.60
            </p>
          </div>
          <div className="col-12 col-md-6 ">
            <p>
              <strong>Spindle 1 Load:</strong> 5.10
            </p>
            <p>
              <strong>Spindle 2 Speed:</strong> 6.03
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Servo Load Chart Component
const ServoLoadChart = () => (
  <div className="card mb-4 d-flex flex-column h-100">
    <div className="card-header">
      <h3>Servo Load</h3>
    </div>
    <div className="card-body flex-fill">
      <div className="filters mb-3 d-flex">
        <input
          type="date"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <input
          type="time"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <select className="form-select me-2" style={{ width: "auto" }}>
          <option value="">Shift</option>
          <option value="1">Shift 1</option>
          <option value="2">Shift 2</option>
          <option value="3">Shift 3</option>
        </select>
        <button className="btn btn-primary btn-sm">Apply</button>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={dummyLineChartData} options={chartOptions} />
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-6 ">
          <p>
          <strong>Servo 1 Load:</strong> 44.72
        </p>
        <p>
          <strong>Servo 2 Load:</strong> 20.95
        </p>
          </div>
          <div className="col-12 col-md-6 ">
          <p>
          <strong>Servo 3 Load:</strong> 30.81
        </p>
        <p>
          <strong>Servo 4 Load:</strong> 20.39
        </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Dummy data for Servo Temperature
const servoTempData = {
  labels: [
    "10:35:24 AM",
    "10:37:26 AM",
    "10:39:26 AM",
    "10:41:22 AM",
    "10:43:26 AM",
    "10:45:22 AM",
  ],
  datasets: [
    {
      label: "Servo 1 Temp",
      data: [52.41, 53.25, 54.3, 52.0, 51.8, 52.41],
      borderColor: "rgba(255, 205, 86, 1)",
      backgroundColor: "rgba(255, 205, 86, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Servo 2 Temp",
      data: [56.81, 57.0, 58.2, 56.4, 55.9, 56.81],
      borderColor: "rgba(201, 203, 207, 1)",
      backgroundColor: "rgba(201, 203, 207, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Servo 3 Temp",
      data: [46.47, 47.1, 48.2, 46.3, 45.9, 46.47],
      borderColor: "rgba(153, 102, 255, 1)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Servo 4 Temp",
      data: [49.66, 50.0, 51.1, 49.0, 48.5, 49.66],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

// Dummy data for Encoder Temperature
const encoderTempData = {
  labels: [
    "10:35:24 AM",
    "10:37:26 AM",
    "10:39:26 AM",
    "10:41:22 AM",
    "10:43:26 AM",
    "10:45:22 AM",
  ],
  datasets: [
    {
      label: "Encoder 1 Temp",
      data: [69.27, 68.5, 70.0, 69.5, 69.0, 69.27],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Encoder 2 Temp",
      data: [63.6, 64.0, 64.5, 63.9, 63.5, 63.6],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Encoder 3 Temp",
      data: [58.12, 58.5, 59.0, 58.6, 58.2, 58.12],
      borderColor: "rgba(255, 205, 86, 1)",
      backgroundColor: "rgba(255, 205, 86, 0.2)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Encoder 4 Temp",
      data: [65.06, 65.5, 66.0, 65.3, 64.9, 65.06],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

// Servo Temperature Chart Component
const ServoTempChart = () => (
  <div className="card mb-4 d-flex flex-column h-100">
    <div className="card-header">
      <h3>Servo Temperature</h3>
    </div>
    <div className="card-body flex-fill">
      <div className="filters mb-3 d-flex">
        <input
          type="date"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <input
          type="time"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <select className="form-select me-2" style={{ width: "auto" }}>
          <option value="">Shift</option>
          <option value="1">Shift 1</option>
          <option value="2">Shift 2</option>
          <option value="3">Shift 3</option>
        </select>
        <button className="btn btn-primary btn-sm">Apply</button>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={servoTempData} options={chartOptions} />
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <p>
              <strong>Servo 1 Temp:</strong> 52.41
            </p>
            <p>
              <strong>Servo 2 Temp:</strong> 56.81
            </p>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <p>
              <strong>Servo 3 Temp:</strong> 46.47
            </p>
            <p>
              <strong>Servo 4 Temp:</strong> 49.66
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Encoder Temperature Chart Component
const EncoderTempChart = () => (
  <div className="card mb-4 d-flex flex-column h-100">
    <div className="card-header">
      <h3>Encoder Temperature</h3>
    </div>
    <div className="card-body flex-fill">
      <div className="filters mb-3 d-flex">
        <input
          type="date"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <input
          type="time"
          className="form-control me-2"
          style={{ width: "auto" }}
        />
        <select className="form-select me-2" style={{ width: "auto" }}>
          <option value="">Shift</option>
          <option value="1">Shift 1</option>
          <option value="2">Shift 2</option>
          <option value="3">Shift 3</option>
        </select>
        <button className="btn btn-primary btn-sm">Apply</button>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={encoderTempData} options={chartOptions} />
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <p>
              <strong>Encoder 1 Temp:</strong> 69.27
            </p>
            <p>
              <strong>Encoder 2 Temp:</strong> 63.60
            </p>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <p>
              <strong>Encoder 3 Temp:</strong> 58.12
            </p>
            <p>
              <strong>Encoder 4 Temp:</strong> 65.06
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function ComponentName() {
  const navigate = useNavigate();

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
      {/* Dashboard Stats and Charts */}
      <div className="row mb-2 d-flex">
        {/* First Div - ToolLifeChart */}
        <div className="col-12 col-lg-8 mb-4 d-flex">
          <ToolLifeChart />
        </div>

        {/* Second Div - BatteryStatus */}
        <div className="col-12 col-lg-4 mb-4 d-flex">
          <BatteryStatus />
        </div>
      </div>

      {/* 2nd row  */}
      <div className="row mb-2">
        <div className="col-lg-6 col-md-12">
          <SpindleChart />
        </div>
        <div className="col-lg-6 col-md-12">
          <ServoLoadChart />
        </div>
      </div>
      {/* 3rd row  */}
      <div className="row">
        {/* Fifth Div */}
        <div className="col-lg-6">
          <ServoTempChart />
        </div>
        <div className="col-lg-6">
          <EncoderTempChart />
        </div>
      </div>
    </div>
  );
}

export default ComponentName;
