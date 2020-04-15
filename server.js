const express = require("express");
const ejs = require('ejs');
const app = express();
const path = require("path");
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 9000;

// Setting up the requests and responses
app.use(session({   //<------- In case we have to use a database
  secret: 'NASA',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Middleware
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false}));


// viewed at http://localhost:8080
app.get("/", function (req, res) {
  // res.sendFile(path.join(__dirname + "/views/index.html"));
  res.render('./index.ejs');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
