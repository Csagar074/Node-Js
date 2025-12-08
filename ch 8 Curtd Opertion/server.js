
const express = require('express');
const PORT = 8001;
const app = express();

let allUsers = [
    {
        Id: "201",
        Name: "Sagar Chavda",
        Email: "sagar.chavda963@gmail.com",
        Password: "Sagar@721",
        Phone: 9624459963,
        Address: "Surat , Gujarat",
    },
    {
        Id: "202",
        Name: "savan ladva",
        Email: "savanl@gmail.com",
        Password: "Savan@844",
        Phone: 9824458682,
        Address: "Mumbai , Maharastra",
    },
    {
        Id: "203",
        Name: "Anil Gediya",
        Email: "anig58@gmail.com",
        Password: "Anig@555",
        Phone: 9485566241,
        Address: "Talaja,Bhavnagar",
    },
    {
        Id: "204",
        Name: "Dhruvin Vala",
        Email: "dhruvin22gmail.com",
        Password: "Dhrubhai@256",
        Phone: 9275546856,
        Address: "Mavuva, Gujarat",
    },
    {
        Id: "205",
        Name: "Ronak Solanki",
        Email: "rona256@gmail.com",
        Password: "Itsrona@147",
        Phone: 9255866912,
        Address: "Christchurch, New Zealand",
    },
]

let id = 206;

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.render('table', {
        name: "Sagar",
        isAdmin: true,
        allUsers,
    });
})

app.get('/addUserPage', (req, res) => {
    res.render('form', {
        allUsers,
    });
})

app.get('/edit', (req, res) => {
    const user = allUsers.find((user) => user.Id == req.query.Id);
    if (!user) {
        return res.redirect('/');
    }
    res.render('edit', {
        user
    });
});

app.post('/updateUser', (req, res) => {
    allUsers = allUsers.map((user) => {
        if (user.Id == req.body.Id) {
            return req.body;
        }
        else {
            return user;
        }
    })
    return res.redirect('/');
})

app.get('/deleteUser', (req, res) => {
    console.log(req.query);

    const Userid = req.query.Id;

    allUsers = allUsers.filter((User) => User.Id != Userid);

    res.redirect('/addUserPage');
})


app.post('/addUser', (req, res) => {
    const user = req.body;

    user.Id = id;
    id++;

    allUsers.push(user);
    res.redirect('/');
})
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is Not started...", err);
        return false;
    }
    console.log("Server is Started.....");
})