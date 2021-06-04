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

// Cartoon List Page
route.get("/list", listController.getList);

// View All Cartoons Page
route.get("/all-cartoons", viewAllController.getAllCartoons);
route.get("/all-cartoons/by-release-date", viewAllController.getByReleaseDate);
route.get("/all-cartoons/by-popularity", viewAllController.getByPopularity);

// Settings Page
route.get("/settings", settingController.getSetting);

// Profile Page
route.get("/profile/:user", profileController.getProfile);

// var cur_user = {
//     user: false,
//     username: "",
//     password: "",
//     birthday: "",
//     email: "",
//     pfp: "",
// }

route.get("/logout", function(req,res){
    
    req.session.destroy(function(err) {
        if(err) throw err;
        user = {
            user: false,
            username : "",
            password: "",
            birthday: "",
            email: "",
            pfp : ""
        }

        res.redirect('/');

    });
    
    res.redirect("/")
})

module.exports = route