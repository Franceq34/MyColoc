var express = require('express');
var bodyParser = require('body-parser');
var colocs = express.Router();
var coloc = require('../models/coloc');
var user = require('../models/user');


colocs.route('/current')

.get(user.isLoggedIn, function(req,res,next)
{
    coloc.read(req, res);
});

colocs.route('/members')

.get(user.isLoggedIn, function(req,res,next)
{
    coloc.getMembres(req, res);
});

colocs.route('/createColoc')

.post(user.isLoggedIn, function(req, res, next)
{
    coloc.create(req, req.body, res);
})


module.exports = colocs;