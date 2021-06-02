const express = require("express")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const bodyparser = require("body-parser")
const moment = require("moment")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.get("/", function(req, res){
    console.log("Profile running...");
    res.render('profile', {
        layout: 'main',
        style: 'profile-style.css',
        headerStyle: 'header-style1.css',
        // users: sample
    });
})

module.exports = router