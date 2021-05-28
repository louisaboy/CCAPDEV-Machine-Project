const express = require('express');
const path = require('path');
require('dotenv').config();
const routes = require('./route/routes.js');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());    // convert/parse any json

// load handlebars module
const handlebars = require('express-handlebars');

// set app to use the handlebars engine
app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

const hbs = require(`hbs`);
hbs.registerPartials(__dirname + '/views/partials');

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

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7*60*60*24 }
}));

app.use('/', routes);

// Load error if page doesn't exist
// app.use(function (req, res) {
//     var details = {};

//     /*
//         checks if a user is logged-in by checking the session data
//         if a user is logged-in,
//         display the profile tab and logout tab in the nav bar.
//     */
//     if(!req.session.isLogin) {
//         details.flag = true;
//         details.username = req.session.username;
//         details.idnum = req.session.idnum;
//     }

//     /*
//         if no user is logged-in,
//         do not display the profile tab and the logout tab in the nav bar.
//     */
//     else
//         details.flag = true;

//     // render `../views/error.hbs`
    
// });

app.listen(port, () => {
    console.log('The server is now running on Port ' + port);
});
