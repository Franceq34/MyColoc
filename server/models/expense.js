var connection = require('../connection');
const jwt = require('jsonwebtoken');
var fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync('./rsa/key.pub');


function Expense()
{
    /**
     * Get ALL expenses from table
     * @params res response
     */
    this.getAllExpenses = function(req, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('select E.idExpense, E.titleExpense, E.amountExpense, E.dateExpense, E.authorExpense, U.firstnameUser, U.nicknameUser from expense E, user U where E.authorExpense = U.idUser and U.idColoc = ?', [req.user.idColoc], function(err, result)
            {
                con.release();
                if(err) {
                    console.log(err);
                    res.status(500).json("Erreur serveur");
                    
                }
                res.status(200).json(result);
            });
        });
    };

    this.getChartData = function(req, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('SELECT C.idUser, SUM(E.amountExpense/(SELECT COUNT(subC.idUser) FROM concerned subC WHERE subC.idExpense = E.idExpense)) as amount FROM concerned C, expense E WHERE E.idExpense = C.idExpense GROUP BY C.idUser', [req.user.idColoc], function(err, amountsConcerned)
            {
                if(err) {
                    console.log(err);
                    res.status(500).json("Erreur serveur");
                    
                }
                else {
                    con.query('SELECT U.idUser, SUM(E.amountExpense) as amount FROM  expense E, user U WHERE E.authorExpense = U.idUser GROUP BY U.idUser', function(err, amountsPayed)
                    {
                        con.release();
                        if(err) {
                            console.log(err);
                            res.status(500).json("Erreur serveur");
                            
                        }
                        let result = [{amountsConcerned: amountsConcerned, amountsPayed: amountsPayed}];
                        res.status(200).json(result[0]);
                    });
                }
            });
        });
    };

    /**
     * Get a specific expense
     */
    this.get = function(id, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('select * from expense E where E.idExpense = ?', [id], function(err, expense) {
                if (err)
                {
                    console.log(err);
                    res.status(500).json("Erreur de serveur");
                }
                else
                {
                    con.query('select U.idUser, U.firstnameUser, U.lastnameUser from concerned C, user U where C.idUser = U.idUser and C.idExpense = ?', [id], function(err, membersConcerned) {
                        con.release();
                        if (err)
                        {
                            console.log(err);
                            res.status(500).json("Erreur de serveur");
                        }
                        else
                        {
                            expense[0].membersConcerned = membersConcerned;
                            res.status(200).json(expense[0]);
                        }
                    });
                }
            });
        });
    };

    /**
     * Create an expense
     * @params expense expense in json format
     * @params res response
     */
    this.create = function(req, res)
    {
        connection.acquire(function(err, con)
        {
                con.query('insert into expense values (null, ?, ?, ?, ?)', [req.body.titleExpense, req.body.amountExpense, req.body.dateExpense, req.body.authorExpense], function(err, result)
                {
                    if (err)
                    {
                        console.log(err);
                        res.status(500).json("La création a échouée");
                    } else
                    {
                        const idExpense = result.insertId;
                        let querystring = "insert into concerned values ";
                        console.log(req.body);
                        req.body.membersConcerned.forEach(function(el, index) {
                            querystring += "("+el+", "+idExpense+"),";
                        });
                        querystring = querystring.substring(0, querystring.length-1);
                        con.query(querystring, function(err, result)
                        {
                            con.release();
                            if (err)
                            {
                                console.log(err);
                                res.status(500).json("La création des dépendences a échouée");
                            } else {
                                res.status(200).json({idUser: req.body.authorExpense, idExpense: result.insertId});
                            }
                        });
                    }
                });
        });
    };

    

    /**
     * get the last id
     * TODO : move it in logical file
     * @params res response
     */
    // function getLastId(res)
    // {
    //     connection.acquire(function(err, con)
    //     {
    //         con.query('SELECT LAST_INSERT_ID() as id',  function(err, result) {
    //             con.release();
    //             if (err)
    //             {
    //                 console.log(err);
    //                 res.send({status: 1, message: 'EXPENSE creation failed'});
    //             }
    //             else
    //             {
    //                 res.send({status: 0, message: 'EXPENSE created successfully', id:result[0].id});
    //             }
    //         });
    //     });
    // }

    /**
     * Update a specific expense
     * @params expense expense in json format
     */
    this.update = function(expense, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('update expense set ? where id = ?', [expense, expense.idExpense], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.send({status: 1, message: 'EXPENSE update failed'});
                }
                else
                {
                    res.send({status: 0, message: 'EXPENSE updated successfully'});
                }
            });
        });
    };

    /**
     * Delete a specific expense
     * @params id expense's id
     * @params res response
     */
    this.delete = function(id, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('delete from expense where idExpense = ?', [id], function(err, result)
            {
                con.release();
                if (err)
                {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to delete'});
                }
                else
                {
                    res.send({status: 0, message: 'Deleted successfully'});
                }
            });
        });
    };

    /**
     * Check a login validity
     * @params user user in json format
     * @params res response
     */
    // this.checkLogin = function(user, res)
    // {
    //     connection.acquire(function(err, con)
    //     {
    //         console.log(user.email);
    //         con.query('select id from user where email = ? AND pwd = ?', [user.email, user.pwd], function(err, result)
    //         {
    //             con.release();
    //             if (err)
    //             {
    //                 console.log(err);
    //                 res.send({status: 2, message: 'Request error'});
    //             }
    //             else
    //             {
    //                 if(result.length > 0) res.send({status: 0, message: 'Connexion OK', id: result[0].id});
    //                 else res.send({status: 1, message: 'login failed'});
    //             }
    //         });
    //     });
    // };
}

module.exports = new Expense();