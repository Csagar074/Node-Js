const mongoose = require('mongoose');

const URI="mongodb://localhost:27017/employee-mangement";

mongoose.connect(URI).then(()=>{
    console.log("MongoDB is Connect.....");
    
}).catch((err)=>{
    console.log("MongoDB is Not connect....." , err);
});
