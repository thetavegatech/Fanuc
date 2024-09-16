import React, { useEffect, useRef }  from 'react'
// import './Summery.css'
import Chart from 'chart.js/auto';
import { useNavigate } from "react-router-dom";
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

function ComponentName() {
    const barChartLeftRef = useRef(null);
    const barChartRightRef = useRef(null);
    const pieChartRef = useRef(null);
    let barChartLeftInstance = useRef(null);
    let barChartRightInstance = useRef(null);
    let pieChartInstance = useRef(null);
  
    useEffect(() => {
    // Destroy existing chart instance before creating new one
    if (barChartLeftInstance.current) barChartLeftInstance.current.destroy();
    if (barChartRightInstance.current) barChartRightInstance.current.destroy();
    if (pieChartInstance.current) pieChartInstance.current.destroy();

    // Bar Chart Left
    const ctxLeft = barChartLeftRef.current.getContext('2d');
    barChartLeftInstance.current = new Chart(ctxLeft, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Availability',
          data: [94, 92, 93, 95, 94],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Pie Chart
    const ctxPie = pieChartRef.current.getContext('2d');
    pieChartInstance.current = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Complete', 'Behind'],
        datasets: [{
          data: [11, 5],
          backgroundColor: ['#36A2EB', '#FF6384'],
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Bar Chart Right
    const ctxRight = barChartRightRef.current.getContext('2d');
    barChartRightInstance.current = new Chart(ctxRight, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Quality',
          data: [98, 97, 99, 96, 98],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Cleanup function to destroy charts on component unmount
    return () => {
      if (barChartLeftInstance.current) barChartLeftInstance.current.destroy();
      if (barChartRightInstance.current) barChartRightInstance.current.destroy();
      if (pieChartInstance.current) pieChartInstance.current.destroy();
    };
  }, []);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/report"); // Navigate to the summary page
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
    
    {/* Dashboard Stats and Charts */}
    <div className="row ">
      {/* Left Bar Chart */}
      <div className="col-md-4">
        <div className="bar-chart">
          <h2>94% Availability</h2>
          <canvas id="barChartLeft" ref={barChartLeftRef} />
        </div>
      </div>
      {/* Center Pie Chart with Button Overlay */}
      <div className="col-md-4">
        <div className="pie-chart position-relative" style={{ marginLeft: "2rem"}}>
          <button className="button1 overlay-button">
            <h1>11</h1>
            <h4>Parts Behind</h4>
          </button>
          <canvas id="pieChart" ref={pieChartRef} />
        </div>
      </div>
      {/* Right Bar Chart */}
      <div className="col-md-4">
        <div className="bar-chart">
          <h2>98% Quality</h2>
          <canvas id="barChartRight" ref={barChartRightRef}/>
        </div>
      </div>
    </div>
    {/* Label Section with Stats */}
    <div className="label-section mt-4 p-3">
      <div className="row">
        {/* Downtime */}
        <div className="col-md-4 stat-item">
        <div className="vertical-line"></div>
          <div className="text">
          <div className="vertical-line"></div>
            <h2>13:17</h2>
            <h3>Downtime</h3>
          </div>
          <div className="details">
            <p>Part Change: 01:20</p>
            <p>Machine Failure: 02:10</p>
            <p>Planned Maintenance: 03:20</p>
            <div className="vertical-line"></div>
          </div>
        </div>
        {/* Expected Cycles */}
        <div className="col-md-4 stat-item">
          <div className="text">
          <div className="vertical-line"></div>
            <h1>13:17</h1>
            <h3>Expected Cycles</h3>
          </div>
          <div className="details">
          <div className="vertical-line"></div>
            <p>High: 03:47</p>
            <p>Low: 03:17</p>
            <p>Average: 03:30</p>
          </div>
        </div>
        {/* Rejected Parts */}
        <div className="col-md-4 stat-item">
          <div className="text">
            <h1>4</h1>
            <h3>Rejected Parts</h3>
          </div>
          <div className="details">
            <p>Tool Issue: 2</p>
            <p>Bad Finish: 1</p>
            <p>Worker Skill: 1</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ComponentName;
