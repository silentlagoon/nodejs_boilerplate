var express = require('express');
var app = module.exports = express();

//db mock
var users = {
    'dmitry@intspirit.com': {
        'email': 'dmitry@intspirit.com',
        'password': '123'
    }
};

module.exports.verify = function (email, password, cb){
    var user = users[email];

    if(! user) return cb(new Error('No such user'));

    if(user.password == password) return cb(null, user);
    cb(new Error('No such user'));
};