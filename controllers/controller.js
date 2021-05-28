const db = require('../models/db.js');
// const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongodb = require('mongodb');

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
            style: 'index-style.css',
            headerStyle: 'header-home-style.css',
            users: sample
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

        
    },

    // postRegister: function(req, res){
    //     var username = req.query.username;
    //     db.findOne('users', {username: username}, function(result) {
    //         if(result == null){
    //             res.send('');
    //         }else{
    //             res.send(result);
    //         }    
    //     });
    // },

    // loginUser: function(req, res){ 
    //     console.log("went here");
    //     var person ={
    //         username: req.query.email,
    //         password: req.query.password
    //     }
    //     console.log(person);

    //     db.findOne('users', {username: person.username}, function(result){
    //         if(result != null){
    //             bcrypt.compare(person.password, result.password, function (error, isVerify){
    //                 if (isVerify){
    //                     console.log(result);
    //                     isLogin = true;
    //                     console.log('You have successfully logged in ' + result.username);
    //                     user = result;
    //                 } else {
    //                     console.log("Wrong Password!");
    //                 }
    //             });
    //         } else {    
    //             console.log('Invalid credentials'); 
    //             console.log(result);
    //         }
    //         res.send(result);
    //     });

    //     if(isLogin){
    //         req.session.username = person.username;
    //         console.log(req.session.username);
    //         isSession = req.session.username;
    //         console.log(isSession);
    //     }
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
        // var cartoondb = [
        //     {
        //         photo: "",
        //         name: "",
        //         year: "",
        //         genre: "",
        //         star1: "fa fa-star",
        //         star2: "fa fa-star",
        //         star3: "fa fa-star",
        //         star4: "fa fa-star",
        //         star5: "fa fa-star",
        //         synopsis: "",
        //         file: ""
        //     }
        // ];
        // db.findMany('ToonList.cartoons', {}, null, {}, function(result){
        //     if (result != null){
        //         console.log('Cartoons successfully acquired');
        //         // var cartoons = result.title;
        //         console.log(result);
        //     }
        //     else   
        //         console.log('Cartoons were not successfully acquired');
        // });

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

    getProfile: function(req, res){
        res.render('profile', {
            layout: 'main',
            style: 'settings-style.css',
            headerStyle: 'header-style1.css',
            users: sample
        });
    },
}

module.exports = controller; 