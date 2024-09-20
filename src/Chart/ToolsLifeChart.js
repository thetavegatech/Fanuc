import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ToolsLifeChart = ({ machineId}) => {
  console.log(machineId)
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Actual Life',
        data: [],
      },
      {
        name: 'Set Life',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Life',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}`,
        },
      },
      title: {
        text: 'Tool Life vs Set Life',
        align: 'center',
      },
    },
  });

  const fetchData = async () => {
    try {
      const url = `http://localhost:5001/api/tools/machine/${machineId}`;
      const response = await axios.get(url);
      const data = response.data;

      // Transform data for the chart
      const categories = data.map((tool) => tool.toolName);
      const actualLife = data.map((tool) => Number(tool.actualLife));
      const setLife = data.map((tool) => Number(tool.setLife));

      setChartData((prevData) => ({
        ...prevData,
        series: [
          {
            name: 'Actual Life',
            data: actualLife,
          },
          {
            name: 'Set Life',
            data: setLife,
          },
        ],
        options: {
          ...prevData.options,
          xaxis: {
            categories: categories,
          },
        },
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial load

  return (
    <div className="card mb-4 d-flex flex-column h-100">
      <div className="card-header">
        <h3>Tool Life Chart</h3>
      </div>
      <div className="card-body flex-fill">
        <div style={{ height: '350px' }}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ToolsLifeChart;
