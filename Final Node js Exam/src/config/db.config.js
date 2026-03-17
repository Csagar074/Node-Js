const mongoose = require("mongoose");

 mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB is Conntected...");
    
 }).catch((err)=>{
    console.log("MongoDB is Faileted...",err);
    
 });