import React, { useState, useEffect } from "react";
import "./Analytics.css";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    tasksByStatus: { completed: 0, pending: 0 },
    employeePerformance: [],
    recentActivity: [],
    completionRate: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = () => {
    Promise.all([
      fetch("http://localhost:5000/assign/all").then((r) => r.json()),
      fetch("http://localhost:5000/employees").then((r) => r.json()),
    ])
      .then(([assignments, employees]) => {
        const completed = assignments.filter((a) => a.status === "completed").length;
        const pending = assignments.filter((a) => a.status === "pending").length;
        
        const empPerformance = employees.map((emp) => ({
          name: emp.name,
          tasksCompleted: assignments.filter(
            (a) => a.employee_id === emp.id && a.status === "completed"
          ).length,
          totalTasks: assignments.filter((a) => a.employee_id === emp.id).length,
        }));

        setAnalytics({
          tasksByStatus: { completed, pending },
          employeePerformance: empPerformance.filter((e) => e.totalTasks > 0),
          recentActivity: assignments.slice(-5).reverse(),
          completionRate: assignments.length > 0 ? ((completed / assignments.length) * 100).toFixed(1) : 0,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📊 Analytics Dashboard</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Task Status Distribution</h3>
          <div className="chart-container">
            <div className="pie-chart">
              <div
                className="pie-segment"
                style={{
                  background: `conic-gradient(
                    #10b981 0deg ${(analytics.tasksByStatus.completed / (analytics.tasksByStatus.completed + analytics.tasksByStatus.pending || 1)) * 360}deg,
                    #f59e0b ${(analytics.tasksByStatus.completed / (analytics.tasksByStatus.completed + analytics.tasksByStatus.pending || 1)) * 360}deg 360deg
                  )`,
                }}
              ></div>
              <div className="pie-center">
                <p className="completion-rate">{analytics.completionRate}%</p>
                <p className="completion-label">Completed</p>
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <span className="legend-color completed"></span>
                <span>Completed: {analytics.tasksByStatus.completed}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color pending"></span>
                <span>Pending: {analytics.tasksByStatus.pending}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Employee Performance</h3>
          <div className="performance-list">
            {analytics.employeePerformance.map((emp, idx) => (
              <div key={idx} className="performance-item">
                <div className="emp-info">
                  <span className="emp-name">{emp.name}</span>
                  <span className="emp-stats">
                    {emp.tasksCompleted}/{emp.totalTasks} tasks
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(emp.tasksCompleted / emp.totalTasks) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card full-width">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {analytics.recentActivity.map((activity, idx) => (
              <div key={idx} className="activity-item">
                <span className="activity-icon">📋</span>
                <div className="activity-details">
                  <p className="activity-text">
                    Task assigned to {activity.employee_name}
                  </p>
                  <p className="activity-date">
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={`activity-status ${activity.status}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
