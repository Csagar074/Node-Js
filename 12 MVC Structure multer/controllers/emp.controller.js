const Employee = require('../models/emp.model')
const fs = require('fs');

// rendering All Pages of Employee
const empPage = (req, res) => {
    return res.render('employee');
}
const allEmployee = async (req, res) => {
    const allEmp = await Employee.find();
    return res.render('allEmployee', { allEmp });
}
const updateEmp = async (req, res) => {
    const edit = await Employee.findById(req.params.id)
    return res.render('EditEmployee', { edit })
}

// Logical Of All Employee Operations
const addEmp = async (req, res) => {

    try {
        req.body.emp_ProfilePic = req.file.path;
        const allEmp = await Employee.create(req.body);

        if (allEmp) {
            console.log("Employee Added SuccessFully");
        } else {
            console.log("Employee Added Failed!");
        }

        return res.redirect('/form/allEmp');

    } catch (error) {
        console.log("Error In Employee", error);
    }
};

const deleteEmp = async (req, res) => {
    try {
        const deletedEmp = await Employee.findByIdAndDelete(req.params.id);

        if (deletedEmp) {
            console.log("Employee Deleted Successfully");
        } else {
            console.log("Employee Deletion Failed!");
        }
        return res.redirect('/form/allEmp');
    } catch (error) {
        console.log("Error In Deleting Employee", error);
    }
}
const editEmp = async (req, res) => {
    console.log(req.body);

    if (req.file) {
        const EmpData = await Employee.findById(req.body.id)
        req.body.emp_ProfilePic = req.file.path;
        fs.unlink(EmpData.emp_ProfilePic, (err) => { })

        const updateEmp = await Employee.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (updateEmp) {
            console.log("Employee Updated Successfully");
        }
        else {
            console.log("Employee Updation Failed!");
        }
        return res.redirect('/form/allEmp');

    } else {
        const updateEmp = await Employee.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (updateEmp) {
            console.log("Employee Updated Successfully");
        }
        else {
            console.log("Employee Updation Failed!");
        }
        return res.redirect('/form/allEmp');
    }
}
module.exports = {
    empPage,
    addEmp,
    allEmployee,
    deleteEmp,
    updateEmp,
    editEmp
};