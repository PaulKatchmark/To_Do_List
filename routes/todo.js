var router = require('express').Router();
var pg = require('pg');
var config = {
    database: 'rho'
};
var pool = new pg.Pool(config);

router.get('/', function(req, res) {
    pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }
            client.query('SELECT * FROM tasks ORDER BY task_status ASC;', function(err, result) {
                if (err) {
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                }
                console.log('Got rows from the DB:', result.rows);
                res.send(result.rows);
            });
        } finally {
            done();
        }
    });
});

router.post('/', function(req, res) {
    pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting the DB', err);
                res.sendStatus(500);
                return;
            }
            client.query('INSERT INTO tasks (open_tasks) VALUES ($1) returning *;', [req.body.open_tasks],
                function(err, result) {
                    if (err) {
                        console.log('Error querying the DB', err);
                        res.sendStatus(500);
                        return;
                    }
                    console.log('Got rows from the DB:', result.rows);
                    res.send(result.rows);
                });
        } finally {
            done();
        }
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    var task_status = req.body.task_status;
    pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting the DB', err);
                res.sendStatus(500);
                return;
            }
            client.query('UPDATE tasks SET task_status = NOT task_status WHERE id =$1;', [id],
                function(err, result) {
                    if (err) {
                        console.log('Error querying database', err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        } finally {
            done();
        }
    });
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting to DB', err);
                res.sendStatus(500);
                return;
            }
            client.query('DELETE FROM tasks WHERE id=$1;', [id], function(err) {
                if (err) {
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(204);
            });
        } finally {
            done();
        }
    });
});

module.exports = router;
