const express = require("express")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const bodyparser = require("body-parser")
const moment = require("moment")
const sanitize = require('mongo-sanitize');

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
        var review = {
            username: "",
            review: "",
            score: ""
        }
        
        Cartoon.getTitle(cartoon).then((result)=>{
            console.log(result);
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
                // cartoonReview.getTitle(show.title).then((reviews)=>{
                    // console.log("cartoon reviews " + reviews);
                    // review.username = reviews.username
                    // review.review = reviews.review
                    // review.score = reviews.score
                    // console.log("23452345 " + review.username);
                    console.log("Cartoon running...");
                    console.log(req.session.user);
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
                        username: review.username,
                        review: review.review,
                        score: review.score
                    });
                // });            
        })
    }
}

module.exports = cartoonController;