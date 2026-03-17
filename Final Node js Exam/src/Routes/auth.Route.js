
const express=require('express');

const authRoute=express.Router();

authRoute.use("/auth", require("./authRoutes"));
authRoute.use("/auth", require("./blogRoutes"));

module.exports=authRoute;