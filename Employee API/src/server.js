require('dotenv').config();
const express = require('express');
require('./config/db.config');

const port = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/api', require('./routes/index'));

app.listen(port, (err) => { 
    if (err) {
        console.log("Server not started", err);
        return false;
    }
    console.log("Server is start");
});
  