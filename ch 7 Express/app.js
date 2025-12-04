const express = require('express');
const fs = require('fs');

const app = express();

// Home Route
app.get('/', (req, res) => {
    fs.readFile('index.html', (err, result) => {
        if(err) return res.end("File not found!");
        res.write(result);
        res.end();
    });
});

// About Route
app.get('/about', (req, res) => {
    fs.readFile('about.html', (err, result) => {
        if(err) return res.end("File not found!");
        res.write(result);
        res.end();
    });
});

// Blog Route
app.get('/blog', (req, res) => {
    fs.readFile('blog.html', (err, result) => {
        if(err) return res.end("File not found!");
        res.write(result);
        res.end();
    });
});

// Services Route
app.get('/service', (req, res) => {
    fs.readFile('service.html', (err, result) => {
        if(err) return res.end("File not found!");
        res.write(result);
        res.end();
    });
});

// Contact Route
app.get('/contact', (req, res) => {
    fs.readFile('contact.html', (err, result) => {
        if(err) return res.end("File not found!");
        res.write(result);
        res.end();
    });
});


// Server
app.listen(9000, (err) => {
    if (err) {
        console.log("Server is not created...", err);
        return;
    }
    console.log("Server running on http://localhost:9000");
});
