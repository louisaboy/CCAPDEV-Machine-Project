const mongoose = require("mongoose")

var reviewSchema = mongoose.Schema({
    username: String,
    title: String,
    score: Number,
    review: String,
    status: String,
    date: Date
})

var Reviews = mongoose.model("cartoonReview", reviewSchema)

exports.create = function(review){
    return new Promise(function(resolve,reject){
        console.log(review)
        var r = new Review(review)

        r.save().then((newReview)=>{
            console.log(newReview)
            resolve(newReview)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Reviews.find().then((reviews)=>{
            console.log(reviews)
            resolve(reviews)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getTitle = function(title){
    return new Promise(function(resolve, reject){
        Reviews.findOne({title:title}).then((game)=>{
            resolve(game)
        }, (err)=>{
            reject(err)
        })
    })
}

// module.exports = Reviews;