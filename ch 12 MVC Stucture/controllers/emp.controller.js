const Employee = require('../models/emp.model');

const formPage=(req,res)=>{
    return res.render('empForm');
}
const errorPage=(req,res)=>{
    return res.render('error');
}

// insert Employee 
const addEmployee = async (req, res) => {
    console.log("Insert EMP");
    console.log(req.body);

   try{
     const addEmp = await Employee.create(req.body);

    if (addEmp) {
        console.log("Emp inserted succussfully....");
    } else {
        console.log("Emp insertion failed...");
    }

    return res.redirect('/emp/allEmployeePage');
   }catch(err){
    console.log("Error In Employee...",err);
    
   }
}

// fatch Employee 

const allEmployee = async(req,res)=>{
    console.log("Emloyee Factch...");
    console.log(req.body);
    
     const allEmp = await Employee.find();

     return res.render('allemployee' , {allEmp});
}

// Delete Eployee logic 

const deleteEmployee =async(req,res)=>{
    console.log("Employee Delete.....");
    console.log(req.body);
    try{
        
    const deleteEmp=await Employee.findByIdAndDelete(req.query.empId);

     if (deleteEmp) {
        console.log("Employee is Deleted...");
    } else {
        console.log("Employee Deleted Is failed....");
    }
    return res.redirect('/emp/allEmployeePage');
    }catch(err){
        console.log("Error is Deleted......",err);
        
    }
}

// edit Employee 

const editEmployee = async (req, res) =>{
    console.log(req.params);
try{
    
    const edit = await Employee.findById(req.params.Id);

    console.log(edit);

    if (edit) {
        return res.render('updateEmployeePage', { edit });
    } else {
        return res.redirect('/emp/allEmployeePage');
    }
}catch(err){
    console.log("Error is Edit....",err);   
}

};

// updateEmployee 
const updateEmployee = async (req, res) => {
   await Employee.findByIdAndUpdate(req.body.id , req.body , {new: true});

    return res.redirect('/emp/allEmployeePage');
};

module.exports={
    formPage,
    addEmployee,
    allEmployee,
    deleteEmployee,
    editEmployee,
    updateEmployee,
    errorPage
}