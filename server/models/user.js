var connection = require('../connection');
const jwt = require('jsonwebtoken');
var fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync('./rsa/key.pub');

function User()
{
    this.read = function(req, res)
    {
        res.status(200).json(req.user);
    };

    this.update = function(req, user, res)
    {
        connection.acquire(function(err, con)
        {
            user.idUser = req.user.idUser;
            con.query('update user set ? where idUser = ?', [user, user.idUser], function(err, result)
            {
                con.release();
                if (err)
                {
                    res.status(500).json({err: 'User update failed'});
                }
                else
                {
                    res.status(200).json();
                }
            });
        });
    };

    this.isLoggedIn = function (req, res, next) {
        const token = req.headers.authorization;
        if (token) {
           
        
            jwt.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
                if (err) { 
                    console.log(err);
                    return res.status(401).json('token invalid'); 
                }

                
                const sub = decoded.sub;
                
                connection.acquire(function (err, con) {
                    if (err) {
                        console.log(err);
                    }

                    con.query('SELECT * from user where idUser = ?', [sub], function(err, rows, fields) {
                        con.release();
                        if (err) {
                            console.log (err);
                            return res.status(401).json('token invalid');
                        }
                        req.user = rows[0];
                        next();
                    });
                });
            })

        } else {
            return res.status(401).json('pas de token !');
        }
    }

}

module.exports = new User();