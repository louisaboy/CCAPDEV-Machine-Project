const express = require("express")
const route = express.Router()

const app =  express()

route.use("/cartoon-info", require("./cartoonController"))
route.use("/home", require("./homeController"))
route.use("/list", require("./listController"))
route.use("/profile", require("./profileController"))
route.use("/history", require("./historyController"))
route.use("/review", require("./reviewController"))

route.get("/", function(req,res){
    var errors = req.session.errors
    var savedinput = req.session.savedinput
    req.session.errors = null
    req.session.savedinput = null
    console.log("GET /")
    res.render("index.hbs", {errors, savedinput})
})

route.get("/logout", function(req,res){
    res.redirect("/")
})

module.exports = route