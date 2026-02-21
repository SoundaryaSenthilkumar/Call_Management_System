const express = require("express");
const db = require("../db");
const router = express.Router();

// Submit feedback from employee
router.post("/", (req, res) => {
  const { clientId, employeeId, callAttended, callDuration, callDetails, clientAddress } = req.body;
  
  db.query(
    "INSERT INTO feedback (client_id, employee_id, call_attended, call_duration, call_details, client_address) VALUES (?,?,?,?,?,?)",
    [clientId, employeeId, callAttended, callDuration, callDetails, clientAddress],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Feedback Submitted!" });
    }
  );
});

// Get all feedback for admin/manager
router.get("/", (req, res) => {
  db.query(
    `SELECT f.*, c.name as client_name, c.email, c.phone, e.name as employee_name 
     FROM feedback f 
     JOIN clients c ON f.client_id = c.id 
     JOIN employees e ON f.employee_id = e.id 
     ORDER BY f.created_at DESC`,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    }
  );
});

module.exports = router;
