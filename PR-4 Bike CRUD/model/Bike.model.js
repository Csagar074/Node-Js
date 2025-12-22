const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
     bike_image: {
        type: String,
        required: true
    },
    bike_name: {
        type: String,
        required: true
    },
    bike_brand: {
        type: String,
        required: true
    },
    bike_price: {
        type: Number,
        required: true
    },
     bike_color: {
        type: String,
        required: true
    },
     bike_engine: {
        type: Number,
        required: true
    },
     bike_launch:{
        type: Number,
        required: true
    },
});

const Bike = mongoose.model("Bike", bikeSchema, "Bikes")

module.exports = Bike;