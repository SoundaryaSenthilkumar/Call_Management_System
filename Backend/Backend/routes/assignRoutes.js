const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { clientId, employeeId, assignedBy } = req.body;

  db.query(
    "INSERT INTO assignments (client_id, employee_id, assigned_by) VALUES (?,?,?)",
    [clientId, employeeId, assignedBy],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Task Assigned!" });
    }
  );
});

// Update assignment status - MUST BE BEFORE :employeeId route
router.put("/status/:id", (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE assignments SET status=? WHERE id=?",
    [status, req.params.id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Status updated" });
    }
  );
});

// Manager sees all assignments with status
router.get("/all", (req, res) => {
  db.query(
    `SELECT a.id, a.created_at, a.status,
            e.name as employee_name, 
            c.name as client_name, c.email, c.phone
     FROM assignments a 
     JOIN employees e ON a.employee_id = e.id
     JOIN clients c ON a.client_id = c.id 
     ORDER BY a.created_at DESC`,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    }
  );
});

// Employee sees tasks
router.get("/employee/:employeeId", (req, res) => {
  db.query(
    `SELECT a.id as assignment_id, a.status, c.id as client_id, c.name, c.email, c.phone 
     FROM assignments a 
     JOIN clients c ON a.client_id = c.id 
     WHERE a.employee_id=?`,
    [req.params.employeeId],
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