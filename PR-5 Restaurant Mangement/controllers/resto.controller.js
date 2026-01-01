
const  Restaurant=require('../models/resto.model');

const homePage = (req,res) => {
    return res.render("restoForm");
}

// const restoFormPage=(req,res)=>{
//     return res.render('restoForm');
// }

// insert Logic 
const addUser = async (req, res) => {
    console.log("Insert Restorant");
    console.log(req.body);

   try{
     const addresto = await Restaurant.create(req.body);

    if (addresto) {
        console.log("Resto inserted succussfully....");
    } else {
        console.log("Resto insertion failed...");
    }

    return res.redirect('/allUser');
   }catch(err){
    console.log("Error In Employee...",err);
    
   }
}

// fatch All user

const allUser = async(req,res)=>{
    console.log("All User Fatch...");
    console.log(req.body);
    
     const allresto = await Restaurant.find();

     return res.render('/allUser' , {allresto});
}

module.exports={
    // restoFormPage,
    addUser,
    allUser,homePage
}
