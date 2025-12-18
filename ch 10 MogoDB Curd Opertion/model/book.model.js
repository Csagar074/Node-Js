const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    book_name: {
        type: String,
        required: true,
    },
    book_author: {
        type: String,
        required: true,
    },
    book_price: {
        type: String,
        requried: true,
    },
    book_lang: {
        type: String,
        required: true,
    },
    book_image: {
        type: String,
        required: true,
    }
});

const book = mongoose.model("Book", bookSchema, "Books")

module.exports = book;