
const express = require('express');
const passport = require('passport');

const { dashboardPage, loginPage, checkLogin, logout, changePasswordPage, changePassword, profilePage, verifyEmail, OTPPage, OTPVerify, newPasswordPage, changeNewPassword } = require('../controllers/admin.controller');

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

route.use('/admin', passport.checkAuthIsDone, require('./admin.route'));

// Category Route
route.use('/category', passport.checkAuthIsDone, require("./category.route"));

// sub Category route 
route.use('/subCategory', passport.checkAuthIsDone, require("./subcategory.route"));

// Extra Category route 
route.use('/extraCategory', passport.checkAuthIsDone, require("./extraCategory.route"));


//Product route 
route.use('/product', passport.checkAuthIsDone, require("./product.route"));

module.exports = route;
