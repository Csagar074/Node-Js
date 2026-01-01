const express=require('express');

 const resto=express.Router();

 const{restoFormPage,addUser,allUser,homePage}=require('../controllers/resto.controller');

 console.log("Routing.....");
 

 resto.get('/',homePage);
//  resto.get('/resto',restoFormPage);

 resto.get('/addUser',addUser);
  resto.get('/allresto',allUser);

 module.exports=resto;