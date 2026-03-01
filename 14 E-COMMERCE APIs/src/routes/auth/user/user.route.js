
const express = require('express');
const { registerUser, loginUser, forgotPassword, verifyOTP, newPassword } = require('../../../controllers/auth/user/user.controller');

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/verify-otp', verifyOTP);
userRoute.post('/new-password', newPassword);

module.exports = userRoute;
