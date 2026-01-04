const express = require('express');
require('./config/db.config.js');
const path = require('path');
const app = express();
const PORT = 8001;
  
app.set('view engine', 'ejs');  
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.use('/', require('./routes/resto.route.js'))  
     
app.listen(PORT,(err)=>{               
    if(err){ 
        console.log("Server is Not Started......",err);
        return false;   
    } 
    console.log("Server is Started.....");
      
})                           