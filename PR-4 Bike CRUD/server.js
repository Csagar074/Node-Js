
const express = require('express');
const Bike = require('./model/Bike.model');
require('./Config/db.config');
require('./Config/db.config');

const PORT = 8001;
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use(express.static(__dirname)); 



// Home – Show All Bikes
app.get("/", async (req, res) => {
    const allBikes = await Bike.find();
    return res.render('viewbike' , {allBikes})
});

// Add Bike Form
app.get('/addBike', (req, res) => {
    res.render('form');
});

// Insert Bike
app.post("/addBike", (req, res) => {
    Bike.create(req.body)
        .then(() => {
            console.log("Bike added successfully...");
            res.redirect("/");
        })
        .catch((err) => {
            console.log("Bike not added...", err);
        });
});

//  Edit Bike logic
app.get("/editBike/:bikeId", async (req, res) => {
    const bike = await Bike.findById(req.params.bikeId);

    if (bike) {
        return res.render('edit', { bike });
    } else {
        return res.redirect('/');
    }
});

// Update Bike logic
app.post('/updateBike', async (req, res) => {
    await Bike.findByIdAndUpdate(
        req.body.id,
        req.body,
        { new: true }
    );

    console.log("Bike updated successfully...");
    res.redirect('/');
});

// Delete Bike logic
app.get("/deleteBike", (req, res) => {
    Bike.findByIdAndDelete(req.query.bikeId)
        .then(() => {
            console.log("Bike deleted successfully...");
            res.redirect("/");
        })
        .catch(err => {
            console.log("Bike not deleted", err);
        });
});

app.listen(PORT,(err)=>{
    if(err){
        console.log("Server is Not Started....");
        return false;
    }
    console.log("Server is Started.....");
    
})