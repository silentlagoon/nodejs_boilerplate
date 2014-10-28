var express = require('express');
var app = module.exports = express();

module.exports.restrict = function(req, res, next){
    if(req.session.user){
        next();
    } else {
        req.session.error = 'Access denied';
        res.redirect('/login');
    }
};