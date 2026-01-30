const Admin = require('../models/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// ----------------------------------
// LOGIN PAGE
// ----------------------------------
module.exports.loginPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId && admin) {
            return res.redirect('/dashbordPage');
        }

        return res.render('auth/login');
    } catch (err) {
        console.log("Login Page Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// LOGIN LOGIC
// ----------------------------------
module.exports.checkLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            console.log("Admin not found...");
            return res.redirect('/');
        }

        if (admin.password !== req.body.password) {
            console.log("Password not matched...");
            return res.redirect('/');
        }

        res.cookie('adminId', admin._id);
        return res.redirect('/dashbordPage');
    } catch (err) {
        console.log("Login Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// CHANGE PASSWORD PAGE
// ----------------------------------
module.exports.changePasswordPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (!req.cookies.adminId || !admin) {
            return res.redirect('/');
        }

        return res.render('auth/changePasswordPage', { admin });
    } catch (err) {
        console.log("Change Password Page Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// CHANGE PASSWORD LOGIC
// ----------------------------------
module.exports.changePassword = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (!req.cookies.adminId || !admin) {
            return res.redirect('/');
        }

        const { current_psw, new_psw, conform_psw } = req.body;

        if (current_psw !== admin.password) {
            console.log("Current password not matched...");
            return res.redirect('/change-password');
        }

        if (new_psw === admin.password) {
            console.log("New password same as old...");
            return res.redirect('/change-password');
        }

        if (new_psw !== conform_psw) {
            console.log("Confirm password not matched...");
            return res.redirect('/change-password');
        }

        const updated = await Admin.findByIdAndUpdate(
            admin._id,
            { password: new_psw },
            { new: true }
        );

        if (updated) {
            console.log("Password changed successfully...");
            res.clearCookie('adminId');
        }

        return res.redirect('/');
    } catch (err) {
        console.log("Change Password Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// VERIFY EMAIL (SEND OTP)
// ----------------------------------
module.exports.verifyEmail = async (req, res) => {
    try {
        const myAdmin = await Admin.findOne({ email: req.body.email });

        if (!myAdmin) {
            console.log("Admin not found...");
            return res.redirect('/');
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sagar.chavda963963@gmail.com",
                pass: "mpgsorqbabclpcnx"
            }
        });

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        const info = await transporter.sendMail({
            from: '"Admin Panel" <sagar.chavda963963@gmail.com>',
            to: req.body.email,
            subject: "OTP Verification",
            html: `
        <h2>Forgot Password OTP</h2>
        <p>Your OTP is: <b>${OTP}</b></p>
      `
        });

        console.log("Mail sent:", info.messageId);

        res.cookie("OTP", OTP);
        res.cookie("id", myAdmin._id);

        return res.redirect('/otp-page');
    } catch (err) {
        console.log("Verify Email Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// OTP PAGE
// ----------------------------------
module.exports.OTPPage = (req, res) => {
    try {
        return res.render('auth/OTPPage');
    } catch (err) {
        console.log("OTP Page Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// OTP VERIFY
// ----------------------------------
module.exports.OTPVerify = async (req, res) => {
    try {
        if (String(req.body.adminOTP) !== String(req.cookies.OTP)) {
            console.log("OTP not matched...");
            return res.redirect('/otp-page');
        }

        return res.redirect('/new-password');
    } catch (err) {
        console.log("OTP Verify Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// NEW PASSWORD PAGE
// ----------------------------------
module.exports.newPasswordPage = (req, res) => {
    try {
        res.clearCookie('OTP');
        return res.render('auth/newPasswordPage');
    } catch (err) {
        console.log("New Password Page Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// CHANGE NEW PASSWORD
// ----------------------------------
module.exports.changeNewPassword = async (req, res) => {
    try {
        if (req.body.new_password !== req.body.conform_password) {
            console.log("Passwords not matched...");
            return res.redirect('/new-password');
        }

        const updated = await Admin.findByIdAndUpdate(
            req.cookies.id,
            { password: req.body.new_password },
            { new: true }
        );

        res.clearCookie('id');

        if (updated) {
            console.log("Password updated...");
        }

        return res.redirect('/');
    } catch (err) {
        console.log("Change New Password Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// PROFILE PAGE
// ----------------------------------
module.exports.profilePage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (!req.cookies.adminId || !admin) {
            return res.redirect('/');
        }

        return res.render('profile/profile', { admin });
    } catch (err) {
        console.log("Profile Error hai:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// LOGOUT
// ----------------------------------
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
};

// ----------------------------------
// DASHBOARD
// ----------------------------------
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (!req.cookies.adminId || !admin) {
            return res.redirect('/');
        }

        return res.render('dashbordPage', { admin });
    } catch (err) {
        console.log("Dashboard Error:", err);
        return res.redirect('/');
    }
};

// ----------------------------------
// ADD ADMIN PAGE
// ----------------------------------
module.exports.addAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (!req.cookies.adminId || !admin) {
            return res.redirect('/');
        }

        return res.render('auth/addAdminPage', { admin });
    } catch (err) {
        console.log("Add Admin Page Error:", err);
        return res.redirect('/dashbordPage');
    }
};

// ----------------------------------
// VIEW ADMIN PAGE
// ----------------------------------
module.exports.viewAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (!req.cookies.adminId || !admin) {
            return res.redirect('/');
        }

        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter(a => a.email !== admin.email);

        return res.render('auth/viewAdminPage', { allAdmin, admin });
    } catch (err) {
        console.log("View Admin Error:", err);
        return res.redirect('/dashbordPage');
    }
};

// ----------------------------------
// INSERT ADMIN
// ----------------------------------
module.exports.insertAdmin = async (req, res) => {
    try {
        req.body.profile_image = req.file.path;

        const addAdmin = await Admin.create(req.body);

        if (addAdmin) {
            console.log("Admin inserted...");
        }

        return res.redirect('/addAdminPage');
    } catch (err) {
        console.log("Insert Admin Error:", err);
        return res.redirect('/addAdminPage');
    }
};

// ----------------------------------
// DELETE ADMIN
// ----------------------------------
module.exports.deleteAdmin = async (req, res) => {
    try {
        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);

        if (deletedUser) {
            fs.unlink(deletedUser.profile_image, () => { });
            console.log("Admin deleted...");
        }

        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Delete Admin Error:", err);
        return res.redirect('/viewAdminPage');
    }
};

// ----------------------------------
// EDIT ADMIN PAGE
// ----------------------------------
module.exports.editAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        const singleAdmin = await Admin.findById(req.params.adminId);

        if (!admin || !singleAdmin) {
            return res.redirect('/');
        }

        return res.render('auth/editAdminPage', { singleAdmin, admin });
    } catch (err) {
        console.log("Edit Admin Page Error:", err);
        return res.redirect('/viewAdminPage');
    }
};

// ----------------------------------
// UPDATE ADMIN
// ----------------------------------
module.exports.updateAdmin = async (req, res) => {
    try {
        if (req.file) {
            req.body.profile_image = req.file.path;

            const oldData = await Admin.findByIdAndUpdate(req.params.adminId, req.body);
            if (oldData) {
                fs.unlink(oldData.profile_image, () => { });
            }
        } else {
            await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });
        }

        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Update Admin Error:", err);
        return res.redirect('/viewAdminPage');
    }
};
