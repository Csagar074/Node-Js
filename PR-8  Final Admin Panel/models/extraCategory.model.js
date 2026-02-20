
const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    extracategory_name: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    }
});

module.exports = mongoose.model('extraCategory', extraCategorySchema, 'extraCategory');
