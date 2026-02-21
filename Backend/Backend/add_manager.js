const db = require("./db");

db.query(
  "INSERT INTO employees (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)",
  ["Manager", "manager@gmail.com", "9876543210", "manager123", "manager"],
  (err) => {
    if (err) {
      console.error("Error:", err.message);
    } else {
      console.log("Manager added successfully!");
      console.log("Email: manager@gmail.com");
      console.log("Password: manager123");
    }
    db.end();
  }
);
