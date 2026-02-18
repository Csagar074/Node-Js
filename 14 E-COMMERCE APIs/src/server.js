require('dotenv').config();
const express=require('express');

const app= express();
const PORT=process.env.PORT;

app.use(express.urlencoded);
app.use(express.json);

app.use('/api',require('./routes'))

app.listen(PORT,(err)=>{
    if(err){
        console.log("Server is Not Started...",err);
        return false;
    }
    console.log("Server is Started...");
})