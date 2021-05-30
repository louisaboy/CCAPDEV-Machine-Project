const { Int32 } = require('bson');
const mongoose = require('mongoose');

const cartoons = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    episodes: {
        type: Number,
        required: true
    },
    dateofrelease: {
        type: Date,
        required: true
    },
    dateoflastrelease: {
        type: Date,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    Genre: [{
        type: String,
        required: true
    }],
    ranking: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    shortsummary: {
        type: String,
        required: true
    },
    notablequotes: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Cartoon', cartoons);