const express = require('express');
const { home, about } = require('../controllers/home.controller');
const routes = express.Router();

console.log('routing..');

routes.get('/', home);
routes.get('/about', about);

module.exports = routes;