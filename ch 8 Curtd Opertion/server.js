
const express = require('express');
const PORT = 8001;
const app = express();

let allUsers = [
    {
        Id: "201",
        Name: "sagar chavda",
        Email: "sagarchavda963@gmail.com",
        Password: "sagar@0721",
        Phone: 9624459963,
        Address: "Surat , Gujarat",
    },
    {
        Id: "202",
        Name: "savan Ladva",
        Email: "savanl74@gmail.com",
        Password: "savan@441",
        Phone: 515585486,
        Address: "Mumbai , Maharastra",
    },
    {
        Id: "203",
        Name: "shrushti vala",
        Email: "sjvala14@gmail.com",
        Password: "shrushti@123",
        Phone: 9627658246,
        Address: "Mubai ,Maharastra",
    },
    {
        Id: "204",
        Name: "Dhruvin kavad",
        Email: "dhruvin@gmail.com",
        Password: "ddkavad@744",
        Phone: 9724622578,
        Address: "Mahuva, Bhavnagar",
    },
    {
        Id: "205",
        Name: "sharad Gediya",
        Email: "sharadgediya@gmail.com",
        Password: "sgediya@844",
        Phone: 9425556788,
        Address: "Varjevilla, Motavaracha",
    },
]

app.set("view engine", "ejs");
app.get('/', (req, res) => {
    res.render('home', {
        name: "Sagar",
        isAdmin: true,
        allUsers,
    });
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is Not started.....", err);
        return false;
    }
    console.log("Server is started.... ");
})
