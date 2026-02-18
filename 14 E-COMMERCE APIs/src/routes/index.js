const express=require('express');

const route=express.Router();

app.use('/auth',require('./auth/admin/admin.route'));
app.use('/auth',require('./auth/user/user.route'));
module.exports=route;

