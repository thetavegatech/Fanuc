import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../View/form.css'


const CncMachineform = () => {
  const [machines, setMachines] = useState([]);
  const [formData, setFormData] = useState({
    machineId: '',
    organizationId: '',
    assetId: '',
    machineName: '',
    machineType: '',
    status: '',
    location: '',
    AssignedOperator: '',
    machineMake: '',
    machineModel: '',
    machineController: '',
    yearOfManufacturing: '',
    machineIP: '',
    spindleCount: '',
    batteryCount: '',
    machineCapacity: '',
    powerRating: '',
    machineCategory: '',
    otherDetails: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMachines();
  }, []);

  const orgid = "org5";

  const fetchMachines = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/machines/${orgid}`);
      setMachines(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5001/api/machines/machine/${editId}`, formData);
        alert('Record updated successfully'); // Success message for update
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5001/api/machines/register', formData);
        alert('Data saved successfully'); // Success message for creation
      }
      fetchMachines(); // Refresh machine list
      resetForm();
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving data');
    }
  };

  const resetForm = () => {
    setFormData({
      machineId: '',
      organizationId: '',
      assetId: '',
      machineName: '',
      machineType: '',
      status: '',
      location: '',
      AssignedOperator: '',
      machineMake: '',
      machineModel: '',
      machineController: '',
      yearOfManufacturing: '',
      machineIP: '',
      spindleCount: '',
      batteryCount: '',
      machineCapacity: '',
      powerRating: '',
      machineCategory: '',
      otherDetails: ''
    });
  };

  const handleEdit = (machine) => {
    setIsEditing(true);
    setEditId(machine.machineId);
    setFormData(machine);
    setShowForm(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5001/api/machines/machine/${id}`);
        alert('Record deleted successfully'); // Success message for deletion
        fetchMachines(); // Refresh machine list
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('An error occurred while deleting the record');
      }
    }
  };

  return (
    <div className="container3">
      <h2>Manage CNC Machines</h2>

      {/* Button to Show Form */}
      {!showForm && (
        <button className="btn btn-primary mb-4" onClick={() => setShowForm(true)}>
          Add Data
        </button>
      )}

      {/* Conditional Rendering: Form or Table */}
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div className="row">
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
                <label>Organization ID</label>
                <input
                  type="text"
                  name="organizationId"
                  className="underline-input"
                  value={formData.organizationId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Asset ID</label>
                <input
                  type="text"
                  name="assetId"
                  className="underline-input"
                  value={formData.assetId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

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
                <label>Machine Type</label>
                <input
                  type="text"
                  name="machineType"
                  className="underline-input"
                  value={formData.machineType}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  className="underline-input"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
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
              <div className="inline-form-group">
                <label>Assigned Operator</label>
                <input
                  type="text"
                  name="AssignedOperator"
                  className="underline-input"
                  value={formData.AssignedOperator}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Machine Make</label>
                <input
                  type="text"
                  name="machineMake"
                  className="underline-input"
                  value={formData.machineMake}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Machine Model</label>
                <input
                  type="text"
                  name="machineModel"
                  className="underline-input"
                  value={formData.machineModel}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Machine Controller</label>
                <input
                  type="text"
                  name="machineController"
                  className="underline-input"
                  value={formData.machineController}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Year of Manufacturing</label>
                <input
                  type="number"
                  name="yearOfManufacturing"
                  className="underline-input"
                  value={formData.yearOfManufacturing}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Machine IP</label>
                <input
                  type="text"
                  name="machineIP"
                  className="underline-input"
                  value={formData.machineIP}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Spindle Count</label>
                <input
                  type="number"
                  name="spindleCount"
                  className="underline-input"
                  value={formData.spindleCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Battery Count</label>
                <input
                  type="number"
                  name="batteryCount"
                  className="underline-input"
                  value={formData.batteryCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Machine Capacity</label>
                <input
                  type="text"
                  name="machineCapacity"
                  className="underline-input"
                  value={formData.machineCapacity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Power Rating</label>
                <input
                  type="text"
                  name="powerRating"
                  className="underline-input"
                  value={formData.powerRating}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Machine Category</label>
                <input
                  type="text"
                  name="machineCategory"
                  className="underline-input"
                  value={formData.machineCategory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="inline-form-group">
                <label>Other Details</label>
                <textarea
                  name="otherDetails"
                  className="underline-input"
                  rows="3"
                  value={formData.otherDetails}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Record' : 'Save Data'}
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Machine ID</th>
              <th>Organization ID</th>
              <th>Asset ID</th>
              <th>Machine Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {machines.map(machine => (
              <tr key={machine.machineId}>
                <td>{machine.machineId}</td>
                <td>{machine.organizationId}</td>
                <td>{machine.assetId}</td>
                <td>{machine.machineName}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(machine)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(machine.machineId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CncMachineform;
