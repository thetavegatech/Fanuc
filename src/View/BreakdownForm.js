import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BreakdownForm = () => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [formData, setFormData] = useState({
    machineName: '',
    machineId: '',
    breakdownReason: '',
    breakdownStartDate: '',
    breakdownEndDate: '',
    breakdownStartTime: '',
    breakdownEndTime: '',
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

  // Fetch breakdown data on component mount
  useEffect(() => {
    fetchBreakdowns();
  }, []);

  const mid = "101";

  const fetchBreakdowns = async () => {
    try {
      // const response = await axios.get(`http://localhost:5001/api/breakdowns?machineId=${mid}`);
      const response = await axios.get(`http://localhost:5001/api/breakdowns`);

      setBreakdowns(response.data);
    } catch (error) {
      console.error('Error fetching breakdown data:', error);
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
      } else {
        await axios.post('http://localhost:5001/api/breakdowns', formData);
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
      breakdownStartDate: '',
      breakdownEndDate: '',
      breakdownStartTime: '',
      breakdownEndTime: '',
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
    setFormData(breakdown);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/breakdowns/${id}`);
      fetchBreakdowns(); // Refresh breakdown list
    } catch (error) {
      console.error('Error deleting breakdown:', error);
    }
  };

  return (
    <div className="container3">
      <h2 >Manage Breakdowns</h2>

      {/* Button to Add Breakdown */}
      {!showForm && (
      <button className="btn btn-primary mb-2" onClick={() => { setShowForm(true); setIsEditing(false); }}>
        Add Breakdown
      </button>
      )}

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
                <input
                  type="text"
                  name="machineId"
                  className="underline-input"
                  value={formData.machineId}
                  onChange={handleInputChange}
                  required
                />
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
                  type="date"
                  name="breakdownStartDate"
                  className="underline-input"
                  value={formData.breakdownStartDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Breakdown End Date</label>
                <input
                  type="date"
                  name="breakdownEndDate"
                  className="underline-input"
                  value={formData.breakdownEndDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Breakdown Start Time</label>
                <input
                  type="text"
                  name="breakdownStartTime"
                  className="underline-input"
                  value={formData.breakdownStartTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Breakdown End Time</label>
                <input
                  type="text"
                  name="breakdownEndTime"
                  className="underline-input"
                  value={formData.breakdownEndTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Assigned Technician</label>
                <input
                  type="text"
                  name="assignedTechnician"
                  className="underline-input"
                  value={formData.assignedTechnician}
                  onChange={handleInputChange}
                  required
                />
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
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Shift</label>
                <input
                  type="text"
                  name="shift"
                  className="underline-input"
                  value={formData.shift}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Line Name</label>
                <input
                  type="text"
                  name="lineName"
                  className="underline-input"
                  value={formData.lineName}
                  onChange={handleInputChange}
                  required
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
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Breakdown Phenomenons</label>
                <input
                  type="text"
                  name="breakdownPhenomenons"
                  className="underline-input"
                  value={formData.breakdownPhenomenons}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Breakdown Type</label>
                <input
                  type="text"
                  name="breakdownType"
                  className="underline-input"
                  value={formData.breakdownType}
                  onChange={handleInputChange}
                  required
                />
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
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
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
          </div>

          <div className="row">
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
                  className="underline-input"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={{
                    top: "10px",
                    padding: "10px", // Increase padding for better height
                    height: "48px",  // Set a custom height
                  }}
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="inline-form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className="underline-input"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Breakdown' : 'Add Breakdown'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              resetForm();
              setShowForm(false);
              setIsEditing(false);
              setEditId(null);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Display Table of Breakdowns */}
      {!showForm && (
        <>
          {/* <h2 className="mt-5">Breakdown List</h2> */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Machine Name</th>
                <th>Machine ID</th>
                <th>Breakdown Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {breakdowns.map((breakdown) => (
                <tr key={breakdown._id}>
                  <td>{breakdown.machineName}</td>
                  <td>{breakdown.machineId}</td>
                  <td>{breakdown.breakdownReason}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(breakdown)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(breakdown._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BreakdownForm;
