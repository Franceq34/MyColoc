var express = require('express');
var bodyParser = require('body-parser');
var chores = express.Router();

var chore = require('../models/chore');
var user = require('../models/user');

chores.route('/get/:id')

.get(user.isLoggedIn, function(req, res, next)
{
    chore.get(req.params.id, res);
});

chores.route('/getChartData/:id')

.get(user.isLoggedIn, function(req, res, next)
{
    chore.getChartData(req.params.id, res);
});

chores.route('/getAllChores')

.get(user.isLoggedIn, function(req,res,next)
{
    chore.getAllChores(req, res);
});

chores.route('/deleteChore/:id')

.delete(user.isLoggedIn, function(req, res, next)
{
    chore.delete(req.params.id, res);
});

chores.route('/deleteChoreAccomplished/:id')

.delete(user.isLoggedIn, function(req, res, next)
{
    chore.deleteChoreAccomplished(req.params.id, res);
});

chores.route('/addChore')

.post(user.isLoggedIn, function(req, res, next)
{
    chore.create(req, req.body, res);
});

chores.route('/checkChore')

.post(user.isLoggedIn, function(req, res, next)
{
    chore.check(req, res);
});

module.exports = chores;