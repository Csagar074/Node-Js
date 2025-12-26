const Employee = require('../models/emp.model');

const formPage=(req,res)=>{
    return res.render('empForm');
}

// insert Employee 
const addEmployee = async (req, res) => {
    console.log("Insert EMP");
    console.log(req.body);

    const addEmp = await Employee.create(req.body);

    if (addEmp) {
        console.log("Emp inserted succussfully....");
    } else {
        console.log("Emp insertion failed...");
    }

    return res.redirect('/emp/allEmployeePage');
}

// fatch Employee 

const allEmployee = async(req,res)=>{
    console.log("Emloyee Factch...");
    console.log(req.body);
    
     const allEmp = await Employee.find();

     return res.render('allemployee' , {allEmp});
}

module.exports={
    formPage,
    addEmployee,
    allEmployee
}