const mongoose = require('mongoose');

const BookManage = mongoose.Schema({
    BookName: {
        type: String,
        require: true,
    },
    BookAuth: {
        type: String,
        require: true,
    },
    BookPrice: {
        type: String,
        require: true,
    },
    BookLang: {
        type: String,
        require: true,
    },
    BookImg: {
        type: String,
        require: true,
    },
});

const Book = mongoose.model("book", BookManage, "Books");

module.exports = Book;