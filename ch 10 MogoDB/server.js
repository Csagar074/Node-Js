const express =require('express');
require("./config/db.config");
const PORT= 8001;
const app=express();

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(PORT,(err)=>{
    if(err){
        console.log("Server Is Not Started.....",err);
        return false;
    }
    console.log("Server Is Started.....");
})