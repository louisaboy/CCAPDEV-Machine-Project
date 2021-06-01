const express = require("express")
const route = express.Router();
const User = require("../models/user")
const Cartoon = require("../models/cartoons")

const app =  express()

// route.use("/cartoon-info", require("./cartoonController"))
// route.use("/home", require("./homeController"))
// route.use("/list", require("./listController"))
// route.use("/profile", require("./profileController"))
route.use("/signin", require("./signinController"))
// route.use("/viewAll", require("./viewAllController"))

route.get("/", function(req,res){
    var errors = req.session.errors
    var savedinput = req.session.savedinput
    req.session.errors = null
    req.session.savedinput = null
    console.log("GET /")
    Cartoon.getTitle("SpongeBob SquarePants").then((exists)=>{
        console.log(exists);
    })
    // user = {
    //     username: "NakanoNino",
    //     password: "Ninoooo0505",
    //     birthday: 2002-05-04,
    //     email: "ninonakano@gmail.com",
    //     pfp: ""
    // }
    // User.create(user).then((user)=>{
    //     console.log(user)
    // }),
    res.render("signup.hbs", {
        errors, 
        savedinput,
        layout: 'main',
        style: 'signup-style.css',
        headerStyle: 'header-signup-style.css'
        // users: sample
    })
});

route.get("/logout", function(req,res){
    res.redirect("/")
})

module.exports = route