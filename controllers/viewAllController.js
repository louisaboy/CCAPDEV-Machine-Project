const express = require("express")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const bodyparser = require("body-parser")
const moment = require("moment")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

var showsample = [
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


router.get("/", function(req, res){
    console.log("All Cartoons running...");
    let shows = []
    Cartoon.getAll().then((tempcartoons)=>{
        console.log(tempcartoons)
        for(i in tempcartoons){
            var temp ={
                _id: tempcartoons[i]._id,
                title: tempcartoons[i].title,
                episodes: tempcartoons[i].episodes,
                genre: tempcartoons[i].genre,
                dateofrelease: moment(tempcartoons[i].dateofrelease).format("MMMM D, YYYY, h:mm:ss a"),
                dateoflastrelease: moment(tempcartoons[i].dateoflastrelease).format("MMMM D, YYYY, h:mm:ss a"),
                score: tempcartoons[i].score,
                ranking: tempcartoons[i].ranking,
                summary: tempcartoons[i].summary,
                path: tempcartoons[i].path
            }
            
            shows.push(temp)
        }
    })
    
    res.render('all-cartoons', {
        layout: 'main',
        style: 'all-cartoons-style.css',
        headerStyle: 'header-style1.css',
        // users: sample,
        cartoons: shows,
        helpers:{
            // Function to do basic mathematical operation in handlebar
            math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
                rvalue = parseFloat(rvalue);
                return {
                    "+": lvalue + rvalue,
                    "-": lvalue - rvalue,
                    "*": lvalue * rvalue,
                    "/": lvalue / rvalue,
                    "%": lvalue % rvalue
                }[operator];
            }
        }
    });
})

module.exports = router