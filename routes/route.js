const express = require("express")
// const route = express.Router();
// const User = require("../models/user")
// const Cartoon = require("../models/cartoons")
// const Review = require("../models/cartoonReview")
// const Comment = require("../models/profileComment")

const app =  express()


const homeController = require("../controllers/homeController")
const cartoonController = require("../controllers/cartoonController")
const listController = require("../controllers/listController")
const profileController = require("../controllers/profileController")
const signinController = require("../controllers/signinController")
const viewAllController = require("../controllers/viewAllController")
const settingController = require("../controllers/settingController")

// Index Page 
app.get("/", homeController.getIndex);
app.get("/home", homeController.getIndex);
app.get("/index", homeController.getIndex);

// Sign In Page
app.get("/signup", signinController.getSignin);
app.post("/login", signinController.postLogin)
app.post("/register", signinController.postRegister)

// Cartoon Info Page
app.get("/cartoon-info/:cartoon", cartoonController.getCartoon);

// Cartoon List Page
app.get("/list/", listController.getList);

// View All Cartoons Page
app.get("/all-cartoons", viewAllController.getAllCartoons);

// Settings Page
app.get("/settings/", settingController.getSetting);

// Profile Page
app.get("/profile/:user", profileController.getProfile);

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

app.get("/logout", function(req,res){
    res.redirect("/")
})

module.exports = app