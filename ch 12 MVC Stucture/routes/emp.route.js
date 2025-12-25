const express = require('express');

const { formPage } = require('../controllers/emp.controller');

const empRoute = express.Router();


console.log("Routing.....");

empRoute.get('/', formPage);

module.exports = empRoute;