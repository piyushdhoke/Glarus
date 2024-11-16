const express = require("express");
const { createEmployee, getAllEmployee, updateEmployee } = require("../Controller/employeeController");

const router = express.Router();

router.post("/create",createEmployee);
router.get("/", getAllEmployee);
router.put('/:employeeId',updateEmployee)

module.exports = router;