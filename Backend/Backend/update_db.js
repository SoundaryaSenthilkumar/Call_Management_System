const db = require('./db');

db.query('ALTER TABLE employees ADD COLUMN password VARCHAR(255), ADD COLUMN role VARCHAR(50) DEFAULT "employee", ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP', (err) => {
  if(err) {
    console.log('Columns might already exist, updating data...');
  } else {
    console.log('Columns added!');
  }
  
  db.query('UPDATE employees SET password="admin123", role="admin" WHERE id=1', (err) => {
    if(err) console.log('Error updating id 1:', err);
    else console.log('Updated sai as admin');
    
    db.query('UPDATE employees SET password="emp123", role="employee" WHERE id=2', (err) => {
      if(err) console.log('Error updating id 2:', err);
      else console.log('Updated sri as employee');
      
      db.query('UPDATE employees SET password="emp123", role="employee" WHERE id=3', (err) => {
        if(err) console.log('Error updating id 3:', err);
        else console.log('Updated ayra as employee');
        
        db.query('SELECT * FROM employees', (err, result) => {
          console.log('\nFinal employees:', result);
          process.exit();
        });
      });
    });
  });
});
