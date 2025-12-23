const express=require('express');

const route=express.Router();

const  homecontroller = require('../controllers/home.controller');
console.log("Routing.....");


route.get('/', homecontroller.homePage);
route.get('/about', homecontroller.aboutPage);

module.exports=route;