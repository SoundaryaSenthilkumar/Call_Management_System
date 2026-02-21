const db = require("./db");

// Create assignments table if not exists
const dropTable = `DROP TABLE IF EXISTS assignments`;
const createAssignmentsTable = `
CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  employee_id INT NOT NULL,
  assigned_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
)`;

db.query(dropTable, (err) => {
  if (err) {
    console.error("Error dropping table:", err);
    db.end();
    return;
  }
  console.log("Old table dropped");
  
  db.query(createAssignmentsTable, (err) => {
    if (err) {
      console.error("Error creating assignments table:", err);
    } else {
      console.log("Assignments table created successfully");
    }
    db.end();
  });
});
