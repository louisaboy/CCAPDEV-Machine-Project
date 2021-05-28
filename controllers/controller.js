const db = require(`../models/db.js`);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongodb = require(`mongodb`);

// data for the featured show
var shows = [ // transfer to mongodb(?)
    {
        photo: "images/CartoonPic/steven-featured.jpg",
        name: "Steven Universe",
        year: "2013",
        genre: "Adventure",
        star1: "fa fa-star",
        star2: "fa fa-star",
        star3: "fa fa-star",
        star4: "fa fa-star",
        star5: "fa fa-star",
        synopsis: "Steven, a young boy, inherits a magical gemstone from his mother. He tries to figure out the secrets and spends his days in Beach City with the other Crystal Gems.",
        file: "/cartoon-info"
    },
    {
        photo: "images/CartoonPic/adventure-time-featured.jpg",
        name: "Adventure Time",
        year: "2010",
        genre: "Action",
        star1: "fa fa-star",
        star2: "fa fa-star",
        star3: "fa fa-star",
        star4: "fa fa-star",
        star5: "fa fa-star",
        synopsis: "A 12-year-old boy and his best friend, wise 28-year-old dog with magical powers, go on a series of surreal adventures with each other in a remote future.",
        file: "/cartoons/steven-universe"
    },
    {
        photo: "images/CartoonPic/fairly-featured.jpg",
        name: "Fairly OddParents",
        year: "2001",
        genre: "Comedy",
        star1: "fa fa-star",
        star2: "fa fa-star",
        star3: "fa fa-star",
        star4: "fa fa-star",
        star5: "fa fa-star",
        synopsis: "Timmy Turner, a young boy, is neglected by his parents and bullied by his babysitter. However, his life takes an adventurous turn when he is granted two fairy godparents who fulfil his wishes.",
        file: "/cartoons/steven-universe"
    }
]

// user
var user = [
    {
        user: false,
        username: "",
        password: "",
        birthday: "",
        email: "",
        photo: "images/ProfilePic/default.jpg",
        favcartoon: []
    }
]

var sample = [
    {
        user: true,
        photo: "images/ProfilePic/default.jpg"
    }
]
var isLogin = false;

const controller = {
    getIndex: function(req, res) {
        res.render('index', {
            layout: 'main', 
            cartoons: shows,
            users: user,
            style: 'index-style.css',
            headerStyle: 'header-home-style.css'
        });
    },

    // addToList: function(req, res) {
    //     if(isLogin){
    //         db.findOne('title', )
    //     }
    // },

    // searchCartoon: function (req, res) {
    //     const {term} = req.query;
    // }
    getSignup: function(req, res){
        res.render('signup', {
            layout: 'main',
            style: 'signup-style.css',
            headerStyle: 'header-signup-style.css',
            users: user
        });

        user.user = true;
    },

    postRegister: function(req, res){
        var username = req.query.username;
        db.findOne('users', {username: username}, function(result) {
            if(result == null){
                res.send('');
            }else{
                res.send(result);
            }    
        });
    },

    // addUser: function(req, res){ //add user
    //     var avatar;
    //     if(req.query.gender == 'Male' || req.query.gender == 'Other'){
    //         avatar = 'mavatar.jpg';
    //     }else{
    //         avatar = 'favatar.jpg';
    //     }

    //     bcrypt.hash(req.query.password, 10, function (error, hash){
    //         var person ={
    //             email: req.qurt.email,
    //             username: req.query.username,
    //             birthday: req.query.birthday
    //             fName: req.query.fName,
    //             lName: req.query.lName,
    //             password: hash,
    //             email: req.query.email,
    //             bday: req.query.bday,
    //             gender: req.query.gender,
    //             profilepic: avatar,
    //             nw: " "
    //         }
    
    //         db.insertOne('users', person);
    
    //         res.send(true);
    //         console.log('You have been registered, ' + person.username + ' pw: ' + person.password);  
    //     });
    // },

    getCartoonInfo: function (req, res) {
        console.log(user[0]);
        res.render('cartoon-info', {
            layout: 'main',
            style: 'cartoon-style.css',
            users: user,
            headerStyle: 'header-style.css'
        });
        
    },

    getSettings: function (req, res) {
        res.render('settings', {
            layout: 'main',
            style: 'settings-style.css',
            headerStyle: 'header-style.css',
            users: user
        });
    },
    
    getAllCartoons: function (req, res) {
        res.render('all-cartoons', {
            layout: 'main',
            style: 'all-cartoons-style.css',
            headerStyle: 'header-style1.css',
            users: user,
            cartoons: shows,
            helpers:{
                // Function to do basic mathematical operation in handlebar
                math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
                    rvalue = parseFloat(rvalue);
                    return {
                        "+": lvalue + rvalue,
                        "-": lvalue - rvalue,
                        "*": lvalue * rvalue,
                        "/": lvalue / rvalue,
                        "%": lvalue % rvalue
                    }[operator];
                }
            }
        });
    },

    editProfile: function(req, res){
        if(isSession) {
            db.updateOne('users', {username: user.username}, {$set: user = {
                username: user.username,
                fName: req.body.editfirstname,
                lName: req.body.editlastname,
                password: req.body.editpass,
                email: req.body.editemail,
                bday: req.body.editbday,
                gender: req.body.gender,
                profilepic: user.profilepic}});
            console.log(user.gender);
            res.redirect('/userprofile/'+ user.username);
        } else {
            res.redirect('/');
        }
    },   
}

module.exports = controller; 