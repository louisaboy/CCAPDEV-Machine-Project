const mongoose = require('mongoose');
const url = 'mongodb://CCAPDEV_group10:easypeasy@group10-shard-00-00.oigyx.mongodb.net:27017,group10-shard-00-01.oigyx.mongodb.net:27017,group10-shard-00-02.oigyx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-9ol7d5-shard-0&authSource=admin&retryWrites=true&w=majority';
const cartoons = require('./cartoons.js');
const options ={
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection).lean().exec(function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function(error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }
}

module.exports = database;