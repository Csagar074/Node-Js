
const Mongoose = require('mongoose')
const url = "mongodb://localhost:27017/Book-management";

Mongoose.connect(url).then(() => {
    console.log("MongoDB Connected .....");
}).catch((error) => {
    console.log("MongoDB Connection Fail.....", error);
});
