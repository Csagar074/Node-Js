const express = require('express');
const route = express.Router();

route.use('/employee', require('./emp.route'));

module.exports = route;
