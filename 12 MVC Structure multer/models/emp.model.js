const mongoose = require('mongoose');

const EmpSchema = mongoose.Schema({
    emp_Name: {
        type: String,
        required: true,
    },
    emp_Email: {
        type: String,
        required: true,
    },
    emp_Password: {
        type: String,
        required: true,
    },
    emp_Salary: {
        type: Number,
        required: true,
    },
    emp_gender: {
        type: String,
        required: true,
    },
    emp_Role: {
        type: String,
        required: true,
    },
    emp_Hobbys: {
        type: Array,
        required: true,
    },
    emp_ProfilePic: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Employee", EmpSchema, "Employees");
