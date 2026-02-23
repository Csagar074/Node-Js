const express=require('express');

const{registerUser }=require('../../../controllers/auth/user/user.controller')
const routeUser=express.Router();
routeUser.post('/ragisterUser',registerUser);

module.exports=routeUser;


