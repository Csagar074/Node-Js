const express = require('express');
const multer = require('multer');
const { empPage, addEmp, allEmployee, deleteEmp, updateEmp, editEmp } = require('../controllers/emp.controller');
const EmpRoutes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

console.log("Employee Routing....");
EmpRoutes.get('/employee', empPage);
EmpRoutes.post('/addEmp', upload.single('emp_ProfilePic'), addEmp);
EmpRoutes.get('/allEmp', allEmployee);

EmpRoutes.get('/delete/:id', deleteEmp)
EmpRoutes.get('/edit/:id', updateEmp)

EmpRoutes.post('/UpdateEmp', upload.single('emp_ProfilePic'), editEmp)

module.exports = EmpRoutes;