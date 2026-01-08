const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    Customer_Name: {
        type: String,
        required: true,
    },
    Mobile_Number:{
        type:Number,
        required:true,
    },
    customer_Email: {
        type: String,
        required: true,
    },
    customer_Password: {
        type: String,
        required: true,
    },
    Price:{
        type:Number,
        required:true,
    },
     Order: {
        type: String,
        required: true,
    },

     Payment_Method: {
        type: String,
        required: true,
    },
    order_ProfilePic: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Customer", customerSchema, "Customer");
