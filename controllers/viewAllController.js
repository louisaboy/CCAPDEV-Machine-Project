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

var shows = [];

router.get("/", function(req, res){
    console.log("All Cartoons running...");
    
    Cartoon.getAll().then((tempcartoons)=>{
        console.log(tempcartoons)
        tempcartoons.sort(function(a, b){
            if(a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;
            return 0;
        })
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

router.get('/by-popularity', function (req, res) {
    
    shows.sort(function(a, b){
        if(a.ranking < b.ranking)
            return -1;
        if (a.ranking > b.ranking)
            return 1;
        return 0;
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