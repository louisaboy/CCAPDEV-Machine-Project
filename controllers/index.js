const express = require("express")
const route = express.Router();
// const User = require("../models/user")
// const Cartoon = require("../models/cartoons")
// const Review = require("../models/cartoonReview")
// const Comment = require("../models/profileComment")

const app =  express()


route.use("/", require("./homeController"))
route.use("/home", require("./homeController"))
route.use("/cartoon-info", require("./cartoonController"))
route.use("/list", require("./listController"))
route.use("/profile", require("./profileController"))
route.use("/signup", require("./signinController"))
route.use("/all-cartoons", require("./viewAllController"))
route.use("/settings", require("./settingController"))

// route.get(`/cartoon-info`, cartoonController.get);
// route.get("/cartoon-info", function(req, res) {
//     console.log("cartoon-info");
// });
// route.get('/cartoon-info', function(req,res){
//     res.render('cartoon-info.hbs', {
//         layout: 'main',
//         style: 'cartoon-style.css',
//         headerStyle: 'header-style.css'
//         // users: sample
//     });
// });

// route.get("/", function(req,res){
//     var errors = req.session.errors
//     var savedinput = req.session.savedinput
//     req.session.errors = null
//     req.session.savedinput = null
//     console.log("GET /")
//     Cartoon.getTitle("SpongeBob SquarePants").then((exists)=>{
//     console.log(exists);
// })
//     // console.log(cur_user.user);
// })

route.get("/logout", function(req,res){
    res.redirect("/")
})

module.exports = route