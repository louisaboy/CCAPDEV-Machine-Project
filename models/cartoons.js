const mongoose = require("mongoose")

var cartoonSchema = mongoose.Schema({
    title: String,
    episodes: Number,
    dateofrelease: Date,
    dateoflastrelease: Date,
    score: Number,
    ranking: Number,
    summary: String,
    shortsummary: String,
    path: String,
    notablequotes: Array
}) 

var Cartoon = mongoose.model("cartoons", cartoonSchema)

exports.create = function(cartoon){
    return new Promise(function(resolve, reject){
        console.log(cartoon)
        var g = new Cartoon(cartoon)

        g.save().then((newCartoon)=>{
            console.log(newCartoon)
            resolve(newCartoon)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Cartoon.findOne({_id:id}).then((cartoon)=>{
            resolve(cartoon)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getTitle = function(title){
    return new Promise(function(resolve, reject){
        Cartoon.findOne({title:title}).then((cartoon)=>{
            resolve(cartoon)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
      Cartoon.find().then((cartoons)=>{
        resolve(cartoons)
      }, (err)=>{
        reject(err)
      })
    })
  }

  exports.edit = function(id, cartoon){
    return new Promise(function(resolve, reject){
        Cartoon.findOneAndUpdate({_id:id}, cartoon).then((cartoon)=>{
            resolve(cartoon)
        }, (err)=>{
            reject(err)
        })
    })
}