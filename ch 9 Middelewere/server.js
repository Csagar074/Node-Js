const express = require('express');
const PORT = 8001;
const app = express();

app.set('view engine', "ejs");
app.use(express.static(__dirname + "/public"));

// ----------- ROUTES -------------
app.get('/', (req, res) => {
    res.render("ageCheck");
});

const middleware = (req, res, next) => {
    if (req.query.age >= 18) {
        next();
    } else {
        return res.redirect('/404');
    }
};

app.get('/home', middleware, (req, res) => {
    res.render("home");
});

app.get('/404', (req, res) => {
    res.render("404");
});

// ----------- SERVER START -------------
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is Not Started......", err);
        return false;
    }
    console.log(`Server is Started......`);
});
