const express = require('express');
const multer = require('multer');

const {
    dashboardPage,
    addAdminPage,
    viewAdminPage,
    insertAdmin,
    deleteAdmin,
    editAdminPage,
    updateAdmin,
    loginPage,
    checkLogin,
    logout,
    changePasswordPage,
    changePassword,
    profilePage,
    verifyEmail,
    OTPPage,
    OTPVerify,
    newPasswordPage,
    changeNewPassword
} = require('../controllers/admin.controller');

const route = express.Router();

// ================= MULTER CONFIG =================
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: myStorage });

// ================= AUTH =================

// Login
route.get('/', loginPage);
route.post('/login', checkLogin);

// Logout
route.get('/logout', logout);

// ================= PASSWORD FLOW =================

// Change Password
route.get('/change-password', changePasswordPage);
route.post('/change-password', changePassword);

// Forgot Password (OTP Flow)
route.post('/verify-email', verifyEmail);
route.get('/otp-page', OTPPage);
route.post('/otp-verify', OTPVerify);

// New Password
route.get('/new-password', newPasswordPage);
route.post('/change-new-password', changeNewPassword);

// ================= PROFILE =================
route.get('/profile', profilePage);

// ================= DASHBOARD =================
route.get('/dashbordPage', dashboardPage);

// ================= ADMIN CRUD =================

// Pages
route.get('/addAdminPage', addAdminPage);
route.get('/viewAdminPage', viewAdminPage);

// Insert
route.post('/insertAdmin', upload.single('profile_image'), insertAdmin);

// Delete
route.get('/deleteAdmin', deleteAdmin);

// Edit / Update
route.get('/editAdmin/:adminId', editAdminPage);
route.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);

module.exports = route;
