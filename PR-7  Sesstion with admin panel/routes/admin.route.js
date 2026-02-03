
const express = require('express');
const passport = require('passport');

const { dashboardPage, addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdminPage, updateAdmin, loginPage, checkLogin, logout, changePasswordPage, changePassword, profilePage, verifyEmail, OTPPage, OTPVerify, newPasswordPage, changeNewPassword } = require('../controllers/admin.controller');
const upload = require('../middleware/multer.middleware');

const route = express.Router();

// Auth
route.get('/', passport.checkAuthIsNotDone, loginPage);
route.post('/login', passport.checkAuthIsNotDone, passport.authenticate("localAuth", {
    failureRedirect: "/"
}), checkLogin);

// change password
route.get('/change-password', passport.checkAuthIsDone, changePasswordPage);
route.post('/change-password', passport.checkAuthIsDone, changePassword);

// forgot password
route.post('/verify-email', passport.checkAuthIsNotDone, verifyEmail);

// OTP Page
route.get('/otp-page', passport.checkAuthIsNotDone, OTPPage);
route.post('/otp-verify', passport.checkAuthIsNotDone, OTPVerify);

// New Password Page
route.get('/newPasswordPage', passport.checkAuthIsNotDone, newPasswordPage);
route.post('/change-new-password', passport.checkAuthIsNotDone, changeNewPassword);

// Profile
route.get('/profile', passport.checkAuthIsDone, profilePage);

// logout
route.get('/logout', passport.checkAuthIsDone, logout);

route.get('/dashboard', passport.checkAuthIsDone, dashboardPage);

route.get('/addAdminPage', passport.checkAuthIsDone, addAdminPage);
route.get('/viewAdminPage', passport.checkAuthIsDone, viewAdminPage);

// Insert Admin
route.post('/insertAdmin', passport.checkAuthIsDone, upload.single('profile_image'), insertAdmin);

// Delete Admin
route.get('/deleteAdmin', passport.checkAuthIsDone, deleteAdmin);

// Edit Admin
route.get('/editAdmin/:adminId', passport.checkAuthIsDone, editAdminPage);
route.post('/editAdmin/:adminId', passport.checkAuthIsDone, upload.single('profile_image'), updateAdmin);
module.exports = route;
