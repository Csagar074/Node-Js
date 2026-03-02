
const Product = require('../models/product.model');
const extraCategory = require("../models/extraCategory.model");
const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");
const fs = require('fs');

module.exports.addProductPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await extraCategory.find();
        return res.render('product/addProductPage', { admin, currentPath: req.originalUrl.split('?')[0], allCategory, allSubCategory, allExtraCategory });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/addProductPage');
    }
}

module.exports.addProduct = async (req, res) => {
    try {
        // Validation: Old price and new price should not be same
        if (req.body.old_price && req.body.new_price && req.body.old_price === req.body.new_price) {
            req.flash('error', 'Old Price and New Price cannot be the same!');
            return res.redirect('/product/addProductPage');
        }

        if (req.file) req.body.product_img = req.file.path;
        const newProduct = await Product.create(req.body);
        if (newProduct) req.flash('success', 'Product added successfully !!'); else req.flash('error', 'Failed to add Product !!');
        return res.redirect('/product/addProductPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/addProductPage');
    }
}

module.exports.viewProductPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allProduct = await Product.find().populate('category_id').populate('subcategory_id').populate('extraCategory_id');
        return res.render('product/viewProductPage', { admin, currentPath: req.originalUrl.split('?')[0], allProduct });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (deleted) {
            if (deleted.product_img) { try { fs.unlinkSync(deleted.product_img); } catch (e) { /* ignore */ } }
            req.flash('success', `${deleted.product_name} Product Deleted Successfully..`);
        } else {
            req.flash('error', 'Product Deletion Failed..');
        }
        return res.redirect('/product/viewProductPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}

module.exports.editProductPage = async (req, res) => {
    try {
        const productData = await Product.findById(req.params.id).populate('category_id').populate('subcategory_id').populate('extraCategory_id');
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await extraCategory.find();
        return res.render('product/editProductPage', { productData, allCategory, allSubCategory, allExtraCategory, currentPath: req.originalUrl.split('?')[0] });
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        // Validation: Old price and new price should not be same
        if (req.body.old_price && req.body.new_price && req.body.old_price === req.body.new_price) {
            req.flash('error', 'Old Price and New Price cannot be the same!');
            return res.redirect(`/product/editProduct/${req.params.id}`);
        }

        if (req.file) {
            // Get old product data before update
            const oldProduct = await Product.findById(req.params.id);
            const oldImagePath = oldProduct.product_img;

            // Set new image path
            req.body.product_img = req.file.path;

            // Update product with new data
            const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (updated) {
                // Delete old image if it exists
                if (oldImagePath && fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.log("Error deleting old image:", err);
                        else console.log("Old image deleted:", oldImagePath);
                    });
                }
                req.flash('success', `${req.body.product_name || updated.product_name} Product Updated Successfully..`);
            } else {
                req.flash('error', 'Product Updation Failed..');
            }
        } else {
            const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updated) {
                req.flash('success', `${req.body.product_name || updated.product_name} Product Updated Successfully..`);
            } else {
                req.flash('error', 'Product Updation Failed..');
            }
        }
        return res.redirect('/product/viewProductPage');
    } catch (error) {
        console.log('Error : ', error);
        req.flash('error', 'Something went wrong !!');
        return res.redirect('/product/viewProductPage');
    }
}
