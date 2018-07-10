var express = require('express');
var bodyParser = require('body-parser');
var authentication = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');
const RSA_KEY_PUBLIC = fs.readFileSync('./rsa/key.pub');

var auth = require('../models/auth');

authentication.route('/signin')

.post(function(req,res)
{
    auth.connectUser(req.body, res);
});

authentication.route('/signup')

.post(function(req,res)
{
    auth.createUser(req.body, res);
});

authentication.route('/refresh')

.get(function(req,res)
{
    const token = req.headers.authorization;
        if (token) {
            jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
                if(err) { return res.status(403).json('Mauvais token')}
                const newToken = jwt.sign({}, RSA_KEY_PRIVATE, {
                    algorithm: 'RS256',
                    expiresIn: '3600s',
                    subject: decoded.sub
                })
                res.status(200).json(newToken);
            })
        } else {
            res.status(403).json('Pas de token à rafraîchir !');
        }
});

module.exports = authentication;