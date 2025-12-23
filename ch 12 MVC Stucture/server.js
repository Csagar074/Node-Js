const express=require('express');
const app=express();

const PORT=8001;

app.set('view engine','ejs');
app.use('/',require('./routes'))

app.listen(PORT,(err)=>{
    if(err){
        console.log("Server is Not Started......");
        return false;
    }
    console.log("Server is Started............");
    
})