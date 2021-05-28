# CCAPDEV-Toon-List
ToonList Application for CCAPDEV20-21T2

## PROPONENTS
Aboy, Louis Allen B.<br />
Campos, Nicholas Scott G.<br />
Tan, Kenneth Edward I.

## ABOUT TOONLIST
ToonList is a web application developed by three DLSU Software Technology students which caters to Cartoon fans through collating a number of cartoon series to a web application. The web application is desing using Node.js for the back-end, MongoDB for its database, and handlebars-express, express, css, and js for the front-end.


## FOLDER AND FILE CONTENTS
Files are properly placed and labeled on folders based on the MVC Framework.
* controllers - controller.js is found in the controllers folder which controls the flow of the application execution and helps in communicating between the model and view.
* models - db.js is found in the models folder which would serve as medium to connect to the MongoDB
* public - contains all of the pictures of the cartoons, css and js files, and necessary images
* route - routes.js is found in the route folder that enables the application to define a URL pattern that maps to the request handler
* views - all hbs files are found in the views folder
* server.js - entry point to the ToonList web application

## SET-UP AND PRELIMINARY USAGE
1. Go the project's directory and open the command prompt

2. Run the command 'npm install' to install all corresponding node package manager modules used in the project

3. After the installation, run the command 'node index.js'. the command is successful if it prompted 'The server is now running on Port 3000'  in the command line

4. Open up any browser and type 'localhost:3000'

5. The browser should first navigate to ToonList's homepage containing a random featured cartoon, alongside it's synopsis and cartoon image. 
