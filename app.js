var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./lib/routes/routes');

app.use(express.static(__dirname + '/css'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'shhhh, very secret'
}));
app.use(routes);

app.listen(8888);
console.log('App started...');