
const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");
const extraCategory = require("../models/extraCategory.model");
const Product = require("../models/product.model");
const fs = require('fs');

module.exports.addCategoryPage = (req, res) => {
    return res.render("category/addCategoryPage");
}

module.exports.addCategory = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    try {
        req.body.category_image = req.file.path;

        const newCategory = await Category.create(req.body);

        if (newCategory) {
            req.flash("success", "Category added successfully..");
        } else {
            req.flash("error", "Category addtion failed..");
        }

        return res.redirect('/category/addCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/addCategoryPage');
    }
}

module.exports.viewCategoriesPage = async (req, res) => {
    try {
        const allCategory = await Category.find();
        console.log(allCategory);
        return res.render('category/viewCategoryPage', { allCategory, admin: req.user });
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        console.log(req.query);

        const deletedCategory = await Category.findByIdAndDelete(req.query.categoryId);

        if (deletedCategory) {
            // Delete category image
            fs.unlink(deletedCategory.category_image, () => { });
            
            // Delete all subcategories related to this category
            await SubCategory.deleteMany({ category_id: req.query.categoryId });
            
            // Delete all extra categories related to this category
            await extraCategory.deleteMany({ category_id: req.query.categoryId });
            
            // Delete all products related to this category
            const deletedProducts = await Product.find({ category_id: req.query.categoryId });
            deletedProducts.forEach(product => {
                if (product.product_img) fs.unlink(product.product_img, () => { });
            });
            await Product.deleteMany({ category_id: req.query.categoryId });
            
            req.flash('success', `${deletedCategory.category_name} category and all related data deleted`);
        } else {
            req.flash('error', `Category deletion failed`);
        }

        return res.redirect('/category/viewCategoriesPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}

module.exports.editCategoryPage = async (req, res) => {
    try {
        console.log(req.params);

        const singleCategory = await Category.findById(req.params.categoryId);

        return res.render('category/editCategoryPage', { singleCategory });

    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {
            req.body.category_image = req.file.path;
        }

        const updateCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body);

        if (updateCategory) {
            if (req.file) fs.unlink(updateCategory.category_image, () => { });

            req.flash('success', `Category is updated`);
        } else {
            req.flash('error', `Category is updation failed`);
        }

        return res.redirect('/category/viewCategoriesPage');


    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/category/viewCategoriesPage');
    }
}
