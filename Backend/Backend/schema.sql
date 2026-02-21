-- Create database
CREATE DATABASE IF NOT EXISTS userdata_management;
USE userdata_management;

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'employee',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  employee_id INT NOT NULL,
  assigned_by VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  employee_id INT NOT NULL,
  call_attended VARCHAR(10) NOT NULL,
  call_duration INT NOT NULL,
  call_details TEXT NOT NULL,
  client_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO employees (name, email, phone, password, role) VALUES
('Admin User', 'admin@example.com', '1234567890', 'admin123', 'admin'),
('Manager User', 'manager@example.com', '1234567891', 'manager123', 'manager'),
('John Doe', 'john@example.com', '1234567892', 'emp123', 'employee'),
('Jane Smith', 'jane@example.com', '1234567893', 'emp123', 'employee');

INSERT INTO clients (name, email, phone) VALUES
('Client A', 'clienta@example.com', '9876543210'),
('Client B', 'clientb@example.com', '9876543211'),
('Client C', 'clientc@example.com', '9876543212');
