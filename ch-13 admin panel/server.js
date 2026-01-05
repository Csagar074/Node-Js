require("./config/db.config");
const express = require("express");
const path = require("path");
const PORT = 8001;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));   

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/admin.route"));

 app.listen(PORT,(err)=>{
    if(err){ 
        console.log("Server is Not Started....",err);
        return false;
    }
    console.log("Server is started...");
    
});
