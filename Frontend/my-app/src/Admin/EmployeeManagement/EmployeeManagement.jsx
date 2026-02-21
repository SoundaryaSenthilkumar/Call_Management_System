import React, { useState, useEffect } from "react";
import "./EmployeeManagement.css";

const EmployeeManagement = ({ onEmployeeChange }) => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "employee",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingEmployee) {
      fetch(`http://localhost:5000/employees/${editingEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          alert(`${formData.name} updated successfully!`);
          fetchEmployees();
          if (onEmployeeChange) onEmployeeChange();
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          alert(`${formData.name} created successfully!`);
          fetchEmployees();
          if (onEmployeeChange) onEmployeeChange();
          resetForm();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      password: "",
      role: employee.role,
    });
    setShowForm(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert(`${name} deleted successfully!`);
          fetchEmployees();
          if (onEmployeeChange) onEmployeeChange();
        })
        .catch((err) => console.log(err));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "employee",
    });
    setEditingEmployee(null);
    setShowForm(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm);
    const matchesRole = roleFilter === "all" || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="emp-container">

      <div className="emp-header">
        <h2>Employee Management</h2>
        <button className="emp-add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Employee"}
        </button>
      </div>

      <div className="emp-search-filter">
        <input
          className="emp-search-input"
          type="text"
          placeholder="🔍 Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="emp-filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
        {(searchTerm || roleFilter !== "all") && (
          <button
            className="emp-clear-btn"
            onClick={() => {
              setSearchTerm("");
              setRoleFilter("all");
            }}
          >
            Clear
          </button>
        )}
      </div>

      {showForm && (
        <form className="emp-form" onSubmit={handleSubmit}>
          <h3>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h3>

          <div className="emp-grid">
            <input
              className="emp-input"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <input
              className="emp-input"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              className="emp-input"
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            <input
              className="emp-input"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editingEmployee}
            />

            <select
              className="emp-select"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="emp-btn-group">
            <button className="emp-submit-btn" type="submit">
              {editingEmployee ? "Update" : "Create"}
            </button>
            <button className="emp-cancel-btn" type="button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="emp-table-box">
        <table className="emp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.role}</td>
                <td>
                  <button className="emp-edit-btn" onClick={() => handleEdit(emp)}>
                    Edit
                  </button>
                  <button
                    className="emp-delete-btn"
                    onClick={() => handleDelete(emp.id, emp.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
