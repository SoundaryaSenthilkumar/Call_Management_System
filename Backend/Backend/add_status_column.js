const db = require("./db");

db.query(
  "ALTER TABLE assignments ADD COLUMN status VARCHAR(20) DEFAULT 'pending'",
  (err) => {
    if (err) {
      console.error("Error:", err.message);
    } else {
      console.log("Status column added to assignments table");
    }
    db.end();
  }
);
