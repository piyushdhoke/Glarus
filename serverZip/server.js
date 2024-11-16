const dotenv = require('dotenv')
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const employeeRoutes = require("./Router/employeeRouter");
const salaryRoutes = require("./Router/employeeSalaryRouter");
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use("/employees", employeeRoutes);
app.use("/salaries", salaryRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error) => console.error("MongoDB connection error:", error));