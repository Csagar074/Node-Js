const express = require('express');
const { addEmp,fatchAllEmp,deleteEmp,updateEmp } = require('../controller/emp.controller');
const empModel = require('../model/emp.model');

const empRoute = express.Router();

empRoute.post('/', addEmp);
empRoute.get('/',fatchAllEmp );
empRoute.delete('/',deleteEmp);
empRoute.patch('/:id',updateEmp);
module.exports = empRoute;
  