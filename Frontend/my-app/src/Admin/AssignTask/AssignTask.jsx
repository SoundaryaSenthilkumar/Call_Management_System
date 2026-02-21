import React, { useState, useEffect } from "react";
import "./AssignTask.css";

const AssignTask = ({ onTaskAssigned }) => {
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchClients();
  }, []);

  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.filter(emp => emp.role === 'employee')))
      .catch((err) => console.log(err));
  };

  const fetchClients = () => {
    fetch("http://localhost:5000/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.log(err));
  };

  const handleAssign = (clientId) => {
    if (!selectedEmployee) {
      alert("Please select an employee!");
      return;
    }

    fetch("http://localhost:5000/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        employeeId: selectedEmployee,
        assignedBy: "admin",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Task assigned successfully!");
        if (onTaskAssigned) onTaskAssigned();
      })
      .catch((err) => console.log(err));
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();

    if (editingClient) {
      fetch(`http://localhost:5000/clients/${editingClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Client Updated!");
          fetchClients();
          resetForm();
        });
    } else {
      fetch("http://localhost:5000/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Client added successfully!");
          fetchClients();
          if (onTaskAssigned) onTaskAssigned();
          resetForm();
        });
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
    });
    setShowClientForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this client?")) {
      fetch(`http://localhost:5000/clients/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Client Deleted!");
          fetchClients();
        });
    }
  };

  const resetForm = () => {
    setClientForm({ name: "", email: "", phone: "" });
    setEditingClient(null);
    setShowClientForm(false);
  };

  return (
    <div className="assign-container">
      <h2 className="assign-title">Assign Task</h2>

      <div className="assign-section">
        <label>Select Employee: </label>
        <select
          className="assign-select"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Choose Employee --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="assign-add-btn"
        onClick={() => setShowClientForm(!showClientForm)}
      >
        {showClientForm ? "Cancel" : "Add New Client"}
      </button>

      {showClientForm && (
        <form className="assign-form" onSubmit={handleClientSubmit}>
          <h3>{editingClient ? "Edit Client" : "Add Client"}</h3>

          <input
            className="assign-input"
            type="text"
            placeholder="Name"
            value={clientForm.name}
            onChange={(e) =>
              setClientForm({ ...clientForm, name: e.target.value })
            }
            required
          />
          <input
            className="assign-input"
            type="email"
            placeholder="Email"
            value={clientForm.email}
            onChange={(e) =>
              setClientForm({ ...clientForm, email: e.target.value })
            }
            required
          />
          <input
            className="assign-input"
            type="text"
            placeholder="Phone"
            value={clientForm.phone}
            onChange={(e) =>
              setClientForm({ ...clientForm, phone: e.target.value })
            }
            required
          />

          <button className="assign-submit-btn" type="submit">
            {editingClient ? "Update" : "Add"}
          </button>

          {editingClient && (
            <button
              className="assign-cancel-btn"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      <div className="assign-table-section">
        <h3>Client List</h3>

        <table className="assign-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    className="assign-btn"
                    onClick={() => handleAssign(client.id)}
                  >
                    Assign
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(client)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(client.id)}
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

export default AssignTask;
