var express = require('express');
var app = module.exports = express();

var login   = require('../controllers/login');
var signup  = require('../controllers/signup');
var index   = require('../controllers/index');
var profile = require('../controllers/profile');
var logout  = require('../controllers/logout');

app.set('views', './lib/views/');
app.set('view engine', 'jade');

app.use(index);
app.use(login);
app.use(signup);
app.use(profile);
app.use(logout);

app.get('/', function(req, res){
    res.render('index');
});

app.get('/signup', function(req, res){
    res.render('signup_form');
});

app.get('/login', function(req, res){
    res.render('login_form');
});

app.post('/login', function(req, res){
    var email = req.body.email,
        password = req.body.password;
    login.verify(email, password, function(err, user){
        if(user){
            req.session.regenerate(function(){
                req.session.user = user;
                req.session.success = 'Authorized';

                res.redirect('/profile')
            });
        } else {
            req.session.error = 'Failed';

            res.redirect('/login');
        }
    });
});

app.get('/logout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
});

app.get('/profile', profile.restrict, function(req, res){
    res.render('profile');
});