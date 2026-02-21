import React, { useState, useEffect } from "react";
import FeedbackList from "../FeedbackList/FeedbackList";
import Analytics from "../Analytics/Analytics";

const ManagerDashboard = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (activeMenu === "dashboard") {
      fetchAssignments();
    }
  }, [activeMenu]);

  const fetchAssignments = () => {
    fetch("http://localhost:5000/assign/all")
      .then((res) => res.json())
      .then((data) => setAssignments(data))
      .catch((err) => console.log(err));
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "feedback":
        return (
          <div style={styles.feedbackWrapper}>
            <FeedbackList />
          </div>
        );

      case "analytics":
        return <Analytics />;

      default:
        return (
          <div>
            <h3 style={{ marginBottom: "20px", color: "white" }}>
              Assigned Tasks Overview
            </h3>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Assigned Date</th>
                </tr>
              </thead>

              <tbody>
                {assignments.map((task) => (
                  <tr key={task.id} style={styles.tableRow}>
                    <td style={styles.td}>{task.employee_name}</td>
                    <td style={styles.td}>{task.client_name}</td>
                    <td style={styles.td}>{task.email}</td>
                    <td style={styles.td}>{task.phone}</td>

                    <td style={styles.td}>
                      <span
                        style={
                          task.status === "completed"
                            ? styles.completed
                            : styles.pending
                        }
                      >
                        {task.status === "completed"
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {new Date(task.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Manager Panel</h2>

        <ul style={styles.menu}>
          <li
            style={styles.menuItem}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </li>

          <li
            style={styles.menuItem}
            onClick={() => setActiveMenu("feedback")}
          >
            Feedback Forms
          </li>

          <li
            style={styles.menuItem}
            onClick={() => setActiveMenu("analytics")}
          >
           Analytics
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h3 style={{ color: "white" }}>Welcome, Manager </h3>
          <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
        </div>

        <div style={styles.glassContent}>{renderContent()}</div>
      </div>
    </div>
  );
};

// ============ STYLES ============

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundImage: "url('https://wallpaperaccess.com/full/317501.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },

  sidebar: {
    width: "240px",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    padding: "20px",
    zIndex: 2,
    backdropFilter: "blur(10px)",
    borderRight: "1px solid rgba(255,255,255,0.2)",
  },

  logo: {
    marginBottom: "30px",
    fontSize: "22px",
    fontWeight: "bold",
  },

  menu: {
    listStyle: "none",
    padding: 0,
  },

  menuItem: {
    marginBottom: "15px",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.1)",
    transition: "0.3s",
    color: "white",
  },

  main: {
    flex: 1,
    padding: "20px",
    zIndex: 2,
    color: "white",
    overflowY: "auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logoutBtn: {
    padding: "8px 14px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  glassContent: {
    background: "rgba(255,255,255,0.12)",
    padding: "25px",
    borderRadius: "15px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  feedbackWrapper: {
    //background: "transparent",
    padding: "10px",
  },

  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
    color: "#fff",
  },

  tableRow: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(6px)",
    borderRadius: "10px",
  },

  td: {
    padding: "12px",
  },

  completed: {
    padding: "6px 12px",
    backgroundColor: "#10b981",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "13px",
  },

  pending: {
    padding: "6px 12px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "13px",
  },
};

export default ManagerDashboard;
