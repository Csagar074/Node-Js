
const express = require('express');
const upload = require('../middleware/category.multer.middleware');
const { addProductPage, addProduct, viewProductPage, deleteProduct, editProductPage, editProduct } = require('../controllers/product.controller');

const productRoute = express.Router();

productRoute.get('/addProductPage', addProductPage);
productRoute.post('/addProduct', upload.single('product_img'), addProduct);

productRoute.get('/viewProductPage', viewProductPage);

productRoute.get('/deleteProduct/:id', deleteProduct);

productRoute.get('/editProduct/:id', editProductPage);
productRoute.post('/editProduct/:id', upload.single('product_img'), editProduct);

module.exports = productRoute;
