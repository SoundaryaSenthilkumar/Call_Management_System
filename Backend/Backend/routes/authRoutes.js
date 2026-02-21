const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  db.query(
    "SELECT * FROM employees WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      
      if (result.length > 0) {
        res.json({ success: true, user: result[0] });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

module.exports = router;
