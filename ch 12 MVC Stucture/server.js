const express=require('express');
const PORT =8001;

const app=express();

app.set('view engine','ejs');

app.use('/',require('./routes/'));   
app.use('/emp',require('./routes/emp.route'));
app.listen(PORT,(err)=>{
    if(err){
        console.log("Server is Not Started.....");
       return false; 
    }
    console.log("Server is Started......");  

});