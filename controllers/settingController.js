const express = require("express")
const crypto = require("crypto")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const bodyparser = require("body-parser")
const moment = require("moment")
const main = require("../routes/route.js");

const app = express()
var sample = {
    user: false
}
const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

const settingController = {
    getSetting: function(req, res){
        console.log("asdfasdf " + req.params.id)    
        User.getUser(req.params.id).then((user)=>{
                console.log(user);
                console.log("Settings running...");
                if(typeof(req.session.user) != 'undefined')
                {
                    res.render('settings', {
                        layout: 'main',
                        style: 'settings-style.css',
                        headerStyle: 'header-style1.css',
                        users: req.session.user,
                        username: user.username,
                        email: user.email,
                    });
                }
                else{
                    res.redirect("/");
                }
                
            })
    },

    postSetting: function(req, res){
        User.getUser(req.params.id).then((user)=>{
            console.log(user)
            const temp = {
                _id: user._id,
                username: req.body.username,
                password: crypto.createHash("md5").update(req.body.password).digest("hex"),
                birthday: req.body.birthday,
                email: req.body.email,
                pfp: req.body.pfp,
                __v: user.__v
            }
            console.log("ito yung data: "+temp.username);
            console.log("Settings running...");
            User.edit(user._id, temp).then((change)=>{
                req.session.user = {
                    user: true,
                    email: change.email,
                    username: change.username,
                    password: change.password,
                    birthday: change.birthday,
                    pfp: change.pfp
                }
                res.render('settings', {
                    layout: 'main',
                    style: 'settings-style.css',
                    headerStyle: 'header-style1.css',
                    users: req.session.user,
                    username: req.session.user.username,
                    email: req.session.user.email,
                });
            })
        })
    },

    getDelete: function(req, res) {
        User.delete(req.params.id).then((user)=>{
            res.redirect("/");
            res.render("index.hbs");
        })
    }
}

module.exports = settingController;