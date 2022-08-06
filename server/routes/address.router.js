const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/:id', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `SELECT * FROM addresses
                        WHERE id = $1;`

    const sqlParams = [req.params.id]

    console.log('in route.get for tags')
    pool.query( sqlQuery, sqlParams ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

module.exports = router;
