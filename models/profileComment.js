const mongoose = require('mongoose');

const profileComment = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Int32Array,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Comment', profileComment);