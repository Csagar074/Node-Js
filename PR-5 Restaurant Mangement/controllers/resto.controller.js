const Customer = require('../models/resto.model')
const fs = require('fs');


const customerFormPage = (req, res) => {
    return res.render('customerForm');
}
const allcustomer = async (req, res) => {
    const allcusto = await Customer.find();
    return res.render('allcustomer', { allcusto });
}
const updatecustomer = async (req, res) => {
    const edit = await Customer.findById(req.params.id)
    return res.render('editcustomer', { edit })
}

// insert logic 
const addcustomer = async (req, res) => {

    try {
        req.body.order_ProfilePic = req.file.path;
        const allcusto = await Customer.create(req.body);

        if (allcusto) {
            console.log("Customer Added SuccessFully");
        } else {
            console.log("Customer Added Failed!");
        }

        return res.redirect('/allcusto');

    } catch (error) {
        console.log("Error In Customer", error);
    }
};

// Delte logic 
const deletecustomer = async (req, res) => {
    try {
        const deletecusto= await Customer.findByIdAndDelete(req.params.id);
         fs.unlink(deletecusto.order_ProfilePic, (err) => { })

        if (deletecusto) {
            console.log("Customer Deleted Successfully");
        } else {
            console.log("Customer Deletion Failed!");
        }
        return res.redirect('/allcusto');
    } catch (error) {
        console.log("Error In Deleting Customer", error);
    }
}
const editcustomer = async (req, res) => {
    console.log(req.body);

    if (req.file) {
        const editcusto = await Customer.findById(req.body.id)
        req.body.order_ProfilePic= req.file.path;
        fs.unlink(editcusto.order_ProfilePic, (err) => { })

        const updatecusto = await Customer.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (updatecusto) {
            console.log("Customer Updated Successfully");
        }
        else {
            console.log("Customer Updation Failed!");
        }
        return res.redirect('/allcusto');

    } else {
        const updatecusto = await Customer.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (updatecusto) {
            console.log("Customer Updated Successfully");
        }
        else {
            console.log("Customer Updation Failed!");
        }
        return res.redirect('/allcusto');
    }
}
module.exports = {
    customerFormPage,
    addcustomer,
    allcustomer,
    deletecustomer,
    updatecustomer,
    editcustomer
};