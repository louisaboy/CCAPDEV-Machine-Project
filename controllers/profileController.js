const express = require("express")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const Comment = require("../models/profileComment")
const bodyparser = require("body-parser")
const moment = require("moment")
const main = require("../routes/route.js");

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})
var sample = {
    user: false
}
router.use(urlencoder)

const profileController = {
    getProfile: function(req, res){
        console.log("Profile running...");
        user = req.params.id;
        var acc = {
            user: true,
            username: "",
            password: "",
            birthday: "",
            email: "",
            pfp: "",
        }
        
        User.getUser(user).then((newUser)=>{
        //  console.log(newUser)
        // console.log(newUser)
            Comment.getAllPosting(acc.username).then((comments)=>{
                console.log(newUser)
                acc.username = newUser.username,
                acc.password = newUser.password,
                acc.birthday = newUser.birthday,
                acc.email = newUser.email,
                acc.pfp = newUser.pfp,
                res.render('profile', {
                    layout: 'main',
                    style: 'profile-style.css',
                    headerStyle: 'header-style1.css',
                    users: acc,
                    username: acc.username,
                    password: acc.password,
                    birthday: acc.birthday,
                    email: acc.email,
                    pfp: acc.pfp,
                    profileComments: comments
            });
            })
        
        })
    },

    postComment: function(req, res){
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        console.log("wassup yo" + req.body.comment);
        var comment = {
            username: "sample",
            profile: req.params.id,
            comment: req.body.comment,
            like: 1,
            date: year+"-"+month+"-"+date
        }
        Comment.create(comment).then((result)=>{
            console.log('asdfasdf');
            console.log(result)
            // res.redirect("/profile/" + req.params.id);
            res.redirect('/profile/' + req.params.id)
        })
    }
}

module.exports = profileController;