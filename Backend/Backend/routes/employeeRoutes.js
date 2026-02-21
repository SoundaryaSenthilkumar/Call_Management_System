const express = require("express");
const db = require("../db");
const router = express.Router();

// GET all employees
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// ADD employee
router.post("/", (req, res) => {
  const { name, email, phone, password, role } = req.body;
  db.query(
    "INSERT INTO employees (name,email,phone,password,role) VALUES (?,?,?,?,?)",
    [name, email, phone, password, role],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Employee Added" });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const updateFields = [name, email, phone, role];
  let query = "UPDATE employees SET name=?, email=?, phone=?, role=?";
  
  if (password) {
    query += ", password=?";
    updateFields.push(password);
  }
  
  query += " WHERE id=?";
  updateFields.push(req.params.id);
  
  db.query(query, updateFields, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Employee Updated" });
  });
});

// DELETE employee
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM employees WHERE id=?", [req.params.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Employee deleted" });
  });
});

module.exports = router;