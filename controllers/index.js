const express = require("express")
const route = express.Router();
const User = require("../models/user")
const Cartoon = require("../models/cartoons")
const Review = require("../models/cartoonReview")
const Comment = require("../models/profileComment")

const app =  express()

// route.use("/cartoon-info", require("./cartoonController"))
route.use("/", require("./homeController"))
route.use("/home", require("./homeController"))
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
    
    
});

route.get("/logout", function(req,res){
    res.redirect("/")
})

module.exports = route