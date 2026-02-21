const db = require("./db");

// First check current assignments
db.query("SELECT * FROM assignments", (err, assignments) => {
  if (err) {
    console.error("Error:", err.message);
    db.end();
    return;
  }
  
  console.log("Current assignments:");
  console.log(assignments);
  
  if (assignments.length > 0) {
    const testId = assignments[0].id;
    console.log("\nTesting status update for assignment ID:", testId);
    
    db.query(
      "UPDATE assignments SET status=? WHERE id=?",
      ["completed", testId],
      (err2) => {
        if (err2) {
          console.error("Update error:", err2.message);
        } else {
          console.log("Status updated successfully!");
          
          // Verify update
          db.query("SELECT * FROM assignments WHERE id=?", [testId], (err3, result) => {
            if (!err3) {
              console.log("Updated assignment:", result[0]);
            }
            db.end();
          });
        }
      }
    );
  } else {
    console.log("No assignments found");
    db.end();
  }
});
