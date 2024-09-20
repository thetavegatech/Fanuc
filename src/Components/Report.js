import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // Assuming you are using Chart.js
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Files from './Files';
import { useParams } from 'react-router-dom';

const ReportPage = () => {
  // const { machineId } = useParams();
  const machineId = localStorage.getItem('selectedMachineId');

  console.log(machineId)
  const [shifts, setShifts] = useState([]);
  const [productionData, setProductionData] = useState([]); // Ensure initial state is an array
  const [plannedData, setPlannedData] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true); // Loading state to show spinner or loading message

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Shift Data
        const shiftResponse = await axios.get('http://localhost:5001/api/shifts');
        setShifts(Array.isArray(shiftResponse.data) ? shiftResponse.data : []); // Ensure data is an array

        // Fetch Production Data
        const productionResponse = await axios.get(`http://localhost:5001/api/machine-data/forall/ORG001/${machineId}/productionData`);
        const productionArray = Array.isArray(productionResponse.data.data) ? productionResponse.data.data : [];
        setProductionData(productionArray); // Set the production data array directly

        // Fetch Planned Quantity Data
        const plannedResponse = await axios.get(`http://localhost:5001/api/productionalldata?machineId=${machineId}`);
        setPlannedData(Array.isArray(plannedResponse.data) ? plannedResponse.data : []); // Ensure data is an array

        setLoading(false); // Data fetched successfully
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Error occurred
      }
    };

    fetchData();
  }, []);

  // Prepare chart data dynamically based on the fetched data
  const chartData = {
    labels: shifts.map(shift => shift.shiftNumber || 'Unknown Shift'), // Handle possible undefined shiftName
    datasets: [
      {
        label: 'Good Parts',
        data: shifts.map(shift => {
          if (Array.isArray(productionData)) {
            const shiftData = productionData.find(data => data.ShiftId === shift._id);
            return shiftData ? shiftData.GoodParts : 0;
          }
          return 0;
        }),
        backgroundColor: 'blue',
      },
      {
        label: 'Expected Parts',
        data: shifts.map(shift => {
          if (Array.isArray(plannedData)) {
            const plannedShiftData = plannedData.find(plan => plan.machineId === "MACHINE2");
            return plannedShiftData ? plannedShiftData.PlannedQty : 0;
          }
          return 0;
        }),
        backgroundColor: 'lightblue',
      },
      {
        label: 'Parts Rejected',
        data: shifts.map(shift => {
          if (Array.isArray(productionData)) {
            const shiftData = productionData.find(data => data.ShiftId === shift._id);
            return shiftData ? shiftData.DefectiveParts : 0;
          }
          return 0;
        }),
        backgroundColor: 'red',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (loading) {
    return <div>Loading data, please wait...</div>;
  }

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

      {/* Main Section: Chart and Table */}
      <Container fluid style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Row>
          <Col xs={12}>
            {/* First Row - Chart */}
            <Row className="mb-4 mt-2">
              <Col>
                <div className="d-flex justify-content-center mb-3">
                  <Button variant="outline-primary" className="me-2">Day</Button>
                  <Button variant="outline-secondary" className="me-2">Month</Button>
                  <Button variant="outline-info" className="me-2">Quarter</Button>
                  <Button variant="outline-success">Year</Button>
                </div>
                <h4 className="text-center">Good Parts vs Expected Parts</h4>
                <div style={{ height: '300px' }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </Col>
            </Row>

            {/* Second Row - Table */}
            <Row>
              <Col>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Shift / Machine</th>
                      <th>Shift Number</th>
                      <th>Machine ID</th>
                      <th>Total Parts</th>
                      <th>Good Parts</th>
                      <th>Parts Rejected</th>
                      <th>Planned Parts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((shift, index) => {
                      if (!Array.isArray(productionData) || !Array.isArray(plannedData)) {
                        return null; // Handle non-array data gracefully
                      }
                      const shiftData = productionData.find(data => data.ShiftId === shift._id);
                      const plannedShiftData = plannedData.find(plan => plan.machineId === shiftData?.MachineId); // Match by machine ID
                      return (
                        <tr key={shift._id}>
                          <td>{` ${shift.shiftNumber} - ${shiftData ? shiftData.MachineId : 'N/A'}`}</td>
                          <td>{shift.shiftNumber || 'N/A'}</td> {/* Display shift number */}
                          <td>{shiftData ? shiftData.MachineId : 'N/A'}</td> {/* Display machine ID */}
                          <td>{shiftData ? shiftData.TotalPartsProduced : 0}</td>
                          <td>{shiftData ? shiftData.GoodParts : 0}</td>
                          <td>{shiftData ? shiftData.DefectiveParts : 0}</td>
                          <td>{plannedShiftData ? plannedShiftData.PlannedQty : 0}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportPage;
