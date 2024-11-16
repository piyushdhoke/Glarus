const express = require("express");
const { createSalary, getSalary } = require("../Controller/employeeSalaryController");

const router = express.Router();

router.post("/:employeeId", createSalary);
router.get("/:employeeId", getSalary);

module.exports = router;