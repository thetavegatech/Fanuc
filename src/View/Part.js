import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PartForm = () => {
  const [parts, setParts] = useState([]);
  const [formData, setFormData] = useState({
    PartName: '',
    PartDescription: '',
    machineId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch parts data on component mount
  useEffect(() => {
    fetchParts();
  }, []);

  const mid = "101";

  const fetchParts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/part`);
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching part data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5001/api/part/update/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5001/api/part/create', formData);
    }
    fetchParts(); // Refresh parts list
    resetForm();
    setShowForm(false); // Hide form after submission
  };

  const resetForm = () => {
    setFormData({
      PartName: '',
      PartDescription: '',
      machineId: ''
    });
  };

  const handleEdit = (part) => {
    setIsEditing(true);
    setEditId(part._id);
    setFormData(part);
    setShowForm(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/part/delete/${id}`);
    fetchParts(); // Refresh parts list
  };

  const handleAdd = () => {
    setIsEditing(false);
    setEditId(null);
    resetForm();
    setShowForm(true); // Show form for adding
  };

  return (
    <div className="container3">
      <h2 className="mb-4 " style={{ marginLeft: "1rem"}} >Manage Parts</h2>

      {/* Button to Add New Part */}
      {!showForm && (
        <div className="d-flex mb-3">
          <button className="btn btn-primary" style={{ marginLeft: "1rem"}} onClick={handleAdd}>
            Add New Part
          </button>
        </div>
      )}

      {/* Conditionally Render Form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginLeft: "1rem"}} className="row">
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label htmlFor="partName">Part Name</label>
                <input
                  type="text"
                  id="partName"
                  name="PartName"
                  className="underline-input"
                  value={formData.PartName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label htmlFor="partDescription">Part Description</label>
                <input
                  type="text"
                  id="partDescription"
                  name="PartDescription"
                  className="underline-input"
                  value={formData.PartDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label htmlFor="machineId">Machine ID</label>
                <input
                  type="text"
                  id="machineId"
                  name="machineId"
                  className="underline-input"
                  value={formData.machineId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Part' : 'Add Part'}
            </button>
          </div>
        </form>
      )}

      {/* Display Table of Parts */}
      {/* <h2 className="mt-5" style={{ marginLeft: "1rem"}}>Parts List</h2> */}
      <div style={{ marginLeft: "1rem"}} className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Part Name</th>
              <th>Part Description</th>
              <th>Machine ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part._id}>
                <td>{part.PartName}</td>
                <td>{part.PartDescription}</td>
                <td>{part.machineId}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(part)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(part._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartForm;
