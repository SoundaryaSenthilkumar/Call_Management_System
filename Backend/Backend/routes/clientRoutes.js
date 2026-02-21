const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM clients", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "INSERT INTO clients (name,email,phone) VALUES (?,?,?)",
    [name, email, phone],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Client Added" });
    }
  );
});

router.put("/:id", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "UPDATE clients SET name=?, email=?, phone=? WHERE id=?",
    [name, email, phone, req.params.id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Client Updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM clients WHERE id=?", [req.params.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Client Deleted" });
  });
});

module.exports = router;