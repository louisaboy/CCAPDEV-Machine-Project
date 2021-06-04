const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Cartoon = require("../models/cartoons")
const Review = require("../models/cartoonReview")
const Comment = require("../models/profileComment")
const bodyparser = require("body-parser")
const moment = require("moment")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

var sample = {
    user: false
}

var shows = [
    {
        "photo": "images/CartoonPic/steven-featured.jpg",
        "photo1": "Steven Universe.jpg",
        "name": "Steven Universe",
        "year": "2013",
        "genre": "Adventure",
        "star1": "fa fa-star",
        "star2": "fa fa-star",
        "star3": "fa fa-star",
        "star4": "fa fa-star",
        "star5": "fa fa-star",
        "synopsis": "Steven, a young boy, inherits a magical gemstone from his mother. He tries to figure out the secrets and spends his days in Beach City with the other Crystal Gems.",
        "file": "/cartoon-info"
    },
    {
        "photo": "images/CartoonPic/adventure-time-featured.jpg",
        "photo1": "Adventure Time.jpg",
        "name": "Adventure Time",
        "year": "2010",
        "genre": "Action",
        "star1": "fa fa-star",
        "star2": "fa fa-star",
        "star3": "fa fa-star",
        "star4": "fa fa-star",
        "star5": "fa fa-star",
        "synopsis": "A 12-year-old boy and his best friend, wise 28-year-old dog with magical powers, go on a series of surreal adventures with each other in a remote future.",
        "file": "/cartoons/steven-universe"
    },
    {
        "photo": "images/CartoonPic/fairly-featured.jpg",
        "photo1": "fairly-oddparents.jpg",
        "name": "Fairly OddParents",
        "year": "2001",
        "genre": "Comedy",
        "star1": "fa fa-star",
        "star2": "fa fa-star",
        "star3": "fa fa-star",
        "star4": "fa fa-star",
        "star5": "fa fa-star",
        "synopsis": "Timmy Turner, a young boy, is neglected by his parents and bullied by his babysitter. However, his life takes an adventurous turn when he is granted two fairy godparents who fulfil his wishes.",
        "file": "/cartoons/steven-universe"
    }
]

router.use(urlencoder)

const homeController = {
    
    getIndex: function(req, res){
        // console.log(req.session.user)
        console.log("Homepage running...")
            console.log("No user yet")
            res.render('index', {
                layout: 'main', 
                cartoons: shows,
                style: 'index-style.css',
                headerStyle: 'header-home-style.css',
                users: sample
            });
        
    },
    getHome: function(req, res){
        console.log("Homepage running...")
        console.log("User logged In " + req.session.user.username)
        res.render('index', {
            layout: 'main', 
            cartoons: shows,
            style: 'index-style.css',
            headerStyle: 'header-home-style.css',
            users: req.session.user
        });
    }
    // postIndex: function(req, res){
        
    // }
}

module.exports = homeController;
