const express = require('express');

const { formPage,addEmployee,allEmployee } = require('../controllers/emp.controller');

const empRoute = express.Router();

empRoute.get('/', formPage);

empRoute.post('/addEmp', addEmployee);
empRoute.get('/allEmployeePage', allEmployee);

module.exports = empRoute;