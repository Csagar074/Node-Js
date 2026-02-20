
const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");

module.exports.addSubCategoryPage = async (req, res) => {
    try {
        const allCategory = await Category.find();
        return res.render('subcategory/addSubCategoryPage', { allCategory });
    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/addSubCategoryPage');
    }
}

module.exports.addSubCategory = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const newSubCategory = await SubCategory.create(req.body);

        if (newSubCategory) {
            req.flash('success', 'SubCategory Inserted Successfully..');
        } else {
            req.flash('error', 'SubCategory Insertion Failed..');
        }
        return res.redirect('/subCategory/addSubCategoryPage');

    } catch (err) {
        console.log("Error in addSubCategory: ", err);
        req.flash('error', err.message || "Something went wrong !!");
        return res.redirect('/subCategory/addSubCategoryPage');
    }
}

module.exports.viewSubCategoriesPage = async (req, res) => {
    try {

        const allSubCategory = await SubCategory.find().populate('category_id', "category_name category_image");

        console.log(allSubCategory);

        return res.render("subcategory/viewSubCategoryPage", { allSubCategory });

    } catch (err) {
        console.log("Error : ", err);
        req.flash('error', "Something went wrong !!");
        return res.redirect('/subCategory/addSubCategoryPage');
    }
}
module.exports.deletesubCategory = async (req, res) => {
    try {
        console.log(req.query);

        const deletedsubCategory = await SubCategory.findByIdAndDelete(req.query.subcategoryId);

        if (deletedsubCategory) {
            req.flash('success', `${deletedsubCategory.subcategory_name} Sub category is deleted`);
        } else {
            req.flash('error', `Sub category is deletion failed`);
        }

        return res.redirect('/subCategory/viewSubCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}
module.exports.editCategoryPage = async (req, res) => {
    try {
        console.log(req.params);

        const singleCategory = await SubCategory.findById(req.params.categoryId).populate('category_id', "category_name category_image");
        const allCategory = await Category.find();

        return res.render('subcategory/editSubCategoryPage', { singleCategory, allCategory });

    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/subCategory/viewSubCategoryPage');
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {
            req.body.subcategory_image = req.file.path;
        }

        const updateCategory = await SubCategory.findByIdAndUpdate(req.params.categoryId, req.body);

        if (updateCategory) {
            if (req.file) fs.unlink(updateCategory.subcategory_image, () => { });

            req.flash('success', `Sub Category is updated`);
        } else {
            req.flash('error', ` Sub Category is updation failed`);
        }

        return res.redirect('/subcategory/viewSubCategoriesPage');


    } catch (err) {
        req.flash('error', "Something went wrong !!");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/subcategory/viewSubCategoriesPage');
    }
}