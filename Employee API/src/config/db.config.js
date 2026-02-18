const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("MongoDB Connected...");
}).catch((err) => {
    console.log("MongoDB Connection Failed", err);
});
