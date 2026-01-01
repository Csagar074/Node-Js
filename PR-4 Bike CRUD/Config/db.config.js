const mongoose = require('mongoose');

const URL = "mongodb://localhost:27017/Bike-information"
mongoose.connect(URL).then(() => {
    console.log("MongoDb is Connected......");
}).catch((err) => {
    console.log("MongoDb is faelde.......");
});