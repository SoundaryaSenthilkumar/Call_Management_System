# Testing Guide - Call Management System

## Prerequisites
1. MySQL database running with tables created (see SETUP_INSTRUCTIONS.md)
2. Backend server running on port 5000
3. Frontend running on port 3000

## Step-by-Step Testing

### 1. Start Backend Server
```bash
cd d:\Izone\Backend\Backend
node server.js
```
You should see: "Server running on 5000" and "MySQL Connected"

### 2. Start Frontend
```bash
cd d:\Izone\Frontend\my-app
npm start
```

### 3. Test Admin Login
- Email: admin@example.com
- Password: admin123
- Click Login

### 4. Test Admin Dashboard
After login, you should see:
- Dashboard with 4 cards showing:
  - Total Employees (should show 4)
  - Total Clients (should show 3)
  - Assigned Tasks (count of assignments)
  - Completed (count of completed feedbacks)
- Notification bell with badge showing feedback count
- Sidebar menu with: Dashboard, Employees, Assign Task, Feedback Forms

### 5. Test Employee Management (Admin)
Click "Employees" in sidebar:

**Add Employee:**
1. Click "+ Add Employee" button
2. Fill form:
   - Name: Test Employee
   - Email: test@example.com
   - Phone: 1234567890
   - Password: test123
   - Role: employee
3. Click "Create"
4. Should show alert: "Test Employee created successfully!"
5. Go back to Dashboard - Total Employees count should increase
6. Go to Assign Task - New employee should appear in dropdown

**Edit Employee:**
1. Click "Edit" button on any employee
2. Modify details
3. Click "Update"
4. Should show alert: "[Name] updated successfully!"

**Delete Employee:**
1. Click "Delete" button
2. Confirm deletion
3. Should show alert: "[Name] deleted successfully!"
4. Dashboard count should decrease

### 6. Test Assign Task (Admin)
Click "Assign Task" in sidebar:

**Add Client:**
1. Click "Add New Client" button
2. Fill form:
   - Name: New Client
   - Email: newclient@example.com
   - Phone: 9876543210
3. Click "Add"
4. Should show alert: "Client added successfully!"
5. Client appears in table
6. Go to Dashboard - Total Clients count should increase

**Edit Client:**
1. Click "Edit" button on any client
2. Modify details
3. Click "Update"
4. Should show alert: "Client Updated!"

**Delete Client:**
1. Click "Delete" button
2. Confirm deletion
3. Should show alert: "Client Deleted!"

**Assign Task:**
1. Select employee from dropdown
2. Click "Assign" button on any client
3. Should show alert: "Task assigned successfully!"
4. Go to Dashboard - Assigned Tasks count should increase

### 7. Test Employee Login
Logout and login as employee:
- Email: john@example.com
- Password: emp123

### 8. Test Employee Dashboard
After login, you should see:
- Dashboard with 3 cards: Total Tasks, Completed, Pending
- "Assigned Clients" section showing clients assigned to this employee
- Each client has "Send Feedback" button

### 9. Test Feedback Form (Employee)
1. Click "Send Feedback" button on any client
2. Modal opens with form:
   - Client Name (auto-filled, disabled)
   - Call Attended: Yes/No dropdown
   - Call Duration: number input
   - Call Details: textarea
   - Client Address: textarea
3. Fill all fields
4. Click "Submit Feedback"
5. Should show alert: "Feedback Submitted!"
6. Modal closes

### 10. Test Manager Login
Logout and login as manager:
- Email: manager@example.com
- Password: manager123

### 11. Test Manager Dashboard
- Click "Feedback Forms" in sidebar
- Should see table with all feedback submitted by employees
- Columns: Client Name, Email, Phone, Employee, Call Attended, Duration, Details, Address, Date

### 12. Test Admin Feedback View
Login as admin and click "Feedback Forms"
- Should see same feedback table as manager
- Notification bell count should match feedback count

## Expected Behavior Summary

### Admin Panel:
✅ Real-time dashboard stats update when:
  - Employee added/edited/deleted
  - Client added/edited/deleted
  - Task assigned
  - Feedback submitted

✅ Employee Management:
  - CRUD operations work
  - Success messages show
  - Dashboard updates immediately

✅ Assign Task:
  - Only employees (not admin/manager) show in dropdown
  - Client CRUD operations work
  - Task assignment works
  - Success messages show

✅ Feedback Forms:
  - All feedback visible
  - Notification bell shows count

### Employee Panel:
✅ Shows only assigned clients
✅ Feedback form works
✅ Feedback submits to database

### Manager Panel:
✅ Can view all feedback forms

## Troubleshooting

### Backend not connecting:
- Check MySQL is running
- Verify database credentials in db.js
- Ensure database and tables are created

### Frontend errors:
- Check backend is running on port 5000
- Open browser console (F12) to see errors
- Verify all API endpoints are accessible

### Data not updating:
- Check browser console for errors
- Verify backend console for errors
- Refresh the page
- Check database directly using MySQL Workbench

## Database Verification

Run these queries in MySQL to verify data:

```sql
-- Check employees
SELECT * FROM employees;

-- Check clients
SELECT * FROM clients;

-- Check assignments
SELECT * FROM assignments;

-- Check feedback
SELECT * FROM feedback;

-- Check assigned tasks for specific employee
SELECT c.name, c.email, c.phone 
FROM assignments a 
JOIN clients c ON a.client_id = c.id 
WHERE a.employee_id = 3;
```
