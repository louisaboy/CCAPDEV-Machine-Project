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

function validation(cartoon){
    if(cartoon.title && cartoon.episodes && cartoon.dateofrelease && cartoon.dateoflastrelease && cartoon.score && cartoon.ranking && cartoon.summary && cartoon.shortsummary && cartoon.path){
        return true
    }
    else{
        return false
    }
}
router.get("/", function(req, res){
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
            
            shows.push(temp)
        }
    })

    res.render('all-cartoons.hbs', {
        layout: 'main',
        style: 'cartoon-style.css',
        headerStyle: 'header-style.css',
        // users: sample
    });
})

module.exports = router