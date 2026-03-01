
const Admin = require('../../../models/admin.model');

module.exports = class adminAuthService {
    async registerAdmin(body) {
        try {
            return await Admin.create(body);
        } catch (error) {
            console.log("Register Error", error);
        }
    }

    async FetchSingleAdmin(body) {
        try {
            return await Admin.findOne(body);
        } catch (error) {
            console.log("Fecth Single Admin Error", error);
        }
    }

    async FetchAllAdmin() {
        try {
            return await Admin.find();
        } catch (error) {
            console.log("Fecth All Admin Error", error);
        }
    }

    async updateAdmin(id, body) {
        try {
            return await Admin.findByIdAndUpdate(id, body, { new: true });
        } catch (error) {
            console.log("Update Admin Error", error);
        }
    }
}
