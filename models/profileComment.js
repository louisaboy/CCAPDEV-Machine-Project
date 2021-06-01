const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    profile: String,
    username: String,
    comment: String,
    likes: Number,
    date: Date,
})

var Comment = mongoose.model("profilecomment", commentSchema)

exports.create = function(profilecomment){
    return new Promise(function(resolve, reject){
        console.log(profilecomment)
        var p = new Post(profilecomment)

        p.save().then((newProfileComment)=>{
            console.log(newProfileComment)
            resolve(newComment)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Comment.findOne({_id:id}).then((profilecomment)=>{
            resolve(profilecomment)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Comment.find().then((profilecomment)=>{
          resolve(profilecomment)
        }, (err)=>{
          reject(err)
        })
      })
}

exports.getAllPosting = function(username){
    return new Promise(function(resolve, reject){
        Comment.find({title:title}).then((profilecomment)=>{
            resolve(profilecomment)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        Comment.deleteOne({_id: id
        }).then((profilecomment)=>{
            console.log("Deleted: ",  profilecomment)
        },(err)=>{
            reject(err)
        })
    })
}

exports.edit = function(id, profilecomment){
    return new Promise(function(resolve, reject){
        Comment.findOneAndUpdate({_id:id}, profilecomment).then((profilecomment)=>{
            resolve(profilecomment)
        }, (err)=>{
            reject(err)
        })
    })
}
