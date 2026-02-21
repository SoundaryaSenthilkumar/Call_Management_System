import React, { useState, useEffect } from "react";

import "./AdminDashboard.css";
import AssignTask from "../AssignTask/AssignTask";
import FeedbackList from "../FeedbackList/FeedbackList";
import EmployeeManagement from "../EmployeeManagement/EmployeeManagement";
import Analytics from "../Analytics/Analytics";

const AdminDashboard = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalClients: 0,
    totalAssignments: 0,
    completedTasks: 0,
    notifications: 0,
  });

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = () => {
    Promise.all([
      fetch("http://localhost:5000/employees").then((r) => r.json()),
      fetch("http://localhost:5000/clients").then((r) => r.json()),
      fetch("http://localhost:5000/assign/all").then((r) => r.json()),
    ])
      .then(([employees, clients, assignments]) => {
        setStats({
          totalEmployees: employees.length,
          totalClients: clients.length,
          totalAssignments: assignments.length,
          completedTasks: assignments.filter((a) => a.status === "completed").length,
          notifications: assignments.length,
        });
      })
      .catch((err) => console.log(err));
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <div>
            <div className="glass-card-container">
              <div className="glass-card">
                <div className="icon">👥</div>
                <div>
                  <h4>Total Employees</h4>
                  <p>{stats.totalEmployees}</p>
                </div>
              </div>

              <div className="glass-card">
                <div className="icon">👤</div>
                <div>
                  <h4>Total Clients</h4>
                  <p>{stats.totalClients}</p>
                </div>
              </div>

              <div className="glass-card">
                <div className="icon">📋</div>
                <div>
                  <h4>Assigned Tasks</h4>
                  <p>{stats.totalAssignments}</p>
                </div>
              </div>

              <div className="glass-card">
                <div className="icon">✅</div>
                <div>
                  <h4>Completed</h4>
                  <p>{stats.completedTasks}</p>
                </div>
              </div>
            </div>

            <div className="glass-welcome">
              <h3>✨ Welcome to Admin Dashboard</h3>
              <p>Manage employees, assign tasks & monitor feedback easily.</p>
            </div>
          </div>
        );

      case "employees":
        return <EmployeeManagement onEmployeeChange={fetchStats} />;

      case "assignTask":
        return <AssignTask onTaskAssigned={fetchStats} />;

      case "feedback":
        return <FeedbackList />;

      case "analytics":
        return <Analytics />;

      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2 className="logo">Admin Panel</h2>
        <ul className="menu">
          <li
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
             Dashboard
          </li>

          <li
            className={activeMenu === "employees" ? "active" : ""}
            onClick={() => setActiveMenu("employees")}
          >
           Employees
          </li>

          <li
            className={activeMenu === "assignTask" ? "active" : ""}
            onClick={() => setActiveMenu("assignTask")}
          >
             Assign Task
          </li>

          <li
            className={activeMenu === "feedback" ? "active" : ""}
            onClick={() => setActiveMenu("feedback")}
          >
           Feedback Forms
          </li>

          <li
            className={activeMenu === "analytics" ? "active" : ""}
            onClick={() => setActiveMenu("analytics")}
          >
             Analytics
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h3>Welcome, Admin </h3>

          <div className="header-right">
            <div className="bell">
              🔔
              {stats.notifications > 0 && <span className="badge">{stats.notifications}</span>}
            </div>

            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
