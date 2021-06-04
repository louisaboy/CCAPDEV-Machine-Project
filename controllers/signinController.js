const express = require("express")
const router = express.Router();
const User = require("../models/user")
const Cartoon = require("../models/cartoons")
const Review = require("../models/cartoonReview")
const Comment = require("../models/profileComment")
const bodyparser = require("body-parser")
const homeController = require("./homeController")
const alert = require('alert');

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

const signinController = {
    getSignin: function(req, res){
        console.log("Sign-up running...");
        res.render('signup', {
            layout: 'main',
            style: 'signup-style.css',
            headerStyle: 'header-signup-style.css',
            users: req.session.user,
        });
    },
    getLogin: function(req, res){
        console.log("Log In running...");
        res.render('login', {
            layout: 'main',
            style: 'signup-style.css',
            headerStyle: 'header-signup-style.css',
            users: req.session.user,
        });
    },
    
    postRegister: function(req, res){
        var user = {
            username : req.body.signuser,
            password: req.body.signpass,
            birthday: req.body.signbday,
            email: req.body.signemail,
            pfp : req.body.signpic
        }
        console.log("2")
        User.getUser(user.username).then((result)=>{
            console.log(result);
            if(result)
                alert("Account already registered!");
            else
            {
                User.getUser(user.username).then((result)=>{
                    if(result)
                        alert("Account already registered!");
                    else
                    {
                        User.create(user).then((user)=>{
                            console.log(user)
                            req.session.user = {
                                user: true,
                                email: user.email,
                                username: user.username,
                                password: user.password,
                                birthday: user.birthday,
                                pfp: user.pfp
                            }
                            console.log(req.session.username + " Logged In Successfully")
                            res.redirect("/home");
                            res.render("index.hbs")
                        })
                    }
                        
                }) 
            }
        })
    },

    postLogin: function(req, res){
        
        let user = {
            email: req.body.logemail,
            password: req.body.logpass
        }
        // console.log("1");
        // console.log(user.email);
        
        console.log("1");
        User.authenticate(user).then((newUser)=>{
            // console.log(newUser);
            if(newUser){
                req.session.user = {
                    user: true,
                    email: user.email,
                    username: newUser.username,
                    password: newUser.password,
                    birthday: newUser.birthday,
                    pfp: newUser.pfp
                }
                console.log(req.session.email + " Logged In Successfully")
                res.redirect("/home");
                res.render("index.hbs")
            }
            else{
                alert("Invalid User/Password");
            }
        })
    }
    
    // ano to????
    // router.get("/pf/:email", function(req,res){
    //     User.getUser(req.params.email).then((newUser)=>{
    //         Post.getAll().then((posts)=>{
    //             Game.getAll().then((games)=>{
    //                 res.render("viewProfile.hbs", {
    //                     newUser, posts, games
    //                 })
    //             })
    //         })
            
    //     })
    // })
}

module.exports = signinController;