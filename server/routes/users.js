var express = require('express');
var bodyParser = require('body-parser');
var users = express.Router();
var user = require('../models/user');


users.route('/current')

.get(user.isLoggedIn, function(req,res,next)
{
    user.read(req, res);
});

users.route('/updateUser')

.put(user.isLoggedIn, function(req,res,next)
{
    user.update(req, req.body, res);
});


module.exports = users;