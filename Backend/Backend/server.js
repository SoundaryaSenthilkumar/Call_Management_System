const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const clientRoutes = require("./routes/clientRoutes");
const assignRoutes = require("./routes/assignRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/clients", clientRoutes);
app.use("/assign", assignRoutes);
app.use("/feedback", feedbackRoutes);

app.listen(5000, () => console.log("Server running on 5000"));