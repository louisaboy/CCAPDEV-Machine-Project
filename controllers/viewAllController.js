const express = require("express")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const bodyparser = require("body-parser")
const moment = require("moment")
const main = require("../routes/route.js");

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)


var sample = {
    user: false
}
const viewAllController = {
    getAllCartoons: function(req, res){
        console.log("All Cartoons running...");
        var shows = [];
        Cartoon.getAll().then((tempcartoons)=>{
            console.log("1")
            // console.log(tempcartoons)
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
            
            console.log("2");
            console.log(req.session.user)

            if(typeof(req.session.user) != 'undefined')
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: req.session.user,
                    cartoons: shows,
                });
            }
            else
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: sample,
                    cartoons: shows,
                });
            }
            
        })  
            
    },
    
    getByPopularity: function (req, res) {
        console.log("All Cartoons running...");
        var shows = [];
        Cartoon.getAll().then((tempcartoons)=>{
            console.log("1")
            // console.log(tempcartoons)
            tempcartoons.sort(function(a, b){
                if(a.ranking < b.ranking)
                    return -1;
                if (a.ranking > b.ranking)
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
            
            console.log("2");
            console.log(req.session.user)

            if(typeof(req.session.user) != 'undefined')
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: req.session.user,
                    cartoons: shows,
                });
            }
            else
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: sample,
                    cartoons: shows,
                });
            }
            
        })  
        
   },

   getSearch: function(req, res) {
    console.log("went here");
    res.render('all-cartoons', {
        layout: 'main',
        style: 'all-cartoons-style.css',
        headerStyle: 'header-style1.css',
        users: req.session.user,
        cartoons: shows,
    });
   },

   getByReleaseDate: function (req, res) {
    console.log("All Cartoons running...");
        var shows = [];
        Cartoon.getAll().then((tempcartoons)=>{
            console.log("1")
            // console.log(tempcartoons)
            tempcartoons.sort(function(a, b){
                if(a.dateofrelease < b.dateofrelease)
                    return -1;
                if (a.dateofrelease > b.dateofrelease)
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
            
            console.log("2");
            console.log(req.session.user)

            if(typeof(req.session.user) != 'undefined')
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: req.session.user,
                    cartoons: shows,
                });
            }
            else
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: sample,
                    cartoons: shows,
                });
            }
            
        })  
    },

    getSearch: function(req, res) {        
        console.log("Searching for " + req.body.search + "...");
        // var shows = [{
        //     _id: "",
        //     title: "",
        //     episodes: "",
        //     genre: "",
        //     dateofrelease: "",
        //     dateoflastrelease: "",
        //     score: "",
        //     ranking: "",
        //     summary: "",
        //     path: ""
        // }];
        var shows = [];
        Cartoon.getAll().then((tempcartoons)=>{
            // console.log(tempcartoons)
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
                // console.log(temp.title + " compare to " + req.body.search)
                if (temp.title === req.body.search)
                    shows.push(temp)
            }
            if(typeof(req.session.user) != 'undefined')
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: req.session.user,
                    cartoons: shows,
                });
            }
            else
            {
                res.render('all-cartoons', {
                    layout: 'main',
                    style: 'all-cartoons-style.css',
                    headerStyle: 'header-style1.css',
                    users: sample,
                    cartoons: shows,
                });
            }
            
        })  
    }
}

module.exports = viewAllController;