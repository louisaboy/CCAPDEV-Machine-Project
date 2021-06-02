const express = require("express");
const bodyparser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const handlebars = require("express-handlebars")

const app = express();

mongoose.Promise = global.Promise;

MONGO_URI = process.env.MONGO_URI || "mongodb://CCAPDEV_group10:easypeasy@group10-shard-00-00.oigyx.mongodb.net:27017,group10-shard-00-01.oigyx.mongodb.net:27017,group10-shard-00-02.oigyx.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-9ol7d5-shard-0&authSource=admin&retryWrites=true&w=majority"
const port = process.env.PORT || 3000;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const urlencoder = bodyparser.urlencoded({
    extended: false
});



app.set("view engine", "hbs");

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./public/js/handlebars-helpers.js')
}));

app.use(express.static("public"));

app.use(session({
    secret: "secret key",
    resave: true,
    saveUninitialized: true,
    name: "ToonList"
}));

app.use(require("./controllers"));




app.listen(port , function(){
    console.log("The server is now running on " + port);
    console.log("Connected Database: " + MONGO_URI);
})