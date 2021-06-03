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

<<<<<<< HEAD
const settingController = {
    getSetting: function(req, res){
        console.log("Settings running...");
        res.render('settings', {
            layout: 'main',
            style: 'settings-style.css',
            headerStyle: 'header-style1.css',
            // users: sample
        });
    }
}
=======
router.get("/", function(req, res){
    console.log("Settings running...");
    res.render('settings', {
        layout: 'main',
        style: 'settings-style.css',
        headerStyle: 'header-signup-style.css',
        // users: sample
    });
})
>>>>>>> 087f9456fc3e59502b063b5c7445e2d7f04fa353

module.exports = settingController;