const express=require('express');

const{ registerAdmin }=require('../../../controllers/auth/admin/admin.controller')
const routeAdmin=express.Router();
routeAdmin.use('/ragisterAdmin',registerAdmin);


module.exports=routeAdmin;