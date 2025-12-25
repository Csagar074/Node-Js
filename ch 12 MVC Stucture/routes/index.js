
const express = require('express');

const route = express.Router();

const { homePage, aboutPage, contectPage } = require('../controllers/home.controller');

console.log("Routing.....");

route.get('/', homePage);
route.get('/about', aboutPage);
route.get('/contect', contectPage);


module.exports = route;