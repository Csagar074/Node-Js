const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategoriesPage,deletesubCategory,editCategoryPage,editCategory } = require('../controllers/subCategory.controller');
const upload = require('../middleware/category.multer.middleware');

const subCategoryRoute = express.Router();

subCategoryRoute.get('/addSubCategoryPage', addSubCategoryPage);
subCategoryRoute.post('/addSubCategory', addSubCategory);

subCategoryRoute.get('/viewSubCategoryPage', viewSubCategoriesPage);
subCategoryRoute.get('/viewSubCategoriesPage', viewSubCategoriesPage);

subCategoryRoute.get('/deletesubCategory', deletesubCategory);

subCategoryRoute.get('/editsubCategory/:categoryId', editCategoryPage);
subCategoryRoute.post('/editsubCategory/:categoryId', upload.single('category_image'), editCategory);

module.exports = subCategoryRoute;