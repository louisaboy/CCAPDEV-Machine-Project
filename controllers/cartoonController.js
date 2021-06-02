const express = require("express")
const router = express.Router()
const User = require("../models/user")
const cartoonReview = require("../models/cartoonReview")
const Cartoon = require("../models/cartoons")
const bodyparser = require("body-parser")

const app = express()

function validation(cartoon){
    if(cartoon.title && cartoon.episodes && cartoon.dateofrelease && cartoon.dateoflastrelease && cartoon.score && cartoon.ranking && cartoon.summary && cartoon.shortsummary && cartoon.path){
        return true
    }
    else{
        return false
    }
}

router.get("/cartoons", function(req,res){
    Cartoon.getAll().then((tempcartoon)=>{
        let cartoons = []
        for(i in tempcartoon){
            var temp ={
                _id: tempcartoon[i]._id,
                title: tempcartoon[i].title,
                episodes: tempcartoon[i].episodes,
                dateofrelease: moment(tempcartoon[i].dateofrelease).format("MMMM D, YYYY"),
                dateoflastrelease: moment(tempcartoon[i].dateoflastrelease).format("MMMM D, YYYY"),
                score: tempcartoon[i].score,
                ranking: tempcartoon[i].ranking,
                summary: tempcartoon[i].summary,
                shortsummary: tempcartoon[i].shortsummary,
                path: tempcartoon[i].path,
            }
            cartoons.push(temp)
        }
        User.getAll().then((users)=>{
            res.render("cartoon-info.hbs", {
                cartoons, users
            })
        }) 
    })
})

router.get("/cartoonlist", function(req,res){
    Cartoons.getAll().then((tempcartoon)=>{
        let cartoons = []
        for(i in tempcartoon){
            var temp ={
                _id: tempcartoon[i]._id,
                title: tempcartoon[i].title,
                episodes: tempcartoon[i].episodes,
                dateofrelease: moment(tempcartoon[i].dateofrelease).format("MMMM D, YYYY"),
                dateoflastrelease: moment(tempcartoon[i].dateoflastrelease).format("MMMM D, YYYY"),
                score: tempcartoon[i].score,
                ranking: tempcartoon[i].ranking,
                summary: tempcartoon[i].summary,
                shortsummary: tempcartoon[i].shortsummary,
                path: tempcartoon[i].path,
            }
            cartoons.push(temp)
        }
        res.render("all-cartoons.hbs", {
            cartoons
        })
    })
})