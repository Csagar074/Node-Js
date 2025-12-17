
const express = require('express');
const book = require('./model/book.model');
require('mongoose');
require('./config/db.config')

const PORT = 8001;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
    book.find()
        .then((allBooks) => {
            res.render("view", { allBooks });
        })
        .catch(err => {
            console.log(err);
        });
})

app.get("/addBookPage", (req, res) => {
    res.render("form");
})

app.post("/addBook", (req, res) => {

    book.create(req.body).then(() => {
        console.log("Data added successfully...");
    }).catch((err) => {
        console.log("Data not added...", err);
    });

    res.redirect("/");
});

app.get("/deleteBook", (req, res) => {
    book.findByIdAndDelete(req.query.bookId)
        .then(() => {
            console.log("Book deleted successfully...");
        })
        .catch(err => {
            console.log("Book not deleted", err);
        })

    res.redirect("/");
});

app.listen(PORT, (err) => {
    if (err)
        console.log("Server is not started...", err);

    console.log("Server is started...");
})
