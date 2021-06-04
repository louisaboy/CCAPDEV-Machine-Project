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
app.get("/home", homeController.getHome);
app.get("/index", homeController.getIndex);

// Sign In Page
app.get("/signup", signinController.getSignin);
app.get("/login", signinController.getLogin)
app.post("/login", signinController.postLogin)
app.post("/signup", signinController.postRegister)

// Cartoon Info Page
app.get("/cartoon-info/:id", cartoonController.getCartoon);

// Cartoon List Page
app.get("/list", listController.getList);

// View All Cartoons Page
app.get("/all-cartoons", viewAllController.getAllCartoons);
app.get("/all-cartoons/by-release-date", viewAllController.getByReleaseDate);
app.get("/all-cartoons/by-popularity", viewAllController.getByPopularity);

// Settings Page
app.get("/settings", settingController.getSetting);

// Profile Page
app.get("/profile/:user", profileController.getProfile);

// var cur_user = {
//     user: false,
//     username: "",
//     password: "",
//     birthday: "",
//     email: "",
//     pfp: "",
// }

app.get("/logout", function(req,res){
    
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

module.exports = app