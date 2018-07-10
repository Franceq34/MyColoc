var express = require('express');
var router = express.Router();

/* CONSTANTES */
const auth = require('./auth');
const users = require('./users');
const colocs = require('./colocs');
const expenses = require('./expenses');
const tasks = require('./tasks');
const chores = require('./chores');
const invitations = require('./invitations');

/* APPELS DES ROUTES */
router.use('/api/auth', auth);
router.use('/api/users', users);
router.use('/api/colocs', colocs);
router.use('/api/expenses', expenses);
router.use('/api/tasks', tasks);
router.use('/api/chores', chores);
router.use('/api/invitations', invitations);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;