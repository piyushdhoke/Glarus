const mongoose = require('mongoose');
const employee = require('./employee'); 

const employeeSalarySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee", 
        required: true
    },
    salaryMonth: {
        type: String,
        enum: ["Jan", "Feb", "Mar"], 
        required: true
    },
    Basic: {
        type: Number,
        required: true
    },
    Hra: {
        type: Number,
        required: true
    },
    travel: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('EmployeeSalary', employeeSalarySchema); 
