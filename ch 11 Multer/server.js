const Book = require('./model/book.model')
require('./config/db.consig')
const path = require('path');
const fs = require('fs')
const multer = require('multer')
const express = require('express');
const app = express();
const PORT = 8001;

app.use(express.static(path.join(__dirname, "public")))
app.use('/images', express.static(path.join(__dirname, "images")))


app.set('view engine', "ejs")

// multer 
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "images/");
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + '-' + file.originalname);
    }
})

// multer middel ware 
const upload = multer({ storage })

// middle were 
app.use(express.urlencoded());


// table View Book 
app.get('/', async (req, res) => {

    const allbook = await Book.find();

    return res.render('table', { allbook })
})

// Add Book Form
app.get('/AddBookPage', (req, res) => {
    return res.render('form')
});

// Edit Book 
app.get('/bookEdit/:BookId', async (req, res) => {
    // console.log(req.params);

    const book = await Book.findById(req.params.BookId);

    // console.log(book);

    if (book) {
        return res.render('edit', { book });
    } else {
        return res.redirect('/');
    }

});

// Update Book
app.post('/BookUpdate', upload.single('BookImg'), async (req, res) => {

    if (req.file) {
        const bookData = await Book.findById(req.body.id)
        req.body.BookImg = req.file.path;
        fs.unlink(bookData.BookImg, (err) => { })

        const book = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });

        console.log("Update :", book);
        return res.redirect('/');
    } else {

        const book = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });

        console.log("Update :", book);
        return res.redirect('/');
    }

    return res.redirect('/');

})

// Delete Book 
app.get('/bookDelete', async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.query.BookId)

    fs.unlink(deletedBook.BookImg, (err) => { })

    if (deletedBook) {
        console.log("Book Deleted...");
    } else {
        console.log("Book Deletion Is faild..");
    }
    return res.redirect('/')
})

// add book 
app.post('/addBook', upload.single('BookImg'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    req.body.BookImg = req.file.path;

    const bookAdded = await Book.create(req.body);

    if (bookAdded) {
        console.log("Book inserted Successfully...");
    } else {
        console.log("Book insertion failed...");
    }

    return res.redirect('/');
})

// Server connect request 
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is Not Connected!!", err);
        return false;
    }
    console.log("Server is Started.....");

})