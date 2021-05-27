const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());    // convert/parse any json
app.use(express.static('public'))   // gain access to any files in the ./public folder
app.set('views', 'views');
app.set('view engine', 'hbs');

app.use('/', routes);

app.listen(port, () => {
    console.log('The server is now running on Port ' + port);
});
