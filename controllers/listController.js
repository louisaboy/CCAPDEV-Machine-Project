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
var sample = {
    user: false
}
router.use(urlencoder)

function validation(cartoon){
    if(cartoon.title && cartoon.episodes && cartoon.dateofrelease && cartoon.dateoflastrelease && cartoon.score && cartoon.ranking && cartoon.summary && cartoon.shortsummary && cartoon.path){
        return true
    }
    else{
        return false
    }
}

const listController = {
    getList: function(req, res){
        console.log("List running...");
        
        let reviews = []
        cartoonReview.getAll().then((tempreviews)=>{
            console.log(tempreviews)
            for(i in tempreviews){
                var temp ={
                    _id: tempreviews[i]._id,
                    title: tempreviews[i].title,
                    username: tempreviews[i].username,
                    score: tempreviews[i].score,
                    review: tempreviews[i].review,
                    date: tempreviews[i].date,
                    status: tempreviews[i].status
                }
                if(req.session.user.username === temp.username && temp.status != null)
                    reviews.push(temp)
            }
            console.log(reviews);
        })
            if(typeof(req.session.user) != 'undefined')
            {
                res.render('list.hbs', {
                    layout: 'main',
                    style: 'cartoon-style.css',
                    headerStyle: 'header-style.css',
                    users: req.session.user,
                    cartoons: reviews,
                    username: req.session.user.username
                });
            }
    },
    getWatching: function(req, res) {
        let reviews = []
        cartoonReview.getAll().then((tempreviews)=>{
            console.log(tempreviews)
            for(i in tempreviews){
                var temp ={
                    _id: tempreviews[i]._id,
                    title: tempreviews[i].title,
                    username: tempreviews[i].username,
                    score: tempreviews[i].score,
                    review: tempreviews[i].review,
                    date: tempreviews[i].date,
                    status: tempreviews[i].status
                }
                if(req.session.user.username === temp.username && temp.status === "Watching")
                    reviews.push(temp)
            }
            console.log(reviews);
        })
            if(typeof(req.session.user) != 'undefined')
            {
                res.render('list.hbs', {
                    layout: 'main',
                    style: 'cartoon-style.css',
                    headerStyle: 'header-style.css',
                    users: req.session.user,
                    cartoons: reviews,
                    username: req.session.user.username
                });
            }
    },
    getOnHold: function(req, res) {
        let reviews = []
        cartoonReview.getAll().then((tempreviews)=>{
            console.log(tempreviews)
            for(i in tempreviews){
                var temp ={
                    _id: tempreviews[i]._id,
                    title: tempreviews[i].title,
                    username: tempreviews[i].username,
                    score: tempreviews[i].score,
                    review: tempreviews[i].review,
                    date: tempreviews[i].date,
                    status: tempreviews[i].status
                }
                if(req.session.user.username === temp.username && temp.status === "On Hold")
                    reviews.push(temp)
            }
            console.log(reviews);
        })
            if(typeof(req.session.user) != 'undefined')
            {
                res.render('list.hbs', {
                    layout: 'main',
                    style: 'cartoon-style.css',
                    headerStyle: 'header-style.css',
                    users: req.session.user,
                    cartoons: reviews,
                    username: req.session.user.username
                });
            }
    },
    getDropped: function(req, res) {
        let reviews = []
        cartoonReview.getAll().then((tempreviews)=>{
            console.log(tempreviews)
            for(i in tempreviews){
                var temp ={
                    _id: tempreviews[i]._id,
                    title: tempreviews[i].title,
                    username: tempreviews[i].username,
                    score: tempreviews[i].score,
                    review: tempreviews[i].review,
                    date: tempreviews[i].date,
                    status: tempreviews[i].status
                }
                if(req.session.user.username === temp.username && temp.status === "Dropped")
                    reviews.push(temp)
            }
            console.log(reviews);
        })
            if(typeof(req.session.user) != 'undefined')
            {
                res.render('list.hbs', {
                    layout: 'main',
                    style: 'cartoon-style.css',
                    headerStyle: 'header-style.css',
                    users: req.session.user,
                    cartoons: reviews,
                    username: req.session.user.username
                });
            }
    },
    getPlanToWatch: function(req, res){
        let reviews = []
        cartoonReview.getAll().then((tempreviews)=>{
            console.log(tempreviews)
            for(i in tempreviews){
                var temp ={
                    _id: tempreviews[i]._id,
                    title: tempreviews[i].title,
                    username: tempreviews[i].username,
                    score: tempreviews[i].score,
                    review: tempreviews[i].review,
                    date: tempreviews[i].date,
                    status: tempreviews[i].status
                }
                if(req.session.user.username === temp.username && temp.status === "Plan to Watch")
                    reviews.push(temp)
            }
            console.log(reviews);
        })
            if(typeof(req.session.user) != 'undefined')
            {
                res.render('list.hbs', {
                    layout: 'main',
                    style: 'cartoon-style.css',
                    headerStyle: 'header-style.css',
                    users: req.session.user,
                    cartoons: reviews,
                    username: req.session.user.username
                });
            }
    },
    getComplete: function(req, res){
        let reviews = []
        cartoonReview.getAll().then((tempreviews)=>{
            console.log(tempreviews)
            for(i in tempreviews){
                var temp ={
                    _id: tempreviews[i]._id,
                    title: tempreviews[i].title,
                    username: tempreviews[i].username,
                    score: tempreviews[i].score,
                    review: tempreviews[i].review,
                    date: tempreviews[i].date,
                    status: tempreviews[i].status
                }
                if(req.session.user.username === temp.username && temp.status === "Complete")
                    reviews.push(temp)
            }
            console.log(reviews);
        })
            if(typeof(req.session.user) != 'undefined')
            {
                res.render('list.hbs', {
                    layout: 'main',
                    style: 'cartoon-style.css',
                    headerStyle: 'header-style.css',
                    users: req.session.user,
                    cartoons: reviews,
                    username: req.session.user.username
                });
            }
    },
    getDelete: function(req, res){
        cartoonReview.delete(req.params.id).then((user)=>{
            res.redirect("/list/"+req.params.id);
            res.render('list.hbs', {
                layout: 'main',
                style: 'cartoon-style.css',
                headerStyle: 'header-style.css',
                users: req.session.user,
                cartoons: reviews,
                username: req.session.user.username
            });
        })
    }
}

module.exports = listController;