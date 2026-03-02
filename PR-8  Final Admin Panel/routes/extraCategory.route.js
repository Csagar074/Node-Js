const express = require('express');
const upload = require('../middleware/category.multer.middleware');
const extraCategory = express.Router();
const { addextraCategoryPage, addextraCategory, viewextraCategoriesPage, deleteextraCategory,editextraCategoryPage,editextraCategory } = require('../controllers/extraCategory.controller');

extraCategory.get('/addextraCategoryPage', addextraCategoryPage);
extraCategory.post('/addextraCategory', addextraCategory);

extraCategory.get('/viewextraCategoryPage', viewextraCategoriesPage);

extraCategory.get('/deletextraCategory', deleteextraCategory);


extraCategory.get('/editextraCategory/:categoryId', editextraCategoryPage);
extraCategory.post('/editextraCategory/:categoryId', upload.single('category_image'), editextraCategory);

module.exports = extraCategory;