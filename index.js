const express = require("express");
const bodyparser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

mongoose.Promise = global.Promise;

MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ToonList"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
});

const urlencoder = bodyparser.urlencoded({
    extended: false
});

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "secret key",
    resave: true,
    saveUninitialized: true,
    name: "ToonList"
}));