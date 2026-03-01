
const AdminAuthService = require('../../../services/auth/admin/admin.service');
const { successResponse, errorResponse } = require('../../../utils/response');
const { MSG } = require('../../../utils/msg');
const moment = require('moment');
const statusCode = require('http-status-codes');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const adminAuthService = new AdminAuthService();

module.exports.registerAdmins = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.createAt = moment().format('YYYY-MM-DD HH:mm:ss');
        req.body.updateAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const newAdmin = await adminAuthService.registerAdmin(req.body);
        if (!newAdmin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Registration_Failed, newAdmin));
        }
        const AdminLogin = await adminAuthService.FetchSingleAdmin({ email: req.body.email });
        if (AdminLogin) {
            return res.status(statusCode.BAD_REQUEST).json(successResponse(statusCode.BAD_REQUEST, true, MSG.Admin_Login_Failed));
        }
        return res.status(statusCode.CREATED).json(successResponse(statusCode.CREATED, false, MSG.Admin_Registration_Success));
    } catch (error) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Internal_Server_Error));
    }
}
module.exports.loginAdmin = async (req, res) => {
    try {
        console.log(req.body);

        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email });

        console.log(admin);

        if (!admin) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
        }

        const isPassword = await bcrypt.compare(req.body.password, admin.password);

        if (!isPassword) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_LOGIN_FAILED));
        }

        // JWT Token
        const payload = {
            adminId: admin.id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        console.log(token);

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.ADMIN_LOGIN_SUCCESS, { token }));

    } catch (err) {
        console.log("Error : ", err);
    }
}


module.exports.forgotPassword = async (req, res) => {
    try {
        console.log(req.body);
        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email });

        if (!admin) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
        }

        if (admin.attempt_expire < Date.now()) { // 11:17 < 09:00
            admin.attempt = 0;
        }

        if (admin.attempt >= 3) { // 3 >= 3
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.MANY_TIME_OTP));
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        await sendOTPMail(req.body.email, OTP);

        admin.attempt++; // attempt = 3

        const expireOTPTime = new Date(Date.now() + 1000 * 60 * 2); //09:30 = 09:32

        await adminAuthService.updateAdmin(admin.id, { OTP: OTP, OTP_Expire: expireOTPTime, attempt: admin.attempt, attempt_expire: new Date(Date.now() + 1000 * 60 * 60) });

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.OTP_SEND));

    } catch (err) {
        console.log("Error : ", err);
    }
}

module.exports.verifyOTP = async (req, res) => {
    try {
        console.log(req.body);

        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email });

        if (!admin) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
        }

        if (admin.verify_attempt_expire < Date.now()) { // 11:17 < 09:00
            admin.verify_attempt = 0;
        }

        if (admin.verify_attempt >= 3) { // 3 >= 3
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.MANY_TIME_OTP));
        }

        if (admin.OTP_Expire < Date.now()) { // 09:50 < 09:48
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.OTP_EXPIRED));
        }

        admin.verify_attempt++;

        await adminAuthService.updateAdmin(admin.id, { verify_attempt: admin.verify_attempt, verify_attempt_expire: new Date(Date.now() + 1000 * 60 * 60) });


        if (req.body.OTP !== admin.OTP) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.INVALID_OTP));
        }

        await adminAuthService.updateAdmin(admin.id, { OTP: 0, OTP_Expire: null, verify_attempt: admin.verify_attempt, verify_attempt_expire: new Date(Date.now() + 1000 * 60 * 60) });

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.VERIFY_OTP));




    } catch (err) {
        console.log("Error : ", err);
    }
}
module.exports.newPassword = async (req, res) => {
    try {
        console.log(req.body);

        const admin = await adminAuthService.fetchSingleAdmin({ email: req.body.email });

        req.body.new_password = await bcrypt.hash(req.body.new_password, 11);

        const updatedPassword = await adminAuthService.updateAdmin(admin._id, { password: req.body.new_password });

        if (!updatedPassword) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_PASSWORD_UPDATE_FAILED));
        }

        return res.status(statusCode.OK).json(successResponse(statusCode.OK, false, MSG.ADMIN_PASSWORD_UPDATED));


    } catch (err) {
        console.log("Error : ", err);
    }
}



module.exports.fetchAdmins = async (req, res) => {
    try {

    } catch (err) {
        console.log("Something Went Wrong!!", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Internal_Server_Error));
    }
}
