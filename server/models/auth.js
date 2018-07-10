var connection = require('../connection');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');
const RSA_KEY_PUBLIC = fs.readFileSync('./rsa/key.pub');

function Auth()
{
    this.createUser = function(user, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('select * from user where emailUser = ?', user.emailUser, function(err, result)
            {
                if (err)
                {
                    res.status(500).json('Erreur dans la création de l\'utilisateur');
                } else
                {
                    if (result.length > 0) {
                        res.status(400).json('Ce mail est déjà enregistré.');
                    } else {
                        user.passwordUser = bcrypt.hashSync(user.passwordUser, bcrypt.genSaltSync(8));
                        con.query('insert into user set ?', user, function(err, result)
                        {
                            con.release();
                            if (err)
                            {
                                return res.status(500).json('Erreur dans la création de l\'utilisateur');
                            } else
                            {
                                return res.status(200).json('Succès !');
                            }
                        });
                    }
                }

            });
        });
    };

    this.connectUser = function(user, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('select * from user where emailUser = ?', [user.emailUser], function(err, result)
            {
                con.release();
                if (err)
                {
                    res.status(401).json('Erreur durant la connexion');
                } else
                {
                    if(result.length){
                        let userbd = result[0];
                        if(bcrypt.compareSync(user.passwordUser, userbd.passwordUser)){
                            const token = jwt.sign({}, RSA_KEY_PRIVATE, {
                                algorithm: 'RS256',
                                subject: userbd.idUser.toString()
                            })
                            res.status(200).json(token);
                        } else {
                            res.status(401).json('Mot de passe invalide');
                        }
                    } else {
                        res.status(401).json('Mail inexistant');
                    }
                }
            });
        });
    };

    this.refreshToken = function(user, res)
    {
        jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
            if(err) { return res.status(403).json('Mauvais token')}
            const newToken = jwt.sign({}, RSA_KEY_PRIVATE, {
                algorithm: 'RS256',
                expiresIn: '15s',
                subject: decoded.sub
            })
            res.status(200).json(newToken);
        })
    };
}

module.exports = new Auth();