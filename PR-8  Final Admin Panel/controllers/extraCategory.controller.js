const extraCategory = require("../models/extraCategory.model");
const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");

module.exports.addextraCategoryPage = async (req, res) => {
    try {
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();

        return res.render('extraCategory/addextraCategoryPage', { allCategory, allSubCategory });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/extraCategory/addextraCategoryPage');
    }
}

module.exports.addextraCategory = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const newextraCategory = await extraCategory.create(req.body);
        if (newextraCategory) {
            req.flash('success', 'extraCategory Inserted Successfully..');
        } else {
            req.flash('error', 'extraCategory Insertion Failed..');
        }
        return res.redirect('/extraCategory/addextraCategoryPage');
    } catch (err) {
        console.log("Error in addextraCategory: ", err);
        req.flash('error', err.message || "Something went wrong !!");
        return res.redirect('/extraCategory/addextraCategoryPage');
    }
}

module.exports.viewextraCategoriesPage = async (req, res) => {
    try {
        const allextraCategory = await extraCategory.find().populate('category_id').populate('subcategory_id');
        return res.render('extraCategory/viewextraCategoryPage', { allextraCategory, admin: req.user });
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/viewextraCategoryPage');
    }
}

module.exports.deleteextraCategory = async (req, res) => {
    try {
        const deletedextraCategory = await extraCategory.findByIdAndDelete(req.query.extracategoryId);
        if (deletedextraCategory) {
            req.flash('success', `Extra category deleted successfully`);
        } else {
            req.flash('error', `Deletion failed`);
        }
        return res.redirect('/extraCategory/viewextraCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        return res.redirect('/extraCategory/viewextraCategoryPage');
    }
}

module.exports.editextraCategoryPage = async (req, res) => {
    try {
        console.log(req.params);

        const singleCategory = await extraCategory.findById(req.params.categoryId).populate('category_id').populate('subcategory_id');
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();

        return res.render('extraCategory/editextraCategoryPage', { singleCategory, allCategory, allSubCategory });

    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/viewextraCategoryPage');
    }
}

module.exports.editextraCategory = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);

        const updateCategory = await extraCategory.findByIdAndUpdate(req.params.categoryId, req.body);

        if (updateCategory) {
            req.flash('success', `Extra Category is updated`);
        } else {
            req.flash('error', `Extra Category updation failed`);
        }

        return res.redirect('/extraCategory/viewextraCategoryPage');

    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/extraCategory/viewextraCategoryPage');
    }
}