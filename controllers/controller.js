const db = require(`../models/db.js`);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongodb = require(`mongodb`);

exports.renderHomePage = (req, res) => {
    res.render("index");
}

module.exports = controller; 