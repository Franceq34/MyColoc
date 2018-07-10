var express = require('express');
var bodyParser = require('body-parser');
var expenses = express.Router();

var user = require('../models/user');

var expense = require('../models/expense');

/** get all and post a new expense */
expenses.route('/getAllExpenses')

.get(user.isLoggedIn, function(req,res,next)
{
    expense.getAllExpenses(req, res);
});

expenses.route('/getChartData')

.get(user.isLoggedIn, function(req,res,next)
{
    expense.getChartData(req, res);
});

expenses.route('/addExpense')

.post(user.isLoggedIn,  function(req, res, next)
{
    expense.create(req, res);
});

/** get stuff from specific expense */
expenses.route('/read/:id')

.get(user.isLoggedIn, function(req,res,next)
{
    expense.get(req.params.id, res);
});

expenses.route('/:id')

.put(user.isLoggedIn, function(req, res, next)
{
  //TODO : get element by req.params.expenseId
    expense.update(req.body, res);
})

.delete(user.isLoggedIn, function(req, res, next)
{
    expense.delete(req.params.id, res);
});
 

module.exports = expenses;