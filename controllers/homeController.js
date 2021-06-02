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

var cur_user = {
    user: false,
    username: "",
    password: "",
    birthday: "",
    email: "",
    pfp: "",
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

function durationValidation(cart){
    if(cart.duration > 0){
        return true
    }
    else{
        return false
    }
}

router.use(urlencoder)

// router.post("/add-to-cart", function(req, res){
//     let postID = req.body.postingID

//     Post.get(postID).then((post)=>{
//         Game.getTitle(post.title).then((game)=>{
//             var cart = {
//                 title : post.title,
//                 price : post.price, 
//                 link : game.link,
//                 user : post.user,
//                 borrower: req.session.email,
//                 release : moment(game.release).format("MMMM D, YYYY"),
//                 duration : req.body.duration,
//                 ID: post._id
//             }
            
//             if(durationValidation(cart)){
//                 Cart.add(cart).then((cart)=>{
//                     console.log(cart)
//                     res.redirect("/game/vg/" + game._id)
//                 }, (error)=>{
//                     res.sendFile(error)
//                 })
//             }
//             else{
//                 //insert error message here
//                 res.redirect("/game/vg/" + game._id)
//             }
//         })
//     })
// })

router.get("/", function(req, res){
    res.render('index', {
        layout: 'main', 
        cartoons: shows,
        style: 'index-style.css',
        headerStyle: 'header-home-style.css',
        users: cur_user
    });
    // cur_user.user = true;
    console.log(cur_user.user);
    // cartowner = req.session.email
    // Cart.getAll().then((tempitems)=>{
    //     let items = []
    //     for(i in tempitems){
    //         var temp = {
    //             title: tempitems[i].title,
    //             price: tempitems[i].price, //change to duration
    //             link: tempitems[i].link,
    //             user: tempitems[i].user,
    //             borrower: tempitems[i].borrower,
    //             release: moment(tempitems[i].release).format("MMMM D, YYYY"),
    //             duration: tempitems[i].duration,
    //             ID: tempitems[i].ID
    //         }
    //         items.push(temp)
    //     }
    //     res.render("cart.hbs", {
    //         items, cartowner
    //     })
    // })
})

module.exports = router
