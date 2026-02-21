const db = require("./db");

db.query("SELECT * FROM assignments", (err, assignments) => {
  if (err) {
    console.error("Assignments error:", err.message);
  } else {
    console.log("All assignments:", assignments);
  }
  
  db.query("SELECT * FROM clients", (err2, clients) => {
    if (err2) {
      console.error("Clients error:", err2.message);
    } else {
      console.log("\nAll clients:", clients);
    }
    
    db.query("SELECT * FROM employees", (err3, employees) => {
      if (err3) {
        console.error("Employees error:", err3.message);
      } else {
        console.log("\nAll employees:", employees);
      }
      db.end();
    });
  });
});
