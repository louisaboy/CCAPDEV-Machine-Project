const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// load handlebars module
const handlebars = require('express-handlebars');

// set app to use the handlebars engine
app.set('view engine', 'hbs');

// handlebars configurations
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./public/js/handlebars-helpers.js')
}));

//images, css, js files to be used by the server
app.use(express.static('public'))

// data for the featured show
var shows = [ // transfer to mongodb(?)
    {
        "photo": "images/CartoonPic/steven-featured.jpg",
        "photo1": "Steven Universe.jpg",
        "name": "Steven Universe",
        "year": "2013",
        "genre": "Adventure",
        "star1": "fa fa-star",
        "star2": "fa fa-star",
        "star3": "fa fa-star",
        "star4": "fa fa-star",
        "star5": "fa fa-star",
        "synopsis": "Steven, a young boy, inherits a magical gemstone from his mother. He tries to figure out the secrets and spends his days in Beach City with the other Crystal Gems.",
        "file": "/cartoon-info"
    },
    {
        "photo": "images/CartoonPic/adventure-time-featured.jpg",
        "photo1": "Adventure Time.jpg",
        "name": "Adventure Time",
        "year": "2010",
        "genre": "Action",
        "star1": "fa fa-star",
        "star2": "fa fa-star",
        "star3": "fa fa-star",
        "star4": "fa fa-star",
        "star5": "fa fa-star",
        "synopsis": "A 12-year-old boy and his best friend, wise 28-year-old dog with magical powers, go on a series of surreal adventures with each other in a remote future.",
        "file": "/cartoons/steven-universe"
    },
    {
        "photo": "images/CartoonPic/fairly-featured.jpg",
        "photo1": "fairly-oddparents.jpg",
        "name": "Fairly OddParents",
        "year": "2001",
        "genre": "Comedy",
        "star1": "fa fa-star",
        "star2": "fa fa-star",
        "star3": "fa fa-star",
        "star4": "fa fa-star",
        "star5": "fa fa-star",
        "synopsis": "Timmy Turner, a young boy, is neglected by his parents and bullied by his babysitter. However, his life takes an adventurous turn when he is granted two fairy godparents who fulfil his wishes.",
        "file": "/cartoons/steven-universe"
    }
]

shows = shows.sort(() => Math.random() - 0.5);

// user
var sample = [
    {
        "user": true,
        "photo": "images/ProfilePic/mikuuu.jpg"
    }
]

// routes
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'main', 
        cartoons: shows,
        style: 'index-style.css',
        headerStyle: 'header-home-style.css',
        users: sample
    });
});

app.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'main',
        style: 'signup-style.css',
        headerStyle: 'header-signup-style.css',
        users: sample
    });
});

app.get('/cartoon-info', (req, res) => {
    res.render('cartoon-info', {
        layout: 'main',
        style: 'cartoon-style.css',
        headerStyle: 'header-style.css',
        users: sample
    });
});

app.get('/settings', (req, res) => {
    res.render('settings', {
        layout: 'main',
        style: 'settings-style.css',
        headerStyle: 'header-style1.css',
        users: sample
    });
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        layout: 'main',
        style: 'profile-style.css',
        headerStyle: 'header-style1.css',
        users: sample
    });
});

app.get('/all-cartoons', (req, res) => {
    res.render('all-cartoons', {
        layout: 'main',
        style: 'all-cartoons-style.css',
        headerStyle: 'header-style1.css',
        users: sample,
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
});

// $(document).ready(function(){
//     cartoons.shows = cartoons.shows.sort(() => Math.random() - 0.5)
// });

app.listen(port, () => {
    console.log(`App listening to port ${port}`)
});