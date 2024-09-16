import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import './Report.css'
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

function Report() {
  const barChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // State for the filter (day, month, year)
  const [filter, setFilter] = useState("day");

  // Example data for different filters
  const dataByDay = {
    labels: ["1st Shift", "2nd Shift"],
    datasets: [
      {
        label: "Good Parts",
        data: [2720, 3166],
        backgroundColor: "blue",
        borderWidth: 1,
      },
      {
        label: "Expected Parts",
        data: [3264, 3834],
        backgroundColor: "lightblue",
        borderWidth: 1,
      },
      {
        label: "Parts Rejected",
        data: [0, 0],
        backgroundColor: "red",
        borderWidth: 1,
      },
      {
        label: "Day",
        data: [0, 0],
        backgroundColor: "green",
        borderWidth: 1,
      }
    ],
  };

  const dataByMonth = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Good Parts",
        data: [12000, 13450, 12340, 14560],
        backgroundColor: "blue",
        borderWidth: 1,
      },
      {
        label: "Expected Parts",
        data: [14000, 15000, 13500, 16000],
        backgroundColor: "lightblue",
        borderWidth: 1,
      },
      {
        label: "Parts Rejected",
        data: [200, 150, 100, 50],
        backgroundColor: "red",
        borderWidth: 1,
      },
      {
        label: "Month",
        data: [0, 0, 0, 0],
        backgroundColor: "yellow",
        borderWidth: 1,
      },
    ],
  };

  const dataByQuarter = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Good Parts",
        data: [32000, 34500, 40000, 45000],
        backgroundColor: "blue",
        borderWidth: 1,
      },
      {
        label: "Expected Parts",
        data: [36000, 38000, 42000, 47000],
        backgroundColor: "lightblue",
        borderWidth: 1,
      },
      {
        label: "Parts Rejected",
        data: [500, 400, 300, 200],
        backgroundColor: "red",
        borderWidth: 1,
      },
      {
        label: "Quarter",
        data: [0, 0, 0, 0],
        backgroundColor: "purple",
        borderWidth: 1,
      },
    ],
  };

  const dataByYear = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Good Parts",
        data: [30000, 32000, 31000, 35000, 36000, 37000, 40000, 41000, 39000, 42000, 44000, 45000],
        backgroundColor: "blue",
        borderWidth: 1,
      },
      {
        label: "Expected Parts",
        data: [34000, 35000, 33000, 38000, 40000, 42000, 43000, 45000, 46000, 48000, 50000, 52000],
        backgroundColor: "lightblue",
        borderWidth: 1,
      },
      {
        label: "Parts Rejected",
        data: [500, 400, 300, 200, 100, 50, 80, 90, 120, 150, 130, 110],
        backgroundColor: "red",
        borderWidth: 1,
      },
      {
        label: "Year",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "orange",
        borderWidth: 1,
      },
    ],
  };

  // Update chart based on the filter
  const updateChart = (data) => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous chart instance
    }
    chartInstanceRef.current = new Chart(barChartRef.current, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Parts',
              font: {
                weight: 'bold',
                size: 16,
              },
            },
          },
        },
      },
    });
  };

  // Update the chart whenever the filter changes
  useEffect(() => {
    if (filter === "day") {
      updateChart(dataByDay);
    } else if (filter === "month") {
      updateChart(dataByMonth);
    } else if (filter === "quarter") {
      updateChart(dataByQuarter);
    } else if (filter === "year") {
      updateChart(dataByYear);
    }
  }, [filter]); // Depend on filter changes


  return (
    <div className="content container-fluid mt-5 ">
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
          </li>
          <li>
            <p className="small-text">Work 3:12</p>
          </li>
          <li className="small-text">Idle for 3 Minutes</li>
        </ul>
      </nav>

      {/* Bar Graph Section */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Bar Chart Container */}
          <div
            style={{
              flex: 1,
              width: "300px",
              height: "350px",
              marginLeft: "7rem",
            }}
          >
             <Col xs={12} md={5} className="d-flex " style={{ marginLeft: "10rem",gap: "5px", justifyContent: "center" }}>
          <Button variant="outline-primary" className="custom-btn" onClick={() => setFilter("day")}>Day</Button>
          <Button variant="outline-secondary" className="custom-btn" onClick={() => setFilter("month")}>Month</Button>
          <Button variant="outline-info" className="custom-btn" onClick={() => setFilter("quarter")}>Quarter</Button>
          <Button variant="outline-success" className="custom-btn" onClick={() => setFilter("year")}>Year</Button>
        </Col>
            <canvas id="barChart" ref={barChartRef} />
          </div>
        </div>
      </div>
      {/* Table Section */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <table
          style={{
            marginTop: "3rem",
            width: "100%",
            fontSize: "18px",
            borderCollapse: "collapse",
            maxWidth: "100%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                Shift / Machine
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "10px",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                Total Parts
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "10px",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                Good Parts
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "10px",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                Parts Rejected
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "10px",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                Planned Parts
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                CNC-1 Crank Shaft
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 3264 </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 2720 </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 0 </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 3264 </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                CNC-1 Crank Shaft
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 3834 </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 3166 </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 0 </td>
              <td style={{ textAlign: "center", padding: "10px" }}> 3834 </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
