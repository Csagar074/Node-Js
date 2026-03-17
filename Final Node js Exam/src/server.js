 require("dotenv").config();
 require("./config/db.config");

const express = require("express");
const PORT = process.env.PORT;

const app = express();
app.use(express.json());   

app.use("/api", require("./Routes/auth.Route"));

app.listen(PORT,(err)=>{      
  if(err){
    console.log("Server is Not Started...",err);   
    return false;
  }
  console.log("Server is started....");  
  
});                       