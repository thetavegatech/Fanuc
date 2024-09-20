import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BatteryStats = ({ machineId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatteryStats = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/machine-data/ORG001/${machineId}/MonitoringDataLog?subType=BatteryStats`);
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchBatteryStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Assuming there are always 4 items in the data array
  const [stat1, stat2, stat3, stat4] = data;

  // Helper function to determine battery color
  const getBatteryColor = (stat) => (stat.ParameterValue === 'GOOD' ? 'green' : 'red');

  return (
    <div className="card d-flex flex-column h-100 w-100">
      <div className="card-header">
        <h3>Battery Health Status</h3>
      </div>
      <div className="card-body flex-fill">
        <div className="row">
          {stat1 && (
            <div className="col-12 col-md-6 mb-4">
              <div className="card p-3" style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <div className="d-flex flex-column align-items-center">
                  <div className="battery-container m-2">
                    <div className="battery" style={{ width: "80px", height: "110px", border: "2px solid #ccc", borderRadius: "5px", position: "relative" }}>
                      <div className="battery-level" style={{ height: '100%', background: getBatteryColor(stat1), position: "absolute", bottom: 0, width: "100%" }}></div>
                    </div>
                    <div className="battery-text mt-2">Battery 1</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {stat2 && (
            <div className="col-12 col-md-6 mb-4">
              <div className="card p-3" style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <div className="d-flex flex-column align-items-center">
                  <div className="battery-container m-2">
                    <div className="battery" style={{ width: "80px", height: "110px", border: "2px solid #ccc", borderRadius: "5px", position: "relative" }}>
                      <div className="battery-level" style={{ height: '100%', background: getBatteryColor(stat2), position: "absolute", bottom: 0, width: "100%" }}></div>
                    </div>
                    <div className="battery-text mt-2">Battery 2</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {stat3 && (
            <div className="col-12 col-md-6 mb-4">
              <div className="card p-3" style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <div className="d-flex flex-column align-items-center">
                  <div className="battery-container m-2">
                    <div className="battery" style={{ width: "80px", height: "110px", border: "2px solid #ccc", borderRadius: "5px", position: "relative" }}>
                      <div className="battery-level" style={{ height: '100%', background: getBatteryColor(stat3), position: "absolute", bottom: 0, width: "100%" }}></div>
                    </div>
                    <div className="battery-text mt-2">Battery 3</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {stat4 && (
            <div className="col-12 col-md-6 mb-4">
              <div className="card p-3" style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <div className="d-flex flex-column align-items-center">
                  <div className="battery-container m-2">
                    <div className="battery" style={{ width: "80px", height: "110px", border: "2px solid #ccc", borderRadius: "5px", position: "relative" }}>
                      <div className="battery-level" style={{ height: '100%', background: getBatteryColor(stat4), position: "absolute", bottom: 0, width: "100%" }}></div>
                    </div>
                    <div className="battery-text mt-2">Battery 4</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};




export default BatteryStats