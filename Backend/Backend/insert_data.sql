USE userdata_management;

-- Clear existing data
DELETE FROM feedback;
DELETE FROM assignments;
DELETE FROM clients;
DELETE FROM employees;

-- Insert employees
INSERT INTO employees (name, email, phone, password, role) VALUES
('Admin User', 'admin@example.com', '1234567890', 'admin123', 'admin'),
('Manager User', 'manager@example.com', '1234567891', 'manager123', 'manager'),
('John Doe', 'john@example.com', '1234567892', 'emp123', 'employee'),
('Jane Smith', 'jane@example.com', '1234567893', 'emp123', 'employee');

-- Insert clients
INSERT INTO clients (name, email, phone) VALUES
('Client A', 'clienta@example.com', '9876543210'),
('Client B', 'clientb@example.com', '9876543211'),
('Client C', 'clientc@example.com', '9876543212');

SELECT 'Data inserted successfully!' as message;
SELECT * FROM employees;
