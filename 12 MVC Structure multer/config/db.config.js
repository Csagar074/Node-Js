const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/Company-management-System";

mongoose.connect(url).then(() => {
    console.log("Database Connected Successfully...");
}).catch((err) => {
    console.log("Database Not Connected...", err);
});
