var express = require('express');
var bodyParser = require('body-parser');
var invitations = express.Router();
var invitation = require('../models/invitation');
var user = require('../models/user');


invitations.route('/send')

.post(user.isLoggedIn, function(req,res,next)
{
    invitation.add(req, req.body, res);
});

invitations.route('/readAll')

.get(user.isLoggedIn, function(req, res, next)
{
    invitation.readAll(req, res);
});

invitations.route('/delete/:id')

.delete(user.isLoggedIn, function(req, res, next)
{
    invitation.delete(req, res);
});


invitations.route('/deleteAllCurrent')

.delete(user.isLoggedIn, function(req, res, next)
{
    invitation.deleteAllCurrent(req, res);
});


module.exports = invitations;