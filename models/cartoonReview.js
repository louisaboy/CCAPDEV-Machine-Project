const mongoose = require('mongoose');

const cartoonReview = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartoon'
    },
    score: {
        type: Int32Array,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: Watching
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Review', cartoonReview);