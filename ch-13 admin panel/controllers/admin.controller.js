const Admin = require('../models/admin.model');
// const path = require('path');

const deshbordPage = (req, res) => {
    return res.render('deshbordPage');
}
const addAdminPage = (req, res) => {
    return res.render('addAdminpage');
}
const viewAdminPage = async (req, res) => {
    try {
        const allAdmin = await Admin.find();
        return res.render('viewAdminPage', { allAdmin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/allAdmin');
    }
}
// Admin insert 

const insertData = async (req, res) => {
  try {
    if (req.file) {
      req.body.profile_image = req.file.path;   
    }

    const admin = await Admin.create(req.body);
    console.log("Admin Added Successfully");
    return res.redirect('/allAdmin');

  } catch (error) {
    console.log("Error In Admin", error);
    return res.redirect('/addAdminPage');
  }
};

// Admin Delete 
const deleteAdmin = async(req,res)=>{
    try {
        const id = req.params.id;
        await Admin.findByIdAndDelete(id);
        console.log("Admin Deleted Successfully");
        return res.redirect('/allAdmin');
    } catch (error) {
        console.log("Error In Deleting Admin", error);
        return res.redirect('/allAdmin');
    }
}
// Admin Edit 
const editAdmin = async(req,res)=>{
    try {
        const id = req.params.id;
        const adminData = await Admin.findById(id);
        return res.render('editAdminPage',{adminData});
    } catch (error) {
        console.log("Error In Editing Admin", error);
        return res.redirect('/allAdmin');
    }
}  

// Admin update 
const updateAdmin = async(req,res)=>{
    try {
        const id = req.params.id;
        if (req.file) {
            req.body.profile_image = req.file.path;   
          } 
        await Admin.findByIdAndUpdate
(id,req.body);
        console.log("Admin Updated Successfully");
        return res.redirect('/allAdmin');
    }
        catch (error) {
        console.log("Error In Updating Admin", error);
        return res.redirect('/allAdmin');
    }   
}


module.exports={
    deshbordPage,
    addAdminPage,
    viewAdminPage,
    insertData,
    deleteAdmin,
    editAdmin,
    updateAdmin
}
