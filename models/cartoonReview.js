const mongoose = require("mongoose")

var reviewSchema = mongoose.Schema({
    username: String,
    title: String,
    score: Number,
    review: String,
    status: String,
    date: Date
})

var Reviews = mongoose.model("cartoonreviews", reviewSchema)

exports.create = function(review){
    return new Promise(function(resolve,reject){
        // console.log(review)
        var r = new Reviews(review)

        r.save().then((newReview)=>{
            // console.log(newReview)
            resolve(newReview)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Reviews.find().then((reviews)=>{
            // console.log(reviews)
            resolve(reviews)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getTitle = function(title){
    return new Promise(function(resolve, reject){
        Reviews.find({title:title}).then((game)=>{
            resolve(game)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getCartoonReview = function(cartoontitle){
    return new Promise(function(resolve, reject){
        Reviews.find({title:cartoontitle}).then((reviews)=>{
            // console.log(reviews)
            resolve(reviews)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.deleteId = function (id){
    return new Promise(function(resolve, reject){
        Reviews.deleteOne({_id: id
        }).then((poreviewsst)=>{
            console.log("Deleted: ",  poreviewsst)
        },(err)=>{
            reject(err)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        Reviews.deleteOne({username: id
        }).then((poreviewsst)=>{
            console.log("Deleted: ",  poreviewsst)
        },(err)=>{
            reject(err)
        })
    })
}

exports.edit = function(id, reviews){
    return new Promise(function(resolve, reject){
        Reviews.findOneAndUpdate({_id:id}, reviews).then((reviews)=>{
            resolve(reviews)
        }, (err)=>{
            reject(err)
        })
    })
}

// module.exports = Reviews;