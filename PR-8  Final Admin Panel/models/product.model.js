
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true },
    description: { type: String },
    old_price: { type: Number, default: null },
    new_price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    extraCategory_id: { type: mongoose.Schema.Types.ObjectId, ref: 'extraCategory', required: true },
    product_img: { type: String }
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
