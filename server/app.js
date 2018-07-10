var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();
const index = require('./routes/index');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
var connection = require('./connection');

/* -- connect to mysql -- */
connection.init();
app.use(index);

const router = require('express').Router();

 app.get('*',   (req, res) => {
   res.sendFile(path.join(__dirname, '../public/index.html'));
 });


module.exports = app;
