var express = require('express');
var bodyParser = require('body-parser');
var tasks = express.Router();

var task = require('../models/task');
var user = require('../models/user');

/** get all and post a new task */
tasks.route('/getAllTasks')

.get(user.isLoggedIn, function(req,res,next)
{
    task.getAllTasks(req, res);
})

tasks.route('/addTasks')

.post(user.isLoggedIn, function(req, res, next)
{
    task.create(req, req.body, res);
})

tasks.route('/updateTask')

.put(user.isLoggedIn, function(req, res, next)
{
    task.update(req, req.body, res);
});

tasks.route('/:id')

.get(user.isLoggedIn, function(req,res,next)
{
    task.get(req.params.id, res);
}) 

tasks.route('/deleteTask/:id')

.delete(user.isLoggedIn, function(req, res, next)
{
    task.delete(req.params.id, res);
});
 

module.exports = tasks;