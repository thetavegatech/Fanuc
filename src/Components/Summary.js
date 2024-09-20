import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios'; // Make sure to import axios for API calls
import 'chart.js/auto';
import { useParams } from 'react-router-dom'; 
import Files from './Files';

function Summary() {
  const { machineId } = useParams(); // Get the machineId from the route parameters
  const [availability, setAvailability] = useState(null);
  const [quality, setQuality] = useState(null);
  const [partsBehind, setPartsBehind] = useState(null);
  const [targetProduction, setTargetProduction] = useState(null); // New state for TargetProduction
  const [cycleTime, setCycleTime] = useState(null);
  const [downtime, setDowntime] = useState(null); 
  const [totalPartsProduced, setTotalPartsProduced] = useState(null);
  const [machineStatus, setMachineStatus] = useState('Loading...'); // Set initial state to Loading
  const [cycleTimeStats, setCycleTimeStats] = useState({ high: null, low: null, average: null }); // State for CycleTime statistics

  // Initialize availabilityData with sample data
  const [availabilityData, setAvailabilityData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Availability',
        data: [90, 92, 94, 93, 94], // Initial static data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  const [qualityData, setQualityData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Quality',
        data: [98, 98, 98, 98, 98],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  });

  const [partsBehindData, setPartsBehindData] = useState({
    labels: ['Complete', 'Behind'],
    datasets: [
      {
        label: 'Parts Behind',
        data: [89, 11],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  });

  const updateAvailabilityChartData = (newData) => {
    setAvailabilityData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: newData,
        },
      ],
    }));
  };

  const updateQualityChartData = (newData) => {
    setQualityData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: newData,
        },
      ],
    }));
  };

  const updatePartsBehindChartData = (complete, behind) => {
    setPartsBehindData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [complete, behind],
        },
      ],
    }));
  };

  // Function to fetch downtime data and calculate downtime
  const fetchDowntimeData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/downtime/machine/${machineId}`);
      console.log("id", machineId);
      const downtimeData = response.data;

      console.log('Downtime Data:', downtimeData);

      let totalDowntimeSeconds = 0;

      downtimeData.forEach((period) => {
        if (period.DownStartDateTime && period.DownEndDateTime) {
          const startTime = new Date(period.DownStartDateTime);
          const endTime = new Date(period.DownEndDateTime);

          if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
            const differenceInSeconds = (endTime - startTime) / 1000;
            totalDowntimeSeconds += differenceInSeconds;
          }
        }
      });

      const hours = Math.floor(totalDowntimeSeconds / 3600);
      const minutes = Math.floor((totalDowntimeSeconds % 3600) / 60);

      if (isNaN(hours) || isNaN(minutes)) {
        setDowntime('00:00');
      } else {
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        setDowntime(`${formattedHours}:${formattedMinutes}`);
      }
    } catch (error) {
      console.error('Error fetching downtime data:', error);
    }
  };

  // Fetch machine status
  const fetchMachineStatus = async () => {
    try {
      console.log('Fetching machine status for machineId:', machineId);
      const response = await axios.get(`http://localhost:5001/api/machine-status/getall`);
      console.log('Machine status API response:', response.data);

      const machineData = response.data.find(machine => machine.machineId === machineId);

      if (machineData) {
        console.log('Found machine status:', machineData.IsAvailable);
        const statusText = machineData.IsAvailable ? 'Available' : 'Unavailable';
        setMachineStatus(statusText);
      } else {
        console.log('No status found for machineId:', machineId);
        setMachineStatus('Unknown');
      }
    } catch (error) {
      console.error('Error fetching machine status:', error);
      setMachineStatus('Error');
    }
  };

  // Calculate Cycle Time statistics
  const calculateCycleTimeStats = (cycleTimes) => {
    if (!cycleTimes || cycleTimes.length === 0) {
      return { high: 'N/A', low: 'N/A', average: 'N/A' };
    }

    const cycleTimesInSeconds = cycleTimes.map(time => parseFloat(time));
    const high = Math.max(...cycleTimesInSeconds);
    const low = Math.min(...cycleTimesInSeconds);
    const average = (cycleTimesInSeconds.reduce((sum, value) => sum + value, 0) / cycleTimesInSeconds.length).toFixed(2);

    return {
      high: secondsToHMS(high),
      low: secondsToHMS(low),
      average: secondsToHMS(average),
    };
  };

  const secondsToHMS = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? `${h}:` : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const fetchCycleTimeStats = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/machine-data/forall/ORG001/${machineId}/productionData`);
      const productionData = response.data.data;

      const cycleTimes = productionData.map(data => parseFloat(data.CycleTime)).filter(time => !isNaN(time));

      if (cycleTimes.length > 0) {
        const high = Math.max(...cycleTimes);
        const low = Math.min(...cycleTimes);
        const average = (cycleTimes.reduce((sum, value) => sum + value, 0) / cycleTimes.length).toFixed(2);

        setCycleTimeStats({
          high: secondsToHMS(high),
          low: secondsToHMS(low),
          average: secondsToHMS(average),
        });
      } else {
        setCycleTimeStats({ high: 'N/A', low: 'N/A', average: 'N/A' });
      }
    } catch (error) {
      console.error('Error fetching cycle time data:', error);
    }
  };

  const fetchProductionData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/productionalldata');
      const productionData = response.data;

      const machineProductionData = productionData.find((item) => item.machineId === machineId);

      if (machineProductionData) {
        setTargetProduction(machineProductionData.PlannedQty);
        setCycleTime(machineProductionData.CycleTime);
      } else {
        console.log('No production data found for MACHINE2');
      }
    } catch (error) {
      console.error('Error fetching production data:', error);
    }
  };

  const fetchMachineDataoee = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machine-data/ORG001/allpro');
      const machine = response.data.find((m) => m.machineId === machineId);

      if (machine && machine.latestProductionData && targetProduction !== null) {
        const { TotalPartsProduced, GoodParts } = machine.latestProductionData;

        const plannedProductionTime = 480 * 60;
        const breakdownTime = 50 * 60;
        const operatingTime = 430 * 60;

        const availability = (operatingTime / plannedProductionTime) * 100;
        const idealCycleTime = 150;
        const performance = (idealCycleTime * TotalPartsProduced) / operatingTime * 100;
        const quality = (GoodParts / TotalPartsProduced) * 100;

        const OEE = (availability * performance * quality) / 10000;
        const machineEfficiency = (GoodParts / targetProduction) * 100;

        const partsBehind = targetProduction - TotalPartsProduced;
        const complete = TotalPartsProduced;

        console.log('OEE for MACHINE2:', OEE);
        console.log('Machine Efficiency for MACHINE2:', machineEfficiency);
        console.log('Parts Behind for MACHINE2:', partsBehind);

        setAvailability(availability);
        setQuality(quality);
        setPartsBehind(partsBehind);

        updateAvailabilityChartData([availability, availability + 2, availability - 1, availability, availability + 1]);
        updateQualityChartData([quality, quality - 0.5, quality + 0.5, quality, quality - 0.2]);
        updatePartsBehindChartData(complete, partsBehind);
      } else {
        console.log('No production data found or targetProduction is not set for MACHINE2');
      }
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  useEffect(() => {
    fetchProductionData();
    fetchDowntimeData();
    fetchCycleTimeStats();
  }, []);

  useEffect(() => {
    if (targetProduction !== null) {
      fetchMachineDataoee();

      const interval = setInterval(() => {
        fetchMachineDataoee();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [targetProduction]);

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

      {/* Machine Info Section */}
      <Container fluid className="my-0 rounded bg-white">
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

        {/* Second Row - Charts */}
        <Row className="py-4">
          <Col lg={4} md={6} sm={12} className="mb-4">
            <h4 className="text-center">
              {availability !== null ? availability.toFixed(2) : 'Calculating...'}% Availability
            </h4>
            <Bar data={availabilityData} options={{ maintainAspectRatio: true }} />
          </Col>

          <Col lg={4} md={6} sm={12} className="mb-4">
            <h4 className="text-center">Parts Behind</h4>
            <div className="position-relative" style={{ height: '250px' }}>
              <Pie data={partsBehindData} options={{ maintainAspectRatio: false }} />
              <div
                className="position-absolute text-center w-100"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#000',
                }}
              >
                {partsBehind !== null ? `${partsBehind} Parts Behind` : 'Calculating...'}
              </div>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12} className="mb-4">
            <h4 className="text-center">{quality !== null ? quality.toFixed(2) : 'Calculating...'}% Quality</h4>
            <Bar data={qualityData} options={{ maintainAspectRatio: true }} />
          </Col>
        </Row>

        {/* Third Row - Downtime, Expected Cycles, Rejected Parts */}
        <Row className="text-center py-3" style={{ backgroundColor: '#ff7f0e' }}>
          <Col>
            <h3 className="text-purple">{downtime} Downtime</h3>
            <p>Part Change: 00:20</p>
            <p>Machine Failure: 00:10</p>
            <p>Planned Maintenance: 00:10</p>
          </Col>
          <Col>
            <h3 className="text-purple">{cycleTime} Expected Cycles</h3> {/* Displaying average cycle time */}
            <p>High: {cycleTimeStats.high}</p>
            <p>Low: {cycleTimeStats.low}</p>
            <p>Average: {cycleTimeStats.average}</p>
          </Col>
          <Col>
            <h3 className="text-purple">0 Rejected Parts</h3>
            <p>Tool Issue: 0</p>
            <p>Bad Finish: 0</p>
            <p>Worker Skill: 0</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Summary;
