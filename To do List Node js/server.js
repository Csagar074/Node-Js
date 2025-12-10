
const express = require("express");
const app = express();

const PORT = 8001;
app.set("view engine", "ejs");
app.use(express.urlencoded());

let allUser = [
    {
        id: 701,
        name: "Sagar Chavda",
        age:25,
    },
    {
        id: 702,
        name: "Savan ladva",
        age:24,
    },
    {
        id: 703,
        name: "Uday vora",
        age:23,
    },
]

let id = 704;

app.get("/", (req, res) => {

    res.render("view", {
        allUser
    });

});

app.get("/addUser", (req, res) => {
    res.render("form");
})

// add task logic 
app.post("/addUser", (req, res) => {
    const user = req.body;
    console.log(user);
    

    user.id = id;
    id++;

    allUser.push(user);

    res.redirect("/");
})

// delete task logic 
app.get("/deleteUser", (req, res) => {
    let taskId = req.query.id;
    // console.log(taskId);

    allUser = allUser.filter((user) => user.id != taskId);

    res.redirect("/");
})  
// update task logic 
app.get("/editUser", (req, res) => {
    const user = allUser.find((user) => user.id == req.query.id);

    if (!user) res.redirect("/");

    return res.render("edit", {
        user
    });

});

app.post("/updateUser", (req, res) => {

    console.log(req.body);


    allUser = allUser.map((user) => {
        if (user.id == req.body.id)
            return req.body;
        else
            return user;
    })

    res.redirect("/");
})

app.listen(PORT, (err) => {
    if (err)
        return console.log("Server is not started...");

    console.log("Server is Started...");
});
