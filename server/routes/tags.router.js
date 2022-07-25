const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `SELECT * FROM "tags"`
    console.log('in route.get for tags')
    pool.query( sqlQuery ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('in get tags router', error)
        res.sendStatus(500);
    });
});


module.exports = router;
