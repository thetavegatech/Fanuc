import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DowntimeForm = () => {
  const [machines, setMachines] = useState([]);
  const [downtimes, setDowntimes] = useState([]);
  const [formData, setFormData] = useState({
    machineId: "",
    assignedTechnician: "",
    shift: "",
    lineName: "",
    location: "",
    DownStartDateTime: "",
    DownEndDateTime: "",
    remark: "",
    actionTaken: "",
    DownTimeReason: "",
  });
  const [showForm, setShowForm] = useState(false);

  const downtimeReasons = [
    { id: 1, reason: "Planned Maintenance" },
    { id: 2, reason: "Unplanned Maintenance" },
    // Add remaining reasons here...
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/productionalldata")
      .then((response) => {
        console.log("Machines Data:", response.data); // Log the response to check structure
        setMachines(response.data);
      })
      .catch((error) => console.error("Error fetching machines:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/downtime")
      .then((response) => setDowntimes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/downtime", formData)
      .then((response) => {
        console.log("Saved Downtime Record:", response.data);
        setDowntimes([...downtimes, response.data]); // Add new downtime to table
        setShowForm(false); // Hide form after submission
        setFormData({
          machineId: "",
          assignedTechnician: "",
          shift: "",
          lineName: "",
          location: "",
          DownStartDateTime: "",
          DownEndDateTime: "",
          remark: "",
          actionTaken: "",
          DownTimeReason: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (downtime) => {
    setFormData({
      machineId: downtime.machineId,
      assignedTechnician: downtime.assignedTechnician,
      shift: downtime.shift,
      lineName: downtime.lineName,
      location: downtime.location,
      DownStartDateTime: downtime.DownStartDateTime,
      DownEndDateTime: downtime.DownEndDateTime,
      remark: downtime.remark,
      actionTaken: downtime.actionTaken,
      DownTimeReason: downtime.DownTimeReason,
    });
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this downtime record?")
    ) {
      axios
        .delete(`http://localhost:5001/api/downtime/${id}`)
        .then(() => {
          setDowntimes(downtimes.filter((downtime) => downtime._id !== id)); // Update state to remove deleted downtime
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div
      className="container rounded p-5"
      style={{ backgroundColor: "#f9f9f9", marginTop: "5rem" }}
    >
      <h2 className="mb-1">Manage Downtime Records</h2>
      {!showForm && (
        <div className="row mb-4">
          <div className="col-12 text-start">
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add Downtime
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label>Machine ID</label>
                <select
                  name="machineId"
                  className="form-control underline-input"
                  value={formData.machineId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Machine</option>
                  {machines.length > 0 &&
                    machines.map((machine) => (
                      <option key={machine._id} value={machine.machineId}>
                        {machine.machineId} {/* Display machine name */}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label>Downtime Reason</label>
                <select
                  name="DownTimeReason" // Make sure this matches the state key
                  className="form-control underline-input"
                  value={formData.DownTimeReason} // This should match the state key
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Reason</option>
                  {downtimeReasons.map((reason) => (
                    <option key={reason.id} value={reason.reason}>
                      {reason.reason}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label>Assigned Technician</label>
                <input
                  type="text"
                  name="assignedTechnician"
                  className="form-control underline-input"
                  value={formData.assignedTechnician}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label>Shift</label>
                <input
                  type="text"
                  name="shift"
                  className="form-control underline-input"
                  value={formData.shift}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label>Line Name</label>
                <input
                  type="text"
                  name="lineName"
                  className="form-control underline-input"
                  value={formData.lineName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="inline-form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control underline-input"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="inline-form-group">
                <label>Downtime Start</label>
                <input
                  type="datetime-local"
                  name="DownStartDateTime"
                  className="form-control underline-input"
                  value={formData.DownStartDateTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="inline-form-group">
                <label>Downtime End</label>
                <input
                  type="datetime-local"
                  name="DownEndDateTime"
                  className="form-control underline-input"
                  value={formData.DownEndDateTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="inline-form-group">
                <label>Remark</label>
                <input
                  type="text"
                  name="remark"
                  className="form-control underline-input"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="inline-form-group">
                <label>Action Taken</label>
                <input
                  type="text"
                  name="actionTaken"
                  className="form-control underline-input"
                  value={formData.actionTaken}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Save Downtime
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Downtime Records Table - This will be hidden when the form is displayed */}
      {!showForm && (
        <div className="row mt-4">
          <div className="col-12">
            {/* <h4>Downtime Records</h4> */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover mt-3">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Machine ID</th>
                    <th scope="col">Assigned Technician</th>
                    <th scope="col">Downtime Reason</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {downtimes.length > 0 ? (
                    downtimes.map((downtime) => (
                      <tr key={downtime._id}>
                        <td>{downtime.machineId}</td>
                        <td>{downtime.assignedTechnician}</td>
                        <td>{downtime.DownTimeReason}</td>
                        <td>
                          {new Date(
                            downtime.DownStartDateTime
                          ).toLocaleString()}
                        </td>
                        <td>
                          {new Date(downtime.DownEndDateTime).toLocaleString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(downtime)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(downtime._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No downtime records available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DowntimeForm;
