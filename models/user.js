const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    pfp:{
        type: String
    },
    favCartoon: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartoon'
    }],
})

module.exports = mongoose.model('Profile', user);