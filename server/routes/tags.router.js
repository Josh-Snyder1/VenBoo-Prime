const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `SELECT * FROM tags
                        ORDER BY name ASC`
    console.log('in route.get for tags')
    pool.query( sqlQuery ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});


router.post('/', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `INSERT INTO tags (name)
                        VALUES ($1)`

    const sqlParams = [req.body.newTag]
    console.log('in tags.router post', req.body)

    pool.query( sqlQuery, sqlParams )
        .then(dbRes => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `DELETE FROM tags
                    WHERE id = $1`

    const sqlParams = [req.params.id]

    pool.query( sqlQuery, sqlParams )
        .then(dbRes => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {

    console.log('in tags.router.put', req.body)
    const sqlQuery = `UPDATE tags
                        SET name = $2
                        WHERE id = $1`

    const sqlParams = [req.params.id, req.body.newTag]

    pool.query( sqlQuery, sqlParams )
        .then(dbRes => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
})

module.exports = router;
