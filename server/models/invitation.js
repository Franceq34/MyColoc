var connection = require('../connection');
var user = require('../models/user');

function Invitation()
{

    this.readAll = function(req, res)
    {
        connection.acquire(function(err, con)
        {
            if (err) { 
                console.log(err);
                res.status(500).json("La connexion a échouée.");
            } else {
                con.query('select I.idUserInviter, I.idColoc, I.idUserInvited, U.firstnameUser as firstnameInviter, U.lastnameUser as lastnameInviter from invitation I, user U where I.idUserInviter = U.idUser and I.idUserInvited = ?', [req.user.idUser], function(err, result)
                {
                    con.release();
                    if (err) {
                        console.log (err);
                    }
                    res.status(200).json(result);
                });
            }
        });
    };

    this.add = function(req, user, res)
    {

        // DELIMITER |
        // CREATE TRIGGER before_insert_invitation BEFORE INSERT
        // ON Invitation FOR EACH ROW
        // BEGIN
        // 	DELETE FROM invitation
        //     WHERE idUserInvited = NEW.idUserInvited
        //     AND idColoc = NEW.idColoc;
        // END |
        // DELIMITER ;
        connection.acquire(function(err, con)
        {

            if (err) { 
                console.log(err);
                res.status(500).json("La connexion a échouée.");
            }

            con.query('select * from user where emailUser = ?', [user.emailUser], function(err, result)
            {
                if (err)
                {
                    console.log(err);
                    res.status(500).json("La récupération du mail a échoué");
                } else
                {
                    if (!result[0]){
                        res.status(400).json("Ce mail n'existe pas !");
                    } else {
                        let userInvited = result[0];
                        con.query('insert into invitation values(?, ?, ?)', [req.user.idUser, req.user.idColoc, result[0].idUser, ], function(err, result)
                        {
                            con.release();
                            if (err)
                            {
                                console.log(err);
                                res.status(500).json("L'envoi de l'invitation a échoué.");
                            } else
                            {
                                res.status(200).json("Votre invitation a bien été envoyée à "+[userInvited.firstnameUser]+" "+[userInvited.lastnameUser]);
                            }
                        });
                    }
                }
            });
        });
    };

    this.deleteAllCurrent = function(req, res){
        connection.acquire(function(err, con)
        {
            if (err) { 
                console.log(err);
                res.status(500).json("La connexion a échouée.");
            }
            con.query('delete from invitation where idUserInvited = ?', [req.user.idUser], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.status(500).json("La suppression a échoué");
                } else
                {
                    res.status(200).json("Les invitations ont été supprimées");
                }
            });
        });
    }

    this.delete = function(req, res){
        connection.acquire(function(err, con)
        {
            if (err) { 
                console.log(err);
                res.status(500).json("La connexion a échouée.");
            }
            con.query('delete from invitation where idColoc = ? and idUserInvited = ?', [req.params.id, req.user.idUser], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.status(500).json("La suppression a échoué");
                } else
                {
                    res.status(200).json("Les invitations ont été supprimées");
                }
            });
        });
    }

}

module.exports = new Invitation();