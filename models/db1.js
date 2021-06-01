const mongoose = require('mongoose');
const url = process.env.DB_URL;
const cartoons = require('./cartoons.js');
const user = require('./user.js');
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

    insertOne: function(model, doc) {
        model.create(doc, function(error, result) {
          if(error) throw error;
        });
      },
      insertOneCallback: function(model, doc, callback) {
        model.create(doc, function(error, result) {
          if(error) return callback(false);
          return callback(result);
        });
      },
      insertMany: function(model, docs) {
        model.insertMany(docs, function(error, result) {
          if(error) return callback(false);
          return callback(true);
        });
      },
      findOne: function(model, query, callback) {
        model.findOne(query, '', function(error, result) {
          if(error) return callback(false);
          return callback(result);
        });
      },
      findMany: function(model, query, callback) {
        model.find(query, '', function(error, result) {
          if(error) return callback(false);
          return callback(result);
        });
      },
      deleteOne: function(model, filter) {
        model.deleteOne(filter, function(error, result) {
          if(error) throw error;
        });
      },
      deleteMany: function(model, filter) {
        model.deleteMany(filter, function(error, result) {
          if(error) throw error;
        });
      },
      findOneAndUpdate: function(model, filter, update, callback) {
        model.findOneAndUpdate(filter, update, {returnOriginal:false}, function (error, result) {
          if(error) throw err;
          return callback(result);
        });
      },
      updateOne: function(model, filter, update) {
        model.updateOne(filter, update, function(error, result) {
          if(error) throw error;
        });
      },
      updateMany: function(model, filter, update) {
        model.updateMany(filter, update, function(error, result) {
          if(error) throw error;
        });
      }
}

module.exports = database;