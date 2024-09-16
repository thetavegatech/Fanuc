// // // Index.js
// // import React from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const Home = () => {
// //   return (
// //     <div className="container">
// //       {/* Main container with a fixed width */}
// //       <div className="container" style={{ width: '750px' }}>
        
// //         {/* Row for side-by-side divs */}
// //         <div className="row mb-3">
// //           <div className="col">
// //             <div className="p-2 bg-light border">This Shift</div>
// //           </div>
// //           <div className="col">
// //             <div className="p-2 bg-light border">Last Shift</div>
// //           </div>
// //           <div className="col">
// //             <div className="p-2 bg-light border">Last Hr</div>
// //           </div>
// //           <div className="col">
// //             <div className="p-2 bg-light border">Today</div>
// //           </div>
// //         </div>

// //         {/* Centered div with From Date and To Date */}
// //         <div className="d-flex justify-content-center mb-3">
// //           <div className="p-3 border rounded" style={{ width: '100%' }}>
// //             <div className="mb-3">
// //               <label htmlFor="fromDate" className="form-label">From Date</label>
// //               <input type="date" id="fromDate" className="form-control" />
// //             </div>
// //             <div>
// //               <label htmlFor="toDate" className="form-label">To Date</label>
// //               <input type="date" id="toDate" className="form-control" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search bar */}
// //         <div className="d-flex justify-content-start">
// //           <input 
// //             type="text" 
// //             className="form-control" 
// //             placeholder="Search" 
// //             style={{ width: '100%' }} 
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;


// import React from 'react';
// import { Container, Row, Col, Button, Card, Form, InputGroup } from 'react-bootstrap';

// const Dashboard = () => {
//   return (
//     <Container fluid>
//       {/* Top Filters */}
//       <Row className="my-3">
//         <Col>
//           <Button variant="primary">This Shift</Button>
//           <Button variant="secondary" className="mx-2">
//             Last Shift
//           </Button>
//           <Button variant="success">Last Hr</Button>
//           <Button variant="info" className="mx-2">
//             Today
//           </Button>
//         </Col>
//         <Col>
//           <InputGroup className="float-end">
//             <InputGroup.Text>From:</InputGroup.Text>
//             <Form.Control type="date" />
//             <InputGroup.Text>To:</InputGroup.Text>
//             <Form.Control type="date" />
//           </InputGroup>
//         </Col>
//         <Col>
//           <Form.Control placeholder="Search" className="float-end" />
//         </Col>
//       </Row>

//       {/* KPI Cards */}
//       <Row className="text-center">
//         <Col>
//           <Card className="bg-primary text-white">
//             <Card.Body>
//               <Card.Title>100</Card.Title>
//               <Card.Text>Number Of Parts Produced</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className="bg-success text-white">
//             <Card.Body>
//               <Card.Title>57</Card.Title>
//               <Card.Text>Online Assets</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className="bg-warning text-white">
//             <Card.Body>
//               <Card.Title>13</Card.Title>
//               <Card.Text>Offline Assets</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className="bg-danger text-white">
//             <Card.Body>
//               <Card.Title>4</Card.Title>
//               <Card.Text>Under Maintenance</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Availability, Performance, OEE */}
//       <Row className="my-4 text-center">
//         <Col>
//           <Card className="bg-warning text-white">
//             <Card.Body>Availability: 92%</Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className="bg-warning text-white">
//             <Card.Body>Performance: 85%</Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className="bg-warning text-white">
//             <Card.Body>OEE: 76%</Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Machine Utilization Cards */}
//       <Row className="text-center">
//         <Col>
//           <Card>
//             <Card.Header className="bg-orange text-white">CNC-1</Card.Header>
//             <Card.Body>
//               <Card.Text>Part Name: Crank Shaft</Card.Text>
//               <Card.Text>Status: Active</Card.Text>
//               <Card.Title>Machine Utilization</Card.Title>
//               <Card.Text>65%</Card.Text>
//               <Card.Text>Production Count: 40 / 100</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col>
//           <Card>
//             <Card.Header className="bg-orange text-white">CNC-2</Card.Header>
//             <Card.Body>
//               <Card.Text>Part Name: Gear Shaft</Card.Text>
//               <Card.Text>Status: Idle</Card.Text>
//               <Card.Title>Production Count</Card.Title>
//               <Card.Text>40 / 100</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col>
//           <Card>
//             <Card.Header className="bg-orange text-white">CNC-3</Card.Header>
//             <Card.Body>
//               <Card.Text>Part Name: Wheel Hub</Card.Text>
//               <Card.Text>Status: Breakdown</Card.Text>
//               <Card.Title>Production Count</Card.Title>
//               <Card.Text>20 / 100</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col>
//           <Card>
//             <Card.Header className="bg-orange text-white">CNC-4</Card.Header>
//             <Card.Body>
//               <Card.Text>Part Name: Axle Shaft</Card.Text>
//               <Card.Text>Status: Offline</Card.Text>
//               <Card.Title>Production Count</Card.Title>
//               <Card.Text>30 / 100</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;

