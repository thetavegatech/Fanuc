// // new
// import React from 'react';
// import { Container, Row, Col, Button, Form, InputGroup,Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Dashboard = () => {
//   return (
//     <Container
//       fluid
//       style={{
//         backgroundColor: 'white',
//         width: '100%',
//         maxWidth: '1000%',
//         borderRadius: '8px',
//         padding: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

//       }}
//     >
//       {/* Top Filters */}
//       <Row
//         style={{
//           backgroundColor: '#f2f2f2',
//           padding: '10px',
//           borderRadius: '8px',
//           marginLeft: '6%'
//         }}
//         className="align-items-center"
//       >
//         {/* First Column (Buttons) */}
//         <Col
//           xs={12}
//           md={5}
//           className="d-flex justify-content-between mb-3 mb-md-0"
//           style={{ gap: '4px', marginLeft: '4%' }}
//         >
//           <Button variant="primary" style={{ flex: '1' }}>
//             This Shift
//           </Button>
//           <Button variant="secondary" style={{ flex: '1' }}>
//             Last Shift
//           </Button>
//           <Button variant="success" style={{ flex: '1' }}>
//             Last Hr
//           </Button>
//           <Button variant="info" style={{ flex: '1' }}>
//             Today
//           </Button>
//         </Col>

//         {/* Second Column (Date Inputs) */}
//         <Col xs={10} md={4}  className="d-flex justify-content-md-center mb-3 mb-md-0" style={{marginLeft:'4%'}}>
//           <InputGroup>
//             <InputGroup.Text>From:</InputGroup.Text>
//             <Form.Control type="date" />
//             <InputGroup.Text>To:</InputGroup.Text>
//             <Form.Control type="date" />
//           </InputGroup>
//         </Col>

//         {/* Third Column (Search Bar) */}
//         <Col xs={8} md={2} className="d-flex justify-content-md-end">
//           <Form.Control
//             type="search"
//             placeholder="Search"
//             style={{ width: '100%', maxWidth: '200px', marginLeft: '6%' }}
//           />
//         </Col>
//       </Row>

//       {/* KPI Cards */}
//       <Row className="text-center mt-4">
//         <Col xs={12} sm={6} md={3} className="mb-3">
//           <Card className="bg-primary text-white">
//             <Card.Body>
//               <Card.Title>100</Card.Title>
//               <Card.Text>Number Of Parts Produced</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={3} className="mb-3">
//           <Card className="bg-success text-white">
//             <Card.Body>
//               <Card.Title>57</Card.Title>
//               <Card.Text>Online Assets</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={3} className="mb-3">
//           <Card className="bg-warning text-white">
//             <Card.Body>
//               <Card.Title>13</Card.Title>
//               <Card.Text>Offline Assets</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={3} className="mb-3">
//           <Card className="bg-danger text-white">
//             <Card.Body>
//               <Card.Title>4</Card.Title>
//               <Card.Text>Under Maintenance</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;


// runing 
// import React from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Form,
//   InputGroup,
//   Card,
// } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Dashboard = () => {
//   return (
//     <Container
//       fluid
//       style={{
//         backgroundColor: "white",
//         maxWidth: "100%",
//         borderRadius: "8px",
//         padding: "10px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         marginTop: "5px",
//       }}
//     >
//       {/* Top Filters */}
//       <Row
//         style={{
//           backgroundColor: "#f2f2f2",
//           padding: "10px",
//           borderRadius: "2px",
//         }}
//         className="align-items-center"
//       >
//         {/* First Column (Buttons) */}
//         <Col
//           xs={12}
//           md={5}
//           className="d-flex justify-content-between mb-3 mb-md-0"
//           style={{ gap: "10px" }}
//         >
//           <Button variant="primary" style={{ flex: "1" }}>
//             This Shift
//           </Button>
//           <Button variant="secondary" style={{ flex: "1" }}>
//             Last Shift
//           </Button>
//           <Button variant="success" style={{ flex: "1" }}>
//             Last Hr
//           </Button>
//           <Button variant="info" style={{ flex: "1" }}>
//             Today
//           </Button>
//         </Col>

//         {/* Second Column (Date Inputs) */}
//         <Col
//           xs={12}
//           md={4}
//           className="d-flex justify-content-md-center mb-3 mb-md-0"
//         >
//           <InputGroup>
//             <InputGroup.Text>From:</InputGroup.Text>
//             <Form.Control type="date" />
//             <InputGroup.Text>To:</InputGroup.Text>
//             <Form.Control type="date" />
//           </InputGroup>
//         </Col>

//         {/* Third Column (Search Bar) */}
//         <Col xs={12} md={3} className="d-flex justify-content-md-end">
//           <Form.Control
//             type="search"
//             placeholder="Search"
//             style={{ width: "100%", maxWidth: "200px" }}
//           />
//         </Col>
//       </Row>

//       {/* KPI Cards */}
//       <Row className="text-center mt-4 ms-1">
//         <Col xs={12} sm={6} md={3} className="mb-2">
//           <Card className="bg-primary text-white">
//             <Card.Body>
//               <Card.Title>100</Card.Title>
//               <Card.Text>Number Of Parts Produced</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={3} className="mb-3">
//           <Card className="bg-success text-white">
//             <Card.Body>
//               <Card.Title>57</Card.Title>
//               <Card.Text>Online Assets</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={3} className="mb-3">
//           <Card className="bg-warning text-white">
//             <Card.Body>
//               <Card.Title>13</Card.Title>
//               <Card.Text>Offline Assets</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} md={3} className="mb-3">
//           <Card className="bg-danger text-white">
//             <Card.Body>
//               <Card.Title>4</Card.Title>
//               <Card.Text>Under Maintenance</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Availability, Performance, OEE */}
// <Row className="text-center ms-1">
//   <Col>
//     <Card className="bg-warning text-white h-100 w-100">
//       <Card.Body className="py-1"> {/* Reduce padding inside the card body */}
//         Availability: 92%
//       </Card.Body>
//     </Card>
//   </Col>
//   <Col>
//     <Card className="bg-warning text-white h-100 w-100">
//       <Card.Body className="py-1"> {/* Reduce padding */}
//         Performance: 85%
//       </Card.Body>
//     </Card>
//   </Col>
//   <Col>
//     <Card className="bg-warning text-white h-100 w-100">
//       <Card.Body className="py-1"> {/* Reduce padding */}
//         OEE: 76%
//       </Card.Body>
//     </Card>
//   </Col>
// </Row>

//     </Container>
//   );
// };

// export default Dashboard;



// new 

import React from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

import Footer from "./Footer";

// const MachineCard = ({ title, partName, status, statusColor, bgColor }) => {
//   return (
//     <Card className="h-100 w-100" style={{ borderRadius: '5px' }}>  {/* Border radius */}
//       <Card.Header className="text-white text-center fw-bold" style={{ backgroundColor: "#ff7f0e", borderRadius: '5px 5px 0 0' }}>
//         {title}
//       </Card.Header>
//       <Card.Body>
//         <Row>
//           <Col className="text-start">
//             <p className="mb-0"><strong>Part Name</strong></p>
//             <p>{partName}</p>
//           </Col>
//           <Col className="text-end">
//             <p className="mb-0"><strong>Status</strong></p>
//             <p style={{ color: statusColor }}>{status}</p>
//           </Col>
//         </Row>

//         {/* React-Bootstrap Carousel with hidden controls */}
//         <Carousel className="mt-3" interval={3000} controls={false} indicators={false}> {/* Hide controls and indicators */}
//           <Carousel.Item>
//             <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
//               <h5>Machine Utilization</h5>
//               <h2>65%</h2>
//             </div>
//           </Carousel.Item>
//           <Carousel.Item>
//             <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
//               <h5>OEE</h5>
//               <h2>76%</h2>
//             </div>
//           </Carousel.Item>
//           <Carousel.Item>
//             <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
//               <h5>Production Count</h5>
//               <h2>56 / 100</h2>
//             </div>
//           </Carousel.Item>
//         </Carousel>

//         <div className="mt-3 rounded">
//           <p className="text-center">[Chart Placeholder]</p>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

const MachineCard = ({ id, title, partName, status, statusColor, bgColor }) => {
  const navigate = useNavigate();

  // Handle click on the card to navigate to details page
  const handleCardClick = () => {
    navigate(`/machine/${id}`);
  };

  return (
    <Card className="h-100 w-100" style={{ borderRadius: '5px', cursor: 'pointer' }} onClick={handleCardClick}>
      <Card.Header className="text-white text-center fw-bold" style={{ backgroundColor: "#ff7f0e", borderRadius: '5px 5px 0 0' }}>
        {title}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col className="text-start">
            <p className="mb-0"><strong>Part Name</strong></p>
            <p>{partName}</p>
          </Col>
          <Col className="text-end">
            <p className="mb-0"><strong>Status</strong></p>
            <p style={{ color: statusColor }}>{status}</p>
          </Col>
        </Row>

        <Carousel className="mt-3" interval={3000} controls={false} indicators={false}>
          <Carousel.Item>
            <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
              <h5>Machine Utilization</h5>
              <h2>65%</h2>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
              <h5>OEE</h5>
              <h2>76%</h2>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
              <h5>Production Count</h5>
              <h2>56 / 100</h2>
            </div>
          </Carousel.Item>
        </Carousel>
      </Card.Body>
    </Card>
  );
};



const Dashboard = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        maxWidth: "100%",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "0px",
        height: "Auto"
      }}
    >
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

      {/* KPI Cards */}
      <Row className="text-center mt-4 ms-1">
        <Col xs={12} sm={6} md={3} className="mb-2">
          <Card className="bg-primary text-white">
            <Card.Body>
              <Card.Title>100</Card.Title>
              <Card.Text>Number Of Parts Produced</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="bg-success text-white">
            <Card.Body>
              <Card.Title>57</Card.Title>
              <Card.Text>Online Assets</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="bg-warning text-white">
            <Card.Body>
              <Card.Title>13</Card.Title>
              <Card.Text>Offline Assets</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="bg-danger text-white">
            <Card.Body>
              <Card.Title>4</Card.Title>
              <Card.Text>Under Maintenance</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Availability, Performance, OEE */}
      <Row className="text-center ms-1 mb-0">
        <Col className="mb-2">
          <Card className="bg-warning text-white h-100 w-100 ">
            <Card.Body className="py-1">Availability: 92%</Card.Body>
          </Card>
        </Col>
        <Col className="mb-2">
          <Card className="bg-warning text-white h-100 w-100">
            <Card.Body className="py-1">Performance: 85%</Card.Body>
          </Card>
        </Col>
        <Col className="mb-2">
          <Card className="bg-warning text-white h-100 w-100">
            <Card.Body className="py-1">OEE: 76%</Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Row for the CNC Machine Cards */}
      <Row className="gy-3 gx-3 mt-0 ms-2 mt-0">
        <Col xs={12} md={4} lg={3}>
          <MachineCard
            title="CNC-1"
            partName="Crank Shaft"
            status="Active"
            statusColor="green"
            bgColor="#90ee90"
            count="Machine Utilization:"
            utilization="65%"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
            title="CNC-2"
            partName="Gear Shaft"
            status="Idle"
            statusColor="orange"
            bgColor="#f4a460"
            count="OEE:"
            utilization="40%"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
            title="CNC-3"
            partName="Wheel Hub"
            status="Breakdown"
            statusColor="red"
            bgColor="#ff7f7f"
            count="Production Count: 20 /100"
            // utilization="20%"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
            title="CNC-4"
            partName="Axle Shaft"
            status="Offline"
            statusColor="gray"
            bgColor="#d3d3d3"
            count="OEE:"
            utilization="30%"
          />
        </Col>
      </Row>

       {/* Row for the CNC Machine Cards */}
      <Row className="gy-3 gx-3 mt-0 ms-2 mt-0">
        <Col xs={12} md={4} lg={3}>
          <MachineCard
            title="CNC-1"
            partName="Crank Shaft"
            status="Active"
            statusColor="green"
            bgColor="#90ee90"
            count="Machine Utilization:"
            utilization="65%"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
            title="CNC-2"
            partName="Gear Shaft"
            status="Idle"
            statusColor="orange"
            bgColor="#f4a460"
            count="OEE:"
            utilization="40%"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
            title="CNC-3"
            partName="Wheel Hub"
            status="Breakdown"
            statusColor="red"
            bgColor="#ff7f7f"
            count="Production Count: 20 /100"
            // utilization="20%"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
            title="CNC-4"
            partName="Axle Shaft"
            status="Offline"
            statusColor="gray"
            bgColor="#d3d3d3"
            count="OEE:"
            utilization="30%"
          />
        </Col>
      </Row>

      {/* Row for the CNC Machine Cards */}
       {/* Machine Cards */}
       <Row className="gy-3 gx-3 mt-0 ms-2 mt-0">
        <Col xs={12} md={4} lg={3}>
          <MachineCard
          id="1"
            title="CNC-1"
            partName="Crank Shaft"
            status="Active"
            statusColor="green"
            bgColor="#90ee90"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
          id="1"
            title="CNC-2"
            partName="Gear Shaft"
            status="Idle"
            statusColor="orange"
            bgColor="#f4a460"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
          id="1"
            title="CNC-3"
            partName="Wheel Hub"
            status="Breakdown"
            statusColor="red"
            bgColor="#ff7f7f"
          />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <MachineCard
          id="1"
            title="CNC-4"
            partName="Axle Shaft"
            status="Offline"
            statusColor="gray"
            bgColor="#d3d3d3"
          />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default Dashboard;
