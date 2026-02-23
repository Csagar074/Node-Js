const express = require('express');
const { registerAdmins , loginAdmin, fetchAdmins } = require('../../../controllers/auth/admin/admin.controller');
const adminRouter = express.Router();

adminRouter.post('/registerAdmin',registerAdmins );
adminRouter.post('/loginAdmin', loginAdmin);
adminRouter.get('/', fetchAdmins)

module.exports = adminRouter;