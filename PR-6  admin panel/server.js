const express = require('express');
const path = require('path');
require('./config/db.config');

const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8001;

// ================= VIEW ENGINE ================= 
app.set('view engine', 'ejs');

// ================= MIDDLEWARE ================= 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folders 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cookies  
app.use(cookieParser());

// ================= ROUTES =================
app.use('/', require('./routes/admin.route'));

// ================= SERVER =================
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is Not Started.....", err);
        return;
    }
    console.log('Server is Started.....');
});
