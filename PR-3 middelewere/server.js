
const express = require('express');
const app = express();
const port = 8001;

app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/Public"));


app.get('/', (req, res) => {
    res.render("ageCheck");
});

const middle = (req, res, next) => {

    if (req.query.age >= 18) {
        next();
    } else {
        return res.redirect('/404');
    }
}

app.get('/home', middle, (req, res) => {
    res.render("home");
})

app.get('/404', (req, res) => {
    res.render("404");
})


app.listen(port, (err) => {
    if (err) {
        console.log("Server is Not Started...", err);
    }
    console.log("Sever is started.....");
})
