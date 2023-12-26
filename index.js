const express = require('express');
const path = require('node:path');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const errorHandler = require('./middlewares/error');
const clientInfo = require('./middlewares/client');
const connectMongoDB = require('./database/config/connect');

const PORT = 3000;

const app = express();

app.set('json spaces', 1);
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');
app.use(logger('combined')); // loggin each request
app.use(express.json());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Middlewares
app.use(errorHandler); // API error handler middleware
app.use(clientInfo); // adds client information to req.client

connectMongoDB();
require('dotenv').config(); // for .env variables for VSCODE

// Block unrequired actions
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.append('X-Frame-Options', 'SAMEORIGIN');
    next();
});

// defining routes folders
require('./routes/get/router')(app); // get routes
require('./routes/post/router')(app); // post routes

app.listen(PORT, () => {
    console.log(`[^]: Server is listening to: http://localhost:${PORT}`.green);
});