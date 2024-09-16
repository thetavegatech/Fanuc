// components/WorkForceManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkForceForm = () => {
  const [workforces, setWorkforces] = useState([]);
  const [formData, setFormData] = useState({
    EmpName: '',
    EmpEmail: '',
    EmpPhone: '',
    Role: '',
    Skills: '',
    Performance: '',
    TokenNo: '',
    AssignMachine: '',
    SkillId: '',
    EmpId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // New state to toggle form visibility

  useEffect(() => {
    fetchWorkforces();
  }, []);

  const fetchWorkforces = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workforce');
      setWorkforces(response.data);
    } catch (error) {
      console.error('Error fetching workforce data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/workforce/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/workforce', formData);
    }
    fetchWorkforces(); // Refresh workforce list
    resetForm();
    setShowForm(false); // Hide form after submission
  };

  const resetForm = () => {
    setFormData({
      EmpName: '',
      EmpEmail: '',
      EmpPhone: '',
      Role: '',
      Skills: '',
      Performance: '',
      TokenNo: '',
      AssignMachine: '',
      SkillId: '',
      EmpId: ''
    });
  };

  const handleEdit = (workforce) => {
    setIsEditing(true);
    setEditId(workforce._id);
    setFormData(workforce);
    setShowForm(true); // Show form when editing
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/workforce/${id}`);
    fetchWorkforces(); // Refresh workforce list
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setEditId(null);
    resetForm();
    setShowForm(true); // Show form when adding a new workforce
  };

  return (
    <div className="container3">
      <h2>Manage WorkForce</h2>

      {/* Button to Add New Workforce */}
      {!showForm && (
        <button className="btn btn-primary mb-2" onClick={handleAddClick}>
          Add New WorkForce
        </button>
      )}

      {/* Conditionally render form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="EmpName"
                  className="underline-input"
                  value={formData.EmpName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Employee Email</label>
                <input
                  type="email"
                  name="EmpEmail"
                  className="underline-input"
                  value={formData.EmpEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Employee Phone</label>
                <input
                  type="text"
                  name="EmpPhone"
                  className="underline-input"
                  value={formData.EmpPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Role</label>
                <input
                  type="text"
                  name="Role"
                  className="underline-input"
                  value={formData.Role}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Skills</label>
                <input
                  type="text"
                  name="Skills"
                  className="underline-input"
                  value={formData.Skills}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Performance</label>
                <input
                  type="text"
                  name="Performance"
                  className="underline-input"
                  value={formData.Performance}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Token No</label>
                <input
                  type="text"
                  name="TokenNo"
                  className="underline-input"
                  value={formData.TokenNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Assign Machine</label>
                <input
                  type="text"
                  name="AssignMachine"
                  className="underline-input"
                  value={formData.AssignMachine}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Skill ID</label>
                <input
                  type="text"
                  name="SkillId"
                  className="underline-input"
                  value={formData.SkillId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="inline-form-group">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="EmpId"
                  className="underline-input"
                  value={formData.EmpId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update WorkForce' : 'Add WorkForce'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Display Table of Workforces */}
      {!showForm && (
        <>
          {/* <h  2 className="mt-5">WorkForce List</h2> */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Performance</th>
                <th>Token No</th>
                <th>Assign Machine</th>
                <th>Skill ID</th>
                {/* <th>Employee ID</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workforces.map((workforce) => (
                <tr key={workforce._id}>
                  <td>{workforce.EmpName}</td>
                  <td>{workforce.EmpEmail}</td>
                  <td>{workforce.EmpPhone}</td>
                  <td>{workforce.Role}</td>
                  <td>{workforce.Skills}</td>
                  <td>{workforce.Performance}</td>
                  <td>{workforce.TokenNo}</td>
                  <td>{workforce.AssignMachine}</td>
                  <td>{workforce.SkillId}</td>
                  {/* <td>{workforce.EmpId}</td> */}
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(workforce)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm "
                      onClick={() => handleDelete(workforce._id)}
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

export default WorkForceForm;
