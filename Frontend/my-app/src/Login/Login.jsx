import React, { useState } from "react";
import EmployeeDashboard from "../Employee/EmployeeDashboard/EmployeeDashboard";
import ManagerDashboard from "../Manager/ManagerDashboard/ManagerDashboard";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((employees) => {
        const user = employees.find(
          (emp) => emp.email === email && emp.password === password
        );
        if (user) {
          setLoggedInUser(user);
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed!");
      });
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setEmail("");
    setPassword("");
  };

  // Redirect based on role
  if (loggedInUser) {
    if (loggedInUser.role === "employee")
      return (
        <EmployeeDashboard
          employeeId={loggedInUser.id}
          employeeName={loggedInUser.name}
          onLogout={handleLogout}
        />
      );
    if (loggedInUser.role === "manager") return <ManagerDashboard onLogout={handleLogout} />;
    if (loggedInUser.role === "admin") return <AdminDashboard onLogout={handleLogout} />;
  }

  // Login screen UI
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      {/* Left Branding Section */}
      <div style={styles.leftPanel}>
        <div style={styles.brandBox}>
          <h1 style={styles.brandTitle}>Call Management System</h1>
          <p style={styles.brandSubtitle}>
            Streamline your workforce with ease
          </p>
        </div>
      </div>

      {/* Right Glass Login Card */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <div style={styles.logoCircle}>🔐</div>

          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please login to your account</p>

          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />

          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>

          
        </div>
      </div>
    </div>
  );
};

// ==================== STYLES ====================

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundImage: "url('https://wallpaperaccess.com/full/317501.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
  },

  leftPanel: {
    flex: 1,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },

  brandBox: {
    textAlign: "center",
    color: "#fff",
    textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
  },

  brandTitle: {
    fontSize: "46px",
    fontWeight: "700",
    marginBottom: "15px",
  },

  brandSubtitle: {
    fontSize: "20px",
    opacity: 0.9,
  },

  rightPanel: {
    flex: 1,
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "400px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
  },

  logoCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    margin: "0 auto 20px",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "28px",
    color: "#fff",
    fontWeight: "600",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#e2e8f0",
    fontSize: "14px",
  },

  input: {
    marginBottom: "20px",
    padding: "15px",
    fontSize: "14px",
    border: "none",
    borderRadius: "10px",
    outline: "none",
    background: "rgba(255,255,255,0.25)",
    color: "white",
    backdropFilter: "blur(8px)",
  },

  button: {
    padding: "15px",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.4)",
    cursor: "pointer",
    borderRadius: "10px",
   
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
  },

  footer: {
    marginTop: "30px",
    padding: "20px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  footerText: {
    fontSize: "12px",
    color: "#fff",
    marginBottom: "10px",
    fontWeight: "600",
  },

  credText: {
    fontSize: "11px",
    color: "#e2e8f0",
    margin: "5px 0",
  },
};

export default Login;
