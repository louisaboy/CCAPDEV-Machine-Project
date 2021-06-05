const express = require("express")
const route = express.Router();
const User = require("../models/user")
const Cartoon = require("../models/cartoons")
const Review = require("../models/cartoonReview")
const Comment = require("../models/profileComment")

const app =  express()

const homeController = require("../controllers/homeController")
const cartoonController = require("../controllers/cartoonController")
const listController = require("../controllers/listController")
const profileController = require("../controllers/profileController")
const signinController = require("../controllers/signinController")
const viewAllController = require("../controllers/viewAllController")
const settingController = require("../controllers/settingController")

// Index Page 
route.get("/", homeController.getIndex);
route.get("/home", homeController.getHome);
route.get("/index", homeController.getIndex);

// Sign In Page
route.get("/signup", signinController.getSignin);
route.get("/login", signinController.getLogin)
route.post("/login", signinController.postLogin)
route.post("/signup", signinController.postRegister)

// Cartoon Info Page
route.get("/cartoon-info/:id", cartoonController.getCartoon);
route.post("/cartoon-info/:id", cartoonController.postComment);

// Cartoon List Page
route.get("/list/:id", listController.getList);

// View All Cartoons Page
route.get("/all-cartoons", viewAllController.getAllCartoons);
route.get("/all-cartoons/by-release-date", viewAllController.getByReleaseDate);
route.get("/all-cartoons/by-popularity", viewAllController.getByPopularity);
route.get("/all-cartoons/:search", viewAllController.getSearch);

// Settings Page
route.get("/settings/:id", settingController.getSetting);
route.post("/settings/:id", settingController.postSetting);
route.get("/settings/delete/:id", settingController.getDelete);

// Profile Page
route.get("/profile/:id", profileController.getProfile);
route.post("/profile/:id", profileController.postComment);

// var cur_user = {
//     user: false,
//     username: "",
//     password: "",
//     birthday: "",
//     email: "",
//     pfp: "",
// }
var isLoggedIn = false;

route.get("/logout", function(req,res){
    
    req.session.destroy()
    res.redirect("/")
})

module.exports = route