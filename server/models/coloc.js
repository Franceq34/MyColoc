var connection = require('../connection');
var user = require('../models/user');

function Coloc()
{
    this.read = function(req, res)
    {
        if (req.user.idColoc){
            let id = req.user.idColoc;
            connection.acquire(function(err, connection)
             {
                 connection.query('select * from coloc where idColoc = ?', [id], function(err, result)
                 {
                    connection.release();
                     if (err) {
                         console.log (err);
                         res.status(401).json('Erreur dans la récupération de la coloc');
                     } else {
                        res.status(200).json(result[0]);
                     }
                 });
             });
        } else {
            res.status(401).json('Erreur dans la récupération de la coloc');
        }
    };

    this.getMembres = function(req, res)
    {
        if (req.user.idColoc){
            let id = req.user.idColoc;
            connection.acquire(function(err, connection)
             {
                 connection.query('select * from coloc c, user u where c.idColoc = u.idColoc and c.idColoc = ?', [id], function(err, result)
                 {
                    connection.release();
                     if (err) {
                         res.status(401).json('Erreur dans la récupération des membres');
                     } else {
                        res.status(200).json(result);
                     }
                 });
             });
        } else {
            res.status(401).json('Erreur dans la récupération de la coloc');
        }
    };

    this.create = function(req, coloc, res)
    {
        connection.acquire(function(err, con)
        {

            if (err) { 
                console.log(err);
                res.status(500).json("Erreur serveur"); 
            } else {
                con.query('insert into coloc set ?', [coloc], function(err, result)
                {
                    con.release();
                    if (err)
                    {
                        console.log(err);
                        res.status(500).json("La création de la coloc a échouée.");
                    } else
                    {
                        let userUpdate = req.user;
                        userUpdate.idColoc = result.insertId;
                        user.update(req, userUpdate, res);
                    }
                });
            }
        });
    };

}

module.exports = new Coloc();