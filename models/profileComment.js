const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    profile: String,
    username: String,
    comment: String,
    likes: Number,
    date: Date,
})

var Comments = mongoose.model("profileComments", commentSchema)

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
        Comments.findOne({_id:id}).then((profilecomment)=>{
            resolve(profilecomment)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        Comments.find().then((profilecomment)=>{
          resolve(profilecomment)
        }, (err)=>{
          reject(err)
        })
      })
}

exports.getAllPosting = function(username){
    return new Promise(function(resolve, reject){
        Comments.find({username:username}).then((profilecomment)=>{
            resolve(profilecomment)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.delete = function (id){
    return new Promise(function(resolve, reject){
        Comments.deleteOne({_id: id
        }).then((profilecomment)=>{
            console.log("Deleted: ",  profilecomment)
        },(err)=>{
            reject(err)
        })
    })
}

exports.edit = function(id, profilecomment){
    return new Promise(function(resolve, reject){
        Comments.findOneAndUpdate({_id:id}, profilecomment).then((profilecomment)=>{
            resolve(profilecomment)
        }, (err)=>{
            reject(err)
        })
    })
}
