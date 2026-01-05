const express = require('express');
const route = express.Router();
const multer = require('multer');

const {
    deshbordPage,
    addAdminPage,
    viewAdminPage,
    insertData,
    deleteAdmin,
    editAdmin,
    updateAdmin
} = require('../controllers/admin.controller');


// ================= Multer Storage =================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


// ================= Routes =================

// Dashboard
route.get('/', deshbordPage);

// Add Admin Page
route.get('/addAdminPage', addAdminPage);

// View All Admins
route.get('/allAdmin', viewAdminPage);

// Insert Admin
route.post('/insertData', upload.single('profile_image'), insertData);

// Delete Admin
route.get('/deleteAdmin/:id', deleteAdmin);

// Edit Admin Page
route.get('/editAdmin/:id', editAdmin);

// Update Admin  (ID REQUIRED)
route.post('/updateAdmin/:id', upload.single('profile_image'), updateAdmin);


module.exports = route;
