
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ServoTempChart = ({ machineId }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: 'datetime',
      },
      title: {
        text: 'Servo Temperature Data',
        align: 'center',
      },
      stroke: {
        curve: 'smooth',
      },
    },
  });

  const [filters, setFilters] = useState({
    date: '',
    time: '',
    shift: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchData = async () => {
    try {
      // Build API URL with query parameters
      const { date, time, shift } = filters;
      const query = new URLSearchParams();
      if (date) query.append('date', date);
      if (time) query.append('time', time);
      if (shift) query.append('shift', shift);

      const url = `http://localhost:5001/api/machine-data/ORG001/${machineId}/MonitoringDataLog?subType=ServoTemp&${query.toString()}`;
      const response = await axios.get(url);
      const data = response.data;

      // Transform data into series format for ApexCharts
      const groupedData = {
        ServoTemp1: [],
        ServoTemp2: [],
        ServoTemp3: [],
        ServoTemp4: [],
      };

      data.forEach((item) => {
        if (groupedData[item.ParameterName]) {
          groupedData[item.ParameterName].push({
            x: new Date(item.createdAt),
            y: parseInt(item.ParameterValue, 10),
          });
        }
      });

      const series = Object.keys(groupedData).map((key) => ({
        name: key,
        data: groupedData[key],
      }));

      setChartData((prevData) => ({
        ...prevData,
        series: series,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on initial load or when filters change
  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <div className="card mb-4 d-flex flex-column h-100">
      <div className="card-header">
        <h3>Servo Temp</h3>
      </div>
      <div className="card-body flex-fill">
        <div className="filters mb-3 d-flex">
          <input
            type="date"
            name="date"
            className="form-control me-2"
            style={{ width: 'auto' }}
            value={filters.date}
            onChange={handleFilterChange}
          />
          <input
            type="time"
            name="time"
            className="form-control me-2"
            style={{ width: 'auto' }}
            value={filters.time}
            onChange={handleFilterChange}
          />
          <select
            name="shift"
            className="form-select me-2"
            style={{ width: 'auto' }}
            value={filters.shift}
            onChange={handleFilterChange}
          >
            <option value="">Shift</option>
            <option value="1">Shift 1</option>
            <option value="2">Shift 2</option>
            <option value="3">Shift 3</option>
          </select>
          <button className="btn btn-primary btn-sm" onClick={fetchData}>
            Apply
          </button>
        </div>
        <div style={{ height: '300px' }}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ServoTempChart;
