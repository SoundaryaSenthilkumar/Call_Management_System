import React, { useState, useEffect } from "react";
import "./FeedbackList.css";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    fetch("http://localhost:5000/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="feedback-container">
      <h2>Feedback Forms</h2>

      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback submitted yet.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Employee</th>
              <th>Call Attended</th>
              <th>Duration (min)</th>
              <th>Details</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.client_name}</td>
                <td>{fb.email}</td>
                <td>{fb.phone}</td>
                <td>{fb.employee_name}</td>
                <td>{fb.call_attended}</td>
                <td>{fb.call_duration}</td>
                <td>{fb.call_details}</td>
                <td>{fb.client_address}</td>
                <td>{new Date(fb.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackList;
