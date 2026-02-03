const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },

    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        reqired: true,
    },
    Hobby: {
        type: Array,
        required: true,
    },
    city: {
        type: String,
        requured: true,
    },
    about: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Admin', adminSchema, 'Admin');


