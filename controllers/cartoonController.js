const express = require("express")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const bodyparser = require("body-parser")
const moment = require("moment")
const sanitize = require('mongo-sanitize');
const main = require("../routes/route.js");

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

function validation(cartoon){
    if(cartoon.title && cartoon.episodes && cartoon.dateofrelease && cartoon.dateoflastrelease && cartoon.score && cartoon.ranking && cartoon.summary && cartoon.shortsummary && cartoon.path){
        return true
    }
    else{
        return false
    }
}
var sample = {
    user: false
}
const cartoonController = {
    getCartoon: function(req, res){
        cartoon = req.params.id;
        console.log(cartoon);
        var show = {
            title: "",
            episodes: "",
            dateofrelease: "",
            dateoflastrelease: "",
            score: "",
            ranking: "",
            summary: "",
            notablequotes: [],
            path: ""
        }
        
        Cartoon.getTitle(cartoon).then((result)=>{
            // console.log(result);
            show.title = result.title,
            show.episodes = result.episodes,
            show.dateofrelease = result.dateofrelease;
            show.dateoflastrelease = result.dateoflastrelease;
            show.score = result.score;
            show.ranking = result.ranking;
            show.summary = result.summary;
            show.path = result.path;
            show.notablequotes = result.notablequotes;
            // console.log(result.notablequotes[3])
            // for(i in result.notablequotes.){
            //     var temp = result.notablequotes[0];
            //     console.log(temp);
            //     show.notablequotes.push(temp);
            // }
            // console.log("asdfasdf" + result.notablequotes[0])
                // console.log("1231231231 " + show.title)
                cartoonReview.getTitle(show.title).then((reviews)=>{
                    console.log(show.title);
                    console.log("cartoon reviews " + reviews);
                    console.log("Cartoon running...");
                    if(typeof(req.session.user) != 'undefined')
                    {
                        res.render('cartoon-info.hbs', {
                            layout: 'main', 
                            style: 'cartoon-style.css',
                            headerStyle: 'header-style.css',
                            users: req.session.user,
                            title: show.title,
                            path: show.path,
                            episodes: show.episodes,
                            dateofrelease: show.dateofrelease,
                            dateoflastrelease: show.dateoflastrelease,
                            summary: show.summary,
                            score: show.score,
                            ranking: show.ranking,
                            cartoons: show,
                            cartoonReview: reviews
                        });
                    }
                    else{
                        console.log("asdfasdfas" + reviews[0].username);
                        res.render('cartoon-info.hbs', {
                            layout: 'main', 
                            style: 'cartoon-style.css',
                            headerStyle: 'header-style.css',
                            users: sample,
                            title: show.title,
                            path: show.path,
                            episodes: show.episodes,
                            dateofrelease: show.dateofrelease,
                            dateoflastrelease: show.dateoflastrelease,
                            summary: show.summary,
                            score: show.score,
                            ranking: show.ranking,
                            cartoons: show,
                            username: reviews.username,
                            score: reviews.score,
                            review: reviews.review
                        });
                    }
                    
                });            
        })
    },
    postComment: function(req, res){
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        console.log("1234123412341234" + req.session.user);
        var review = {
            username: req.session.user.username,
            title: req.params.id,
            score: req.body.ratings,
            review: req.body.comment,
            status: "complete",
            date: year+"-"+month+"-"+date
        }

        cartoonReview.create(review).then((result)=>{
            console.log('asdfasdf');
            console.log(result)
            res.redirect("/cartoon-info/" + req.params.id);
        })
    }
}

module.exports = cartoonController;