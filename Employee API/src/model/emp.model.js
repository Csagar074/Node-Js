const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name: String,
    age:Number,
    phone:Number,
    role:String,
    salary:Number,
    address:String
});

module.exports = mongoose.model('Employee', empSchema,'Employee');
