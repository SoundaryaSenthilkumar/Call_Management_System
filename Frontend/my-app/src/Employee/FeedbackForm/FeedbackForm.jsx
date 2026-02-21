import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = ({ client, employeeId, onClose }) => {
  const [formData, setFormData] = useState({
    callAttended: "yes",
    callDuration: "",
    callDetails: "",
    clientAddress: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: client.client_id,
        employeeId: employeeId,
        callAttended: formData.callAttended,
        callDuration: formData.callDuration,
        callDetails: formData.callDetails,
        clientAddress: formData.clientAddress,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fb-overlay">
      <div className="fb-modal">
        <h3 className="fb-title">Send Feedback - {client.name}</h3>

        <form onSubmit={handleSubmit}>
          <div className="fb-group">
            <label>Client Name</label>
            <input type="text" className="fb-input" value={client.name} disabled />
          </div>

          <div className="fb-group">
            <label>Call Attended</label>
            <select
              className="fb-input"
              value={formData.callAttended}
              onChange={(e) =>
                setFormData({ ...formData, callAttended: e.target.value })
              }
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="fb-group">
            <label>Call Duration (minutes)</label>
            <input
              type="number"
              className="fb-input"
              value={formData.callDuration}
              onChange={(e) =>
                setFormData({ ...formData, callDuration: e.target.value })
              }
              required
            />
          </div>

          <div className="fb-group">
            <label>Call Details</label>
            <textarea
              className="fb-textarea"
              value={formData.callDetails}
              onChange={(e) =>
                setFormData({ ...formData, callDetails: e.target.value })
              }
              required
            />
          </div>

          <div className="fb-group">
            <label>Client Address</label>
            <textarea
              className="fb-textarea"
              value={formData.clientAddress}
              onChange={(e) =>
                setFormData({ ...formData, clientAddress: e.target.value })
              }
              required
            />
          </div>

          <div className="fb-btn-group">
            <button className="fb-cancel" type="button" onClick={onClose}>Cancel</button>
            <button className="fb-submit" type="submit">Submit</button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
