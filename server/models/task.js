var connection = require('../connection');

function Task()
{
    
    this.getAllTasks = function(req, res)
    {
        connection.acquire(function(err, connection)
        {
            connection.query('select distinct t.idTask, t.nameTask, t.isArchivedTask, u.firstnameUser as firstnameAuthorTask, u.nicknameUser as nicknameAuthorTask, t.dateTask from task t, user u where t.authorTask = u.idUser and u.idColoc = ?', [req.user.idColoc], function(err, result)
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

    
    this.create = function(req, task, res)
    {
        connection.acquire(function(err, con)
        {
            task.authorTask = req.user.idUser;
            con.query('insert into task set ?', task, function(err, result)
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

    /**
     * Update a specific task
     * @params task task in json format
     */
    this.update = function(req, task, res)
    {
        connection.acquire(function(err, con)
        {
            task.authorTask = req.user.idUser;
            con.query('update task set ? where idTask = ?', [task, task.idTask], function(err, result)
            {
                con.release();
                if (err)
                {
                    return res.status(500).json({err: 'Task update failed'});
                }
                else
                {
                    return res.status(200).json();
                }
            });
        });
    };


    /**
     * Delete a specific task
     * @params id task's id
     * @params res response
     */
    this.delete = function(id, res)
    {
        connection.acquire(function(err, con)
        {
            con.query('delete from task where idTask = ?', [id], function(err, result)
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

module.exports = new Task();