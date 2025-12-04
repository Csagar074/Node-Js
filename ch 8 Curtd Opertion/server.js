
const express = require('express');
const PORT = 8001;
const app = express();

let allUsers = [
    {
        Id: "201",
        Name: "Sagar Chavda",
        Email: "sagarchavda963@gmail.com",
        Password: "Sagar@721",
        Phone: 9624459963,
        Address: "Surat , Gujarat",
    },
    {
        Id: "202",
        Name: "Dhruvin vala",
        Email: "dr22@gmail.com",
        Password: "dhruvin@123",
        Phone: 9776545811,
        Address: "Mahuva ,Bhavnagar",
    },
    {
        Id: "203",
        Name: "Darshan Parmar",
        Email: "dharshan14@gmail.com",
        Password: "Dp27@123",
        Phone: 9276847417,
        Address: "Rajula, bhavnagar",
    },
    {
        Id: "204",
        Name: "savan ladva",
        Email: "savan99@gmail.com",
        Password: "Savan@123",
        Phone: 9909451987,
        Address: "Mumbai,Maharasth",
    },
    {
        Id: "205",
        Name: "Ronak Solanki",
        Email: "ronaks444@gmail.com",
        Password: "Ronak125@12",
        Phone: 9265612346,
        Address: "Ahemdabad,gujarat",
    },
]

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.render('home', {
        name: "Sagar",
        isAdmin: true,
        allUsers,
    });
})

let id = 206;
app.post('/addUser', (req, res) => {
    const user = req.body;

    user.Id = id;
    id++;
    console.log(req.query)
    console.log(user)

    allUsers.push(user);
    res.redirect('/');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is Not started....", err);
        return false;
    }
    console.log("Sever is started......");
})
