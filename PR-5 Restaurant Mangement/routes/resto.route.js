const express = require('express');
const multer = require('multer');
const { customerFormPage, addcustomer, allcustomer, deletecustomer, updatecustomer, editcustomer } = require('../controllers/resto.controller');
const custoroute = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

console.log("Customer Routing....");
custoroute.get('/',customerFormPage);
custoroute.post('/addcusto', upload.single('order_ProfilePic'), addcustomer);
custoroute.get('/allcusto', allcustomer);

custoroute.get('/deletecusto/:id', deletecustomer)
custoroute.get('/edit/:id',updatecustomer)

custoroute.post('/updatecusto', upload.single('order_ProfilePic'), editcustomer)

module.exports = custoroute; 