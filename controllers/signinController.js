const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Cartoon = require("../models/cartoons")
const Review = require("../models/cartoonReview")
const Comment = require("../models/profileComment")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

function regValidation(user, confirmPass){
    if(user.username && user.email && user.birthday && user.pfp && user.password == confirmPass){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
            if(!/[^a-zA-Z0-9]/.test(user.firstName) && !/[^a-zA-Z0-9]/.test(user.lastName)){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

function validation(user){
    if(user.email && user.password){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

const signinController = {
    getSignin: function(req, res){
        console.log("Sign-up running...");
        
        res.redirect('/login');
    },
    
    postRegister: function(req, res){
        var user = {
            username : req.body.signup-user,
            password: req.body.signup-pass,
            birthday: req.body.signup-bday,
            email: req.body.signup-email,
            pfp : req.body.signup-pic
        }
    },

    postLogin: function(req, res){
        res.render('signup', {
            layout: 'main',
            style: 'signup-style.css',
            headerStyle: 'header-signup-style.css',
            // users: sample
        });
        // let user = {
        //     email: req.body.email,
        //     password: req.body.password
        // }
        // console.log("1");
        // console.log(user.email);
        // if(validation(user)){
        //     User.authenticate(user).then((newUser)=>{
        //         if(newUser){
        //             req.session.email = user.email
        //             console.log(req.session.email)
        //             res.redirect("/game/games")
        //             res.render("index.hbs")
        //         }
        //         else{
        //             User.getUser(user.email).then((newUser)=>{
        //                 req.session.errors = []
        //                 if(!newUser)
        //                     req.session.errors.push({"container-id": "email","message": "Invalid email address"})
        //                 else
        //                     req.session.errors.push({"container-id": "password","message": "Password is incorrect"})
            
        //                 req.session.savedinput = [{"container-id": "email", "content": user.email}]
        //                 res.redirect("/register")
        //             })
        //         }
        //     }, (error)=>{
        //         res.sendFile(error)
        //     })
        // }
        
        // else{
        //     User.getUser(user.email).then((newUser)=>{
        //         req.session.errors = []
        //         if(!newUser)
        //             req.session.errors.push({"container-id": "email","message": "Invalid email address"})
        //         else
        //             req.session.errors.push({"container-id": "password","message": "Password is incorrect"})
    
        //         req.session.savedinput = [{"container-id": "email", "content": user.email}]
        //         res.redirect("/user/loginpage")
        //     })
        // }
        // db.findOne(`users`, {idnum: idnum}, function (result) {
        //     if (result) {
        //         // password checking
        //         bcrypt.compare(password, result.password, function (err, equal) {
        //             if (equal) {
        //                 req.session.idnum = result.idnum;
        //                 req.session.username = result.username;
        //                 req.session.password = result.password;

        //                 console.log(`You have successfully logged in ` + result.username);
        //                 res.redirect(`/Home`);
        //             }
        //             else {
        //                 console.log(`Invalid credentials`);
        //                 res.render(`Login`);
        //             }
        //         });
        //     }
        //     else {
        //         console.log(`Invalid credentials`);
        //         var content =
        //         {
        //             error:"Invalid Credentials"
        //         }
        //         res.render(`Login`,content);
        //     }
        // });
    },
    
    getLogin: function(req,res){
        var errors = req.session.errors
        var savedinput = req.session.savedinput
        req.session.errors = null
        req.session.savedinput = null
        res.render('signup', {
            layout: 'main',
            style: 'signup-style.css',
            headerStyle: 'header-signup-style.css',
            users: sample
        });
        // res.render("signup.hbs", {errors, savedinput})
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