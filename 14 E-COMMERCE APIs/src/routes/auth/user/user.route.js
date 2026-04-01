
const express = require('express');
const { registerUser, loginUser, forgotPassword, verifyOTP, newPassword, fetchAllUser, deleteUser, updateUser, activeOrInActiveUser, userProfile, changePassword } = require('../../../controllers/auth/user/user.controller');

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/verify-otp', verifyOTP);
userRoute.post('/new-password', newPassword);


userRoute.get('/', fetchAllUser);
userRoute.delete('/', deleteUser);
userRoute.patch('/', updateUser);
userRoute.put('/', activeOrInActiveUser);

userRoute.get('/profile', userProfile);

userRoute.post('/change-password', changePassword);

module.exports = userRoute;
 