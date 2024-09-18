import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BreakdownForm = () => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [formData, setFormData] = useState({
    machineName: '',
    machineId: '',
    breakdownReason: '',
    breakdownStartDateTime: '',
    breakdownEndDateTime: '',
    assignedTechnician: '',
    remark: '',
    shift: '',
    lineName: '',
    operations: '',
    breakdownPhenomenons: '',
    breakdownType: '',
    actionTaken: '',
    whyWhyAnalysis: '',
    rootCause: '',
    targetDate: '',
    responsibility: '',
    hd: '',
    status: 'open',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [machineIds, setMachineIds] = useState([]);
  const [techNames, setTechNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mid = "MACHINE4"; // Example machineId, can be dynamic

  useEffect(() => {
    fetchBreakdowns();
    fetchMachineData();
    fetchTechnicianNames();
  }, []);

  const fetchBreakdowns = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/breakdowns`);
      setBreakdowns(response.data);
    } catch (error) {
      console.error('Error fetching breakdown data:', error);
    }
  };

  const fetchMachineData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/machines/ORG001');
      const machineIds = response.data.map(machine => machine.machineId);
      setMachineIds(machineIds);
      setLoading(false);
    } catch (err) {
      setError('Error fetching machine data');
      setLoading(false);
    }
  };

  const fetchTechnicianNames = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workforce');
      setTechNames(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching technician names');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/breakdowns/${editId}`, formData);
        setIsEditing(false);
        setEditId(null);
        window.alert('Record updated successfully!');
      } else {
        await axios.post('http://localhost:5001/api/breakdowns', formData);
        window.alert('Record created successfully!');
      }
      fetchBreakdowns(); // Refresh breakdown list
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      machineName: '',
      machineId: '',
      breakdownReason: '',
      breakdownStartDateTime: '',
      breakdownEndDateTime: '',
      assignedTechnician: '',
      remark: '',
      shift: '',
      lineName: '',
      operations: '',
      breakdownPhenomenons: '',
      breakdownType: '',
      actionTaken: '',
      whyWhyAnalysis: '',
      rootCause: '',
      targetDate: '',
      responsibility: '',
      hd: '',
      status: 'open',
      location: ''
    });
  };

  const handleEdit = (breakdown) => {
    setIsEditing(true);
    setEditId(breakdown._id);

    // Function to convert UTC date-time to local date-time
    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDateTime.toISOString().slice(0, 16);
    };

    // Convert local date to 'YYYY-MM-DD'
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString().slice(0, 10);
    };

    setFormData({
      ...breakdown,
      breakdownStartDateTime: breakdown.breakdownStartDateTime ? formatDateTime(breakdown.breakdownStartDateTime) : '',
      breakdownEndDateTime: breakdown.breakdownEndDateTime ? formatDateTime(breakdown.breakdownEndDateTime) : '',
      targetDate: breakdown.targetDate ? formatDate(breakdown.targetDate) : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5001/api/breakdowns/${id}`);
        window.alert('Record deleted successfully!');
        fetchBreakdowns(); // Refresh breakdown list
      } catch (error) {
        console.error('Error deleting breakdown:', error);
      }
    }
  };

  return (
    <div className="container3">
    <h2 className="mb-4">Manage Breakdowns</h2>

    {/* Button to Add Breakdown */}
    <button className="btn btn-primary mb-4" onClick={() => { setShowForm(true); setIsEditing(false); }}>
      Add Breakdown
    </button>

    {/* Form to Add/Edit Breakdown */}
    {showForm && (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Machine Name</label>
              <input
                type="text"
                name="machineName"
                className="underline-input"
                value={formData.machineName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Machine ID</label>

              {/* Loading state */}
              {loading ? (
                <p>Loading machine IDs...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <select
                  name="machineId"
                  style={{ marginTop: "1rem"}}
                  className="underline-input"
                  value={formData.machineId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Machine ID</option>
                  {machineIds.map((id, index) => (
                    <option key={index} value={id}>{id}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Breakdown Reason</label>
              <input
                type="text"
                name="breakdownReason"
                className="underline-input"
                value={formData.breakdownReason}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Breakdown Start Date</label>
              <input
                type="datetime-local"
                name="breakdownStartDateTime"
                className="underline-input"
                value={formData.breakdownStartDateTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Breakdown End Date</label>
              <input
                type="datetime-local"
                name="breakdownEndDateTime"
                className="underline-input"
                value={formData.breakdownEndDateTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                className="underline-input"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            {/* No changes needed */}
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Assigned Technician</label>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <select
                  name="assignedTechnician"
                  style={{ marginTop: "1rem"}}
                  className="underline-input"
                  value={formData.assignedTechnician}
                  onChange={handleInputChange}
                >
                  <option value="">Select a technician</option>
                  {techNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Remark</label>
              <input
                type="text"
                name="remark"
                className="underline-input"
                value={formData.remark}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Shift</label>
              <input
                type="text"
                name="shift"
                className="underline-input"
                value={formData.shift}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="row">
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Line Name</label>
              <input
                type="text"
                name="lineName"
                className="underline-input"
                value={formData.lineName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Operations</label>
              <input
                type="text"
                name="operations"
                className="underline-input"
                value={formData.operations}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Breakdown Phenomenons</label>
              <input
                type="text"
                name="breakdownPhenomenons"
                className="underline-input"
                value={formData.breakdownPhenomenons}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="row">
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Breakdown Type</label>
              <select
                name="breakdownType"
                style={{ marginTop: "1rem"}}
                className="underline-input"
                value={formData.breakdownType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Breakdown Type</option>
                <option value="Mechanical Failure">Mechanical Failure</option>
                <option value="Electrical Failure">Electrical Failure</option>
                <option value="Software Glitch">Software Glitch</option>
                <option value="Overheating">Overheating</option>
                <option value="Sensor Malfunction">Sensor Malfunction</option>
                <option value="Power Supply Issue">Power Supply Issue</option>
                <option value="Motor Failure">Motor Failure</option>
                <option value="Hydraulic Failure">Hydraulic Failure</option>
                <option value="Pneumatic Failure">Pneumatic Failure</option>
                <option value="Human Error">Human Error</option>
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Action Taken</label>
              <input
                type="text"
                name="actionTaken"
                className="underline-input"
                value={formData.actionTaken}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Why-Why Analysis</label>
              <input
                type="text"
                name="whyWhyAnalysis"
                className="underline-input"
                value={formData.whyWhyAnalysis}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="row">
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Root Cause</label>
              <input
                type="text"
                name="rootCause"
                className="underline-input"
                value={formData.rootCause}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Target Date</label>
              <input
                type="date"
                name="targetDate"
                className="underline-input"
                value={formData.targetDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Responsibility</label>
              <input
                type="text"
                name="responsibility"
                className="underline-input"
                value={formData.responsibility}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="row">
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>HD</label>
              <input
                type="text"
                name="hd"
                className="underline-input"
                value={formData.hd}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="inline-form-group">
              <label>Status</label>
              <select
                name="status"
                style={{ marginTop: "1rem"}}
                className="underline-input"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="inline-form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                className="underline-input"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div> */}
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {isEditing ? 'Update Breakdown' : 'Add Breakdown'}
        </button>
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => { resetForm(); setShowForm(false); }}
        >
          Cancel
        </button>
      </form>
    )}

    {/* Breakdown List */}
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Machine Name</th>
          <th>Machine ID</th>
          <th>Breakdown Reason</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Technician</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {breakdowns.map((breakdown) => (
          <tr key={breakdown._id}>
            <td>{breakdown.machineName}</td>
            <td>{breakdown.machineId}</td>
            <td>{breakdown.breakdownReason}</td>
            <td>{new Date(breakdown.breakdownStartDateTime).toLocaleString()}</td>
            <td>{new Date(breakdown.breakdownEndDateTime).toLocaleString()}</td>
            <td>{breakdown.assignedTechnician}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(breakdown)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => handleDelete(breakdown._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default BreakdownForm;
