const express = require('express');

const { formPage,addEmployee,allEmployee,deleteEmployee,editEmployee,updateEmployee,errorPage } = require('../controllers/emp.controller');

const empRoute = express.Router();

empRoute.get('/', formPage);

empRoute.post('/addEmp', addEmployee);
empRoute.get('/allEmployeePage', allEmployee);
empRoute.get('/deleteEmp', deleteEmployee);
empRoute.get('/editEmp/:Id',editEmployee);
empRoute.post('/updateEmp',updateEmployee);
empRoute.get('errorPage',errorPage);


module.exports = empRoute;