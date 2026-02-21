const db = require("./db");

const employeeId = 2; // sri's id

db.query(
  `SELECT a.id as assignment_id, c.id as client_id, c.name, c.email, c.phone 
   FROM assignments a 
   JOIN clients c ON a.client_id = c.id 
   WHERE a.employee_id=?`,
  [employeeId],
  (err, result) => {
    if (err) {
      console.error("Error:", err.message);
    } else {
      console.log("Assignments for employee", employeeId, ":");
      console.log(result);
    }
    db.end();
  }
);
