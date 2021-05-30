const express = require('express');
const cloudinary = require("../util/cloud");
const upload = require("../util/multer");
const controller = require('../controllers/controller.js');

const route = express();

// Renders/redirects page
route.get('/', controller.getIndex);
route.get('/signup', controller.getSignup);
route.get('/cartoon-info', controller.getCartoonInfo);
route.get('/all-cartoons', controller.getAllCartoons);
route.get('/profile', controller.getProfile);
route.get('/settings', controller.getSettings);
// route.get('/Login', controller.loginUser);

module.exports = route;