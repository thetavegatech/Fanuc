
// new 

import React,{useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import Footer from "./Footer";


const MachineCard = ({ id, title, status, statusColor, bgColor }) => {
  const navigate = useNavigate();
  const [OEE, setOEE] = useState(null); 
  const [partName, setPartName] = useState('Loading...');
  const [machineEfficiency, setMachineEfficiency] = useState('Loading...');
  const [plannedQty, setPlannedQty] = useState('Loading...');
  const [totalPartsProduced, setTotalPartsProduced] = useState(null);
  const [machineStatus, setMachineStatus] = useState(''); // New state for machine status

  // Fetch PlannedQty for the machine
  const fetchPlannedQty = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/productionalldata`);
      const machineProductionData = response.data.find((item) => item.machineId === id);
      
      if (machineProductionData) {
        setPlannedQty(machineProductionData.PlannedQty); // Set PlannedQty
      } else {
        setPlannedQty(0); // Set PlannedQty to 0 if no data found
      }
    } catch (error) {
      console.error('Error fetching planned quantity:', error);
      setPlannedQty(0); // Set PlannedQty to 0 on error
    }
  };

  // Fetch part name by machineId
  const fetchPartName = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/part/getpartnamesbymachineid/${id}`);
      if (response.data.length > 0) {
        setPartName(response.data[0]); // Set the first part name if available
      } else {
        setPartName('No part found');
      }
    } catch (error) {
      console.error('Error fetching part names:', error);
      setPartName('Error loading part name');
    }
  };

  // Fetch machine status
  const fetchMachineStatus = async () => {
    try {
      console.log('Fetching machine status for machineId:', id); // Debugging: Log machineId
      const response = await axios.get(`http://localhost:5001/api/machine-status/getall`);
      console.log('Machine status API response:', response.data); // Debugging: Log API response

      const machineData = response.data.find(machine => machine.machineId === id);

      if (machineData) {
        console.log('Found machine status:', machineData.IsAvailable); // Debugging: Log found status
        // Convert IsAvailable boolean to readable text
        const statusText = machineData.IsAvailable ? 'Available' : 'Idle';
        setMachineStatus(statusText); // Set status from the API
      } else {
        console.log('No status found for machineId:', id); // Debugging: Log missing status
        setMachineStatus('Unknown'); // Set default status if not found
      }
    } catch (error) {
      console.error('Error fetching machine status:', error);
      setMachineStatus('Error'); // Set default status on error
    }
  };


  // Fetch part names, planned quantity, and machine status when the component loads
  useEffect(() => {
    fetchPartName();
    fetchPlannedQty();
    fetchMachineStatus(); // Fetch machine status
  }, [id]);
  
  const fetchMachineDataoee = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machine-data/ORG001/allpro');
      
      const machine = response.data.find(m => m.machineId === id);
      
      if (machine && machine.latestProductionData) {
        const { TotalPartsProduced, GoodParts, TargetProduction } = machine.latestProductionData;

        // Step 1: Planned Production Time (480 minutes or 28,800 seconds for 8 hours)
        const plannedProductionTime = 480 * 60; // Convert 480 minutes to seconds

        // Breakdown and Operating Time
        const breakdownTime = 50 * 60;  // Convert 50 minutes to seconds
        const operatingTime = 430 * 60; // Convert 430 minutes to seconds

        // Step 3: Availability = (Operating Time / Planned Production Time) * 100
        const availability = (operatingTime / plannedProductionTime) * 100;

        // Step 4: Performance = (Ideal Cycle Time * Total Parts Produced) / Operating Time * 100
        const idealCycleTime = 150; // Ideal cycle time in seconds
        const performance = (idealCycleTime * TotalPartsProduced) / operatingTime * 100;

        // Step 5: Quality = (Good Parts Produced / Total Parts Produced) * 100
        const quality = (GoodParts / TotalPartsProduced) * 100;

        // Step 6: OEE = (Availability * Performance * Quality) / 10000
        const OEE = (availability * performance * quality) / 10000;

        // Step 7: Machine Efficiency = (Good Parts Produced / Target Production) * 100
        const machineEfficiency = (GoodParts / TargetProduction) * 100;

        console.log('OEE for MACHINE001:', OEE);
        console.log('Machine Efficiency for MACHINE001:', machineEfficiency);

        // Store OEE, Availability, Performance, Quality, and Machine Efficiency in state
        setOEE(OEE);
        setTotalPartsProduced(TotalPartsProduced);
        setMachineEfficiency(machineEfficiency);
      } else {
        console.log('No production data found for MACHINE001');
      }
  
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  // Fetch OEE data for MACHINE001 when the component loads
  useEffect(() => {
    fetchMachineDataoee();
  }, []);

  // Handle click on the card to navigate to the summary page with the machine ID
  // const handleCardClick = () => {
  //   navigate(`/machine/${id}`); // Navigate to the summary page, passing the machine ID
  // };

  const handleCardClick = () => {
    localStorage.setItem('selectedMachineId', id); 
    navigate(`/machine/${id}`); // Navigate to the summary page, passing the machine ID
  };


    // Example data for charts (replace with actual data)
    const chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Production',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
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
            <p style={{ fontSize: '13.3px'}}>{partName}</p>
          </Col>
          <Col className="text-end">
            <p className="mb-0"><strong>Status</strong></p>
            <p style={{ color: statusColor }}>{machineStatus}</p> {/* Updated to use machineStatus */}
          </Col>
        </Row>

        <Carousel className="mt-3" interval={3000} controls={false} indicators={false}>
          <Carousel.Item>
            <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
              <h5>Machine Utilization</h5>
              <h2>{machineEfficiency}%</h2>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
              <h5>OEE</h5>
              <h2> {OEE !== null ? OEE.toFixed(2) : 'Calculating...'}</h2>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="text-center p-3 rounded" style={{ backgroundColor: bgColor }}>
              <h5>Production Count</h5>
              <h2>{totalPartsProduced !== null ? totalPartsProduced : 'Loading...'}/ {plannedQty}</h2>
            </div>
          </Carousel.Item>
        </Carousel>
      </Card.Body>
      <div className="mt-3">
          <Row>
            <Col className="text-center">
              <h6 className="mb-2">Production Over Time</h6>
              <div style={{ height: '150px' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Col>
          </Row>
        </div>
    </Card>
  );
};




const Dashboard = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [OEE, setOEE] = useState(null);  
  const [breakdownCount, setBreakdownCount] = useState(0);
  const [totalPartsProduced, setTotalPartsProduced] = useState(0);
  const organizationId = 'ORG001';
  const [offlineCount, setOfflineCount] = useState(0);
  const [machineEfficiency, setMachineEfficiency] = useState('Loading...');
  const [machines, setMachines] = useState([]);

  // Fetch machine data from the API
  const fetchMachineData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machine-status/getall');
      setMachines(response.data);  // Store the fetched data in state
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  useEffect(() => {
    fetchMachineData();  // Fetch data when component loads
  }, []);

  //availability
  const fetchMachineDataoee = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machine-data/ORG001/allpro');
      
      const machine = response.data.find(m => m.machineId === "MACHINE2");
      
      if (machine && machine.latestProductionData) {
        const { TotalPartsProduced, GoodParts, TargetProduction } = machine.latestProductionData;

        // Step 1: Planned Production Time (480 minutes or 28,800 seconds for 8 hours)
        const plannedProductionTime = 480 * 60; // Convert 480 minutes to seconds

        // Breakdown and Operating Time
        const breakdownTime = 50 * 60;  // Convert 50 minutes to seconds
        const operatingTime = 430 * 60; // Convert 430 minutes to seconds

        // Step 3: Availability = (Operating Time / Planned Production Time) * 100
        const availability = (operatingTime / plannedProductionTime) * 100;

        // Step 4: Performance = (Ideal Cycle Time * Total Parts Produced) / Operating Time * 100
        const idealCycleTime = 150; // Ideal cycle time in seconds
        const performance = (idealCycleTime * TotalPartsProduced) / operatingTime * 100;

        // Step 5: Quality = (Good Parts Produced / Total Parts Produced) * 100
        const quality = (GoodParts / TotalPartsProduced) * 100;

        // Step 6: OEE = (Availability * Performance * Quality) / 10000
        const OEE = (availability * performance * quality) / 10000;

        // Step 7: Machine Efficiency = (Good Parts Produced / Target Production) * 100
        const machineEfficiency = (GoodParts / TargetProduction) * 100;

        console.log('OEE for MACHINE001:', OEE);
        console.log('Machine Efficiency for MACHINE001:', machineEfficiency);

        // Store OEE, Availability, Performance, Quality, and Machine Efficiency in state
        setOEE(OEE);
        setAvailability(availability);
        setPerformance(performance);
        // setQuality(quality);
        setMachineEfficiency(machineEfficiency);
        
      } else {
        console.log('No production data found for MACHINE001');
      }
  
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };
  
  // Fetch OEE data for MACHINE001 when the component loads
  useEffect(() => {
    fetchMachineDataoee();
  }, []);


  useEffect(() => {
    // Fetch Total Parts Produced from the latest production data
    const fetchProductionData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/machine-data/${organizationId}/allpro`);
        const latestMachine = response.data.find(machine => machine.latestProductionData !== 'No data available');

        if (latestMachine && latestMachine.latestProductionData) {
          setTotalPartsProduced(latestMachine.latestProductionData.TotalPartsProduced);
        }
      } catch (error) {
        console.error('Error fetching production data:', error);
      }
    };

    fetchProductionData();
  }, [organizationId]);

  useEffect(() => {
    // Fetch active and inactive machines count
    const fetchMachinesCount = async () => {
      try {
        // Fetch active machines count
        const activeResponse = await axios.get(`http://localhost:5001/api/machines/${organizationId}/active-count`);
        setOnlineCount(activeResponse.data.count); // Update online count
  
        // Fetch inactive machines count
        const inactiveResponse = await axios.get(`http://localhost:5001/api/machines/${organizationId}/inactive-count`);
        setOfflineCount(inactiveResponse.data.count); // Update offline count

        const response = await axios.get('http://localhost:5001/api/breakdowns/count');
        setBreakdownCount(response.data.count);

      } catch (error) {
        console.error('Error fetching machine counts:', error);
      }
    };
  
    fetchMachinesCount();
    
  }, [organizationId]);
  
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
              <Card.Title>{totalPartsProduced}</Card.Title>
              <Card.Text>Number Of Parts Produced</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="bg-success text-white">
            <Card.Body>
              <Card.Title>{onlineCount}</Card.Title>
              <Card.Text>Online Assets</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="bg-warning text-white">
            <Card.Body>
              <Card.Title>{offlineCount}</Card.Title>
              <Card.Text>Offline Assets</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="bg-danger text-white">
            <Card.Body>
              <Card.Title>{breakdownCount}</Card.Title>
              <Card.Text>Under Maintenance</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Availability, Performance, OEE */}
      <Row className="text-center ms-1 mb-0">
        <Col className="mb-2">
          <Card className="bg-warning text-white h-100 w-100 ">
            <Card.Body className="py-1">Availability: {availability !== null ? availability.toFixed(2) : 'Calculating...'}</Card.Body>
          </Card>
        </Col>
        <Col className="mb-2">
          <Card className="bg-warning text-white h-100 w-100">
            <Card.Body className="py-1">Performance: {performance !== null ? performance.toFixed(2) : 'Calculating...'}%</Card.Body>
          </Card>
        </Col>
        <Col className="mb-2">
          <Card className="bg-warning text-white h-100 w-100">
            <Card.Body className="py-1">OEE: {OEE !== null ? OEE.toFixed(2) : 'Calculating...'}%</Card.Body>
          </Card>
        </Col>
      </Row>


      <Row className="gy-3 gx-3 mt-0 ms-2 mt-0">
        {machines.map((machine) => (
          <Col key={machine.machineId} xs={12} md={4} lg={3}>
            <MachineCard
              id={machine.machineId}  // Pass machine ID
              title={machine.machineName}  // Pass machine name as the title
              partName="Crank Shaft"  // Update with actual part name if needed
              status={machine.status}  // Use the status from the API data
              statusColor="green"  // Update color based on status logic
              bgColor="#90ee90"  // Dynamic background color if needed
            />
          </Col>
        ))}
      </Row>


      {/* Row for the CNC Machine Cards */}
      {/* <Row className="gy-3 gx-3 mt-0 ms-2 mt-0">
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
      </Row> */}

       {/* Row for the CNC Machine Cards */}
      {/* <Row className="gy-3 gx-3 mt-0 ms-2 mt-0">
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
      </Row> */}

      {/* Row for the CNC Machine Cards */}
       {/* Machine Cards */}
       {/* <Row className="gy-3 gx-3 mt-0 ms-2 mt-0">
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
      </Row> */}
      <Footer />
    </Container>
  );
};

export default Dashboard;
