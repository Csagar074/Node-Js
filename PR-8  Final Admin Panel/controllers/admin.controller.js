
const Admin = require('../models/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Session Remove
function sessionRemove(req, res) {
    console.log("Session Remove");

    req.session.destroy((err) => {
        if (!err) {
            console.log("Session Removed....");
            return res.redirect('/');
        }
        console.log("Error : ", err);
    });
}

// Login Page
module.exports.loginPage = async (req, res) => {
    try {
        return res.render('auth/login');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Login Logic
module.exports.checkLogin = async (req, res) => {
    try {
         req.flash('success', "Admin Login Successfully...");

        return res.redirect('/dashboard');
    } catch (err) {
          req.flash('error', "Admin Login Failed...");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Change Password Page
module.exports.changePasswordPage = async (req, res) => {
    try {
        
        return res.render('auth/changePasswordPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Change Password 
module.exports.changePassword = async (req, res) => {
    try {
        let admin = res.locals.admin;

        console.log(req.body);

        const { current_psw, new_psw, conform_psw } = req.body;

        if (current_psw !== admin.password) {
             req.flash("error", "Current Password and Old Password are not matched...");
            console.log("Current Password and Old Password are not matched...");
            return res.redirect('/change-password');
        }

        if (new_psw === admin.password) {
             req.flash("error", "New Password and Old Password are same...");
            console.log("New Password and Old Password are same...");
            return res.redirect('/change-password');
        }

        if (new_psw !== conform_psw) {
             req.flash("error", "New Password and Conform Password are not matched...");
            console.log("New Password and Conform Password are not matched...");
            return res.redirect('/change-password');
        }

        // Update for Change Password
        const adminChangePassword = await Admin.findByIdAndUpdate(admin._id, { password: new_psw }, { new: true });

        if (adminChangePassword) {
            console.log("Password changed...");
            req.flash('success', "Password Changed Successfully! Logging out...");
            console.log("Session Remove");
            
            // Don't destroy session yet, redirect to show toast first
            return res.redirect('/change-password?logout=true');
        } else {
            console.log("Password not changed...");
            req.flash('error', "Password Change Failed!");
            return res.redirect('/change-password');
        }

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        req.flash('error', "Something went wrong!");
        return res.redirect('/change-password');
    }
}

// Verify Email
module.exports.verifyEmail = async (req, res) => {

    console.log(req.body);

    try {
        const myAdmin = await Admin.findOne(req.body);

        if (!myAdmin) {
            console.log("Admin not found....");
            req.flash('error', "Admin not found! Please check your email.");
            return res.redirect('/');
        }

        // Send OTP
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sagar.chavda963963@gmail.com",
                pass: "wkobrvltxvjbrqnv"
            }
        });

        const OTP = Math.floor(100000 + Math.random() * 900000);

        const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
                .header { background: linear-gradient(135deg, #1d2671, #c33764); padding: 30px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
                .content { padding: 40px 30px; text-align: center; }
                .otp-box { background: linear-gradient(135deg, #667eea, #764ba2); color: #ffffff; padding: 20px; border-radius: 10px; margin: 30px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; }
                .message { color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0; }
                .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; color: #856404; font-size: 14px; text-align: left; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 12px; }
                @media only screen and (max-width: 600px) {
                    .content { padding: 30px 20px; }
                    .otp-box { font-size: 28px; letter-spacing: 6px; padding: 15px; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔐 Password Reset Request</h1>
                </div>
                <div class="content">
                    <p class="message">Hello,</p>
                    <p class="message">We received a request to reset your password. Use the OTP below to proceed:</p>
                    <div class="otp-box">${OTP}</div>
                    <p class="message">This OTP is valid for <strong>10 minutes</strong>.</p>
                    <div class="warning">
                        <strong>⚠️ Security Notice:</strong><br>
                        If you didn't request this password reset, please ignore this email or contact support immediately.
                    </div>
                </div>
                <div class="footer">
                    <p>© 2024 Admin Panel. All rights reserved.</p>
                    <p>This is an automated email. Please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const info = await transporter.sendMail({
            from: '"Admin Panel Security" <sagar.chavda963963@gmail.com>',
            to: req.body.email,
            subject: "🔐 Password Reset OTP - Admin Panel",
            html: emailHTML
        });

        console.log(info.messageId);

        res.cookie("OTP", OTP);
        res.cookie("id", myAdmin._id);

        req.flash('success', "OTP sent to your email! Please check.");
        return res.redirect('/otp-page'); 

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        req.flash('error', "Error sending OTP!");
        return res.redirect('/');
    }
}

// OTP Page
module.exports.OTPPage = (req, res) => {
    try {
        if (!req.cookies.OTP) {
            return res.redirect('/');
        }

        return res.render('auth/OTPPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// OTP Verify
module.exports.OTPVerify = async (req, res) => {
    try {
        console.log("User Side : ", req.body);
        console.log("Developer Side : ", req.cookies);

        if (req.body.adminOTP !== req.cookies.OTP) {
            console.log("OTP not match...");
            req.flash('error', "OTP does not match! Please try again.");
            return res.redirect('/otp-page');
        }

        // Change Password
        req.flash('success', "OTP Verified Successfully!");
        return res.redirect('/newPasswordPage');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        req.flash('error', "Error verifying OTP!");
        return res.redirect('/');
    }
}

// New Password Page
module.exports.newPasswordPage = (req, res) => {
    try {
        res.clearCookie('OTP');
        res.locals.OTP = ""

        if (!req.cookies.id) {
            return res.redirect('/');
        }
        return res.render('auth/newPasswordPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Change New Password Logic
module.exports.changeNewPassword = async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.new_password !== req.body.confirm_password) {
            console.log("New and Confirm Password not matched");
            req.flash("error", "New Password and Confirm Password do not match!");
            return res.redirect('/newPasswordPage');
        }

        console.log(req.cookies);

        const updatePassword = await Admin.findByIdAndUpdate(req.cookies.id, { password: req.body.new_password }, { new: true });

        res.clearCookie('id');
        if (updatePassword) {
            console.log("Password Update...");
            req.flash('success', "Password Reset Successfully! Please Login Again...");
            return res.redirect('/');
        } else {
            console.log("Password Not Update...");
            req.flash('error', "Password Reset Failed! Please Try Again...");
            return res.redirect('/');
        }

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        req.flash('error', "Something went wrong!");
        return res.redirect('/');
    }
}

// Profile Page
module.exports.profilePage = async (req, res) => {
    try {
        return res.render('profile/profile');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

//Logout
module.exports.logout = (req, res) => {
    req.flash('success', "Admin Logout Successfully...");
    
    req.session.destroy((err) => {
        if (!err) {
            console.log("Session Removed....");
            return res.redirect('/');
        }
        console.log("Error : ", err);
        return res.redirect('/');
    });
}

// Dashboard
module.exports.dashboardPage = async (req, res) => {
    try {
        const Category = require('../models/category.model');
        const SubCategory = require('../models/subcategory.model');
        const extraCategory = require('../models/extraCategory.model');
        const Product = require('../models/product.model');
        
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalSubCategories = await SubCategory.countDocuments();
        const totalExtraCategories = await extraCategory.countDocuments();
        const totalAdmins = await Admin.countDocuments();

        return res.render('dashboard', {
            totalProducts,
            totalCategories,
            totalSubCategories,
            totalExtraCategories,
            totalAdmins
        });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Add Admin Page
module.exports.addAdminPage = async (req, res) => {

    try {
        return res.render('admin/addAdminpage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}

// View Admin Page
module.exports.viewAdminPage = async (req, res) => {
    try {

        let allAdmin = await Admin.find();

        allAdmin = allAdmin.filter((subadmin) => subadmin.email != res.locals.admin.email);

        return res.render('admin/viewAdminpage', { allAdmin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}

// Insert Admin
module.exports.insertAdmin = async (req, res) => {
    try {

        console.log(req.file);

        if (req.file) {
            req.body.profile_image = req.file.path;
        } else {
            // Set a default image path if no file uploaded
            req.body.profile_image = "uploads/admin/default-profile.png";
        }

        const addAdmin = await Admin.create(req.body);

        if (addAdmin) {
            console.log("Admin Inserted Successfully..");
            req.flash('success', "Admin Created Successfully!");
        } else {
            console.log("Admin Insertion Failed..");
            req.flash('error', "Admin Creation Failed!");
        }
        return res.redirect('/addAdminPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        req.flash('error', "Error creating admin! " + err.message);
        return res.redirect('/addAdminPage');
    }
}

// Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {

        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);

        console.log(deletedUser);

        if (deletedUser) {
            fs.unlink(deletedUser.profile_image, () => { });
            console.log("Admin deleted successfully...");
            req.flash('success', "Admin Deleted Successfully!");
        } else {
            console.log("Admin deletion failed...");
            req.flash('error', "Admin Deletion Failed!");
        }

        return res.redirect('/viewAdminPage');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        req.flash('error', "Error deleting admin!");
        return res.redirect('/viewAdminPage');
    }
}

// Update Admin Page
module.exports.editAdminPage = async (req, res) => {
    try {
        console.log(req.params);

        const singleAdmin = await Admin.findById(req.params.adminId);

        return res.render('admin/editAdminpage', { singleAdmin });

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}

// Update Admin
module.exports.updateAdmin = async (req, res) => {
    try {
        console.log("Params: ", req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {
            // Get old admin data before update
            const oldAdmin = await Admin.findById(req.params.adminId);
            const oldImagePath = oldAdmin.profile_image;

            // Set new image path
            req.body.profile_image = req.file.path;

            // Update admin with new data
            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });

            if (updatedData) {
                // Delete old image if it exists and is not default
                if (oldImagePath && oldImagePath !== "uploads/admin/default-profile.png" && fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.log("Error deleting old image:", err);
                        else console.log("Old image deleted:", oldImagePath);
                    });
                }
                console.log("Admin Updated Successfully...");
                req.flash('success', "Admin Updated Successfully!");
            } else {
                console.log("Admin Updation Failed...");
                req.flash('error', "Admin Update Failed!");
            }
        } else {
            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
                req.flash('success', "Admin Updated Successfully!");
            } else {
                console.log("Admin Updation Failed...");
                req.flash('error', "Admin Update Failed!");
            }
        }

        return (req.params.adminId === res.locals.admin.id) ? res.redirect('/profile') : res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        req.flash('error', "Error updating admin!");
        return res.redirect('/viewAdminPage');
    }
}
