require('./config/db.config');
const express=require('express');
// app.set("views", path.join(__dirname, "views"));

const PORT= 8001;

const app=express();

app.set('view engine','ejs');

app.use('/',require('./routes/resto.route'));

app.listen(PORT,(err)=>{
    if(err){
        console.log("Server is Not Started......");
        return false;
    }
    console.log("Server is Started.......");
    
});