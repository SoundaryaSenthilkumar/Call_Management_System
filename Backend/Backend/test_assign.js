const db = require("./db");

const clientId = 1;
const employeeId = 2;
const assignedBy = "admin";

db.query(
  "INSERT INTO assignments (client_id, employee_id, assigned_by) VALUES (?,?,?)",
  [clientId, employeeId, assignedBy],
  (err, result) => {
    if (err) {
      console.error("Error:", err.message);
      console.error("Code:", err.code);
    } else {
      console.log("Success:", result);
    }
    db.end();
  }
);
