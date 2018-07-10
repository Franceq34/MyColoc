var connection = require('../connection');

function Chore()
{
    
    this.get = function(id, res)
    {
        connection.acquire(function(err, connection)
        {
            connection.query('select * from chore where idChore = ?', [id], function(err, result)
            {
                if (err) {
                    console.log (err);
                    res.status(500).json("Erreur de serveur");
                } else {
                    result = result[0];
                    connection.query('select a.idAccomplished, a.dateAccomplished, u.idUser, u.firstnameUser, u.nicknameUser from accomplished a join user u on a.idUser = u.idUser where idChore = ? order by a.dateAccomplished desc', [id], function(err, history)
                    {
                        connection.release();
                        if (err) {
                            console.log (err);
                            res.status(500).json("Erreur de serveur");
                        }
                        result.historyAccomplished = history;
                        res.status(200).json(result);
                    });
                }
            });
        });
    };

    this.getChartData = function(id, res)
    {
        connection.acquire(function(err, connection)
        {
            connection.query('select u.firstnameUser, u.nicknameUser, count(a.idAccomplished) as numberAccomplished from accomplished a join user u on u.idUser=a.idUser where a.idChore = ? group by a.idUser', [id], function(err, result)
            {
                connection.release();
                if (err) {
                    console.log (err);
                    res.status(500).json("Erreur de serveur");
                } else {
                    res.status(200).json(result);
                }
            });
        });
    };

    this.getAllChores = function(req, res)
    {
        connection.acquire(function(err, connection)
        {
            connection.query('select c.idChore, c.nameChore, u.firstnameUser as firstnameLastUser, u.nicknameUser as nicknameLastUser, a.dateAccomplished as dateLastAccomplished from chore c left outer join accomplished a on c.idChore = a.idChore left outer join user u on a.idUser = u.idUser where c.idColoc = ? and a.dateAccomplished = (select max(a2.dateAccomplished) from accomplished a2 where a2.idChore = a.idChore) or  a.dateAccomplished IS NULL order by a.dateAccomplished', [req.user.idColoc], function(err, result)
            {
                connection.release();
                if (err) {
                    console.log (err);
                    res.status(500).json("Erreur de serveur");
                }
                res.status(200).json(result);
            });
        });
    };

    this.create = function(req, chore, res)
    {
        connection.acquire(function(err, con)
        {
            chore.idColoc = req.user.idColoc;
            con.query('insert into chore set ?', chore, function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.status(500).json("Erreur de serveur");
                } else
                {
                    res.status(200).json("Tâche créée avec succès");
                }
            });
        });
    };

    this.check = function(req, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('insert into accomplished (idChore, idUser, dateAccomplished) values(?, ?, ?)', [req.body.idChore, req.user.idUser, req.body.dateAccomplished], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.status(500).json("Erreur de serveur");
                } else
                {
                    res.status(200).json("Tâche créée avec succès");
                }
            });
        });
    };

    this.delete = function(id, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('delete from chore where idChore = ?', [id], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.status(500).json("Erreur de serveur");
                }
                else
                {
                    res.status(200).json("Tâche supprimée avec succès");
                }
            });
        });
    };

    this.deleteChoreAccomplished = function(id, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('delete from accomplished where idAccomplished = ?', [id], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.status(500).json("Erreur de serveur");
                }
                else
                {
                    res.status(200).json("Tâche supprimée avec succès");
                }
            });
        });
    };

}

module.exports = new Chore();