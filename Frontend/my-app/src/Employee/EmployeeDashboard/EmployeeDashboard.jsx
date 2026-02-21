import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import "./EmployeeDashboard.css";

const EmployeeDashboard = ({ employeeId, employeeName, onLogout }) => {
  const [myTasks, setMyTasks] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (employeeId) {
      fetch(`http://localhost:5000/assign/employee/${employeeId}`)
        .then((res) => res.json())
        .then((data) => setMyTasks(data))
        .catch((err) => console.log(err));
    }
  }, [employeeId]);

  const handleSendFeedback = (client) => {
    setSelectedClient(client);
    setShowFeedbackForm(true);
  };

  const handleMarkCompleted = (assignmentId) => {
    fetch(`http://localhost:5000/assign/status/${assignmentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Task marked as completed!");
        fetch(`http://localhost:5000/assign/employee/${employeeId}`)
          .then((res) => res.json())
          .then((data) => setMyTasks(data));
      })
      .catch(() => alert("Failed to update status"));
  };

  const totalTasks = myTasks.length;
  const completedTasks = myTasks.filter((t) => t.status === "completed").length;
  const pendingTasks = myTasks.filter((t) => t.status === "pending").length;

  return (
    <div className="employee-dashboard-bg">
      <div className="employee-dashboard-overlay">

        {/* Sidebar */}
        <div className="emp-sidebar">
          <h2 className="emp-logo">EMS</h2>
          <ul className="emp-menu">
            <li>Dashboard</li>
            <li>My Profile</li>
            <li>Attendance</li>
            <li>Tasks</li>
            <li>Settings</li>
          </ul>
        </div>

        {/* Main */}
        <div className="emp-main">
          <div className="emp-header">
            <h2>Welcome, {employeeName} </h2>
            <button className="emp-logout" onClick={onLogout}>Logout</button>
          </div>

          {/* Summary Cards */}
          <div className="emp-card-container">
            <div className="emp-card">
              <h4>Total Tasks</h4>
              <p>{totalTasks}</p>
            </div>

            <div className="emp-card">
              <h4>Completed</h4>
              <p>{completedTasks}</p>
            </div>

            <div className="emp-card">
              <h4>Pending</h4>
              <p>{pendingTasks}</p>
            </div>
          </div>

          {/* Tasks Table */}
          <h3 style={{ marginTop: "30px" }}>Assigned Clients</h3>

          {myTasks.length === 0 ? (
            <p>No clients assigned yet.</p>
          ) : (
            <table className="emp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {myTasks.map((task, idx) => (
                  <tr key={idx}>
                    <td>{task.name}</td>
                    <td>{task.email}</td>
                    <td>{task.phone}</td>
                    <td>
                      <span
                        className={
                          task.status === "completed"
                            ? "emp-badge-completed"
                            : "emp-badge-pending"
                        }
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      {task.status !== "completed" && (
                        <button
                          className="emp-complete-btn"
                          onClick={() =>
                            handleMarkCompleted(task.assignment_id)
                          }
                        >
                          Mark Completed
                        </button>
                      )}

                      <button
                        className="emp-feedback-btn"
                        onClick={() => handleSendFeedback(task)}
                      >
                        Send Feedback
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {showFeedbackForm && selectedClient && (
            <FeedbackForm
              client={selectedClient}
              employeeId={employeeId}
              onClose={() => setShowFeedbackForm(false)}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
