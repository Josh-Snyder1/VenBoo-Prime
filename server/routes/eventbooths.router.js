const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res)=> {
    const sqlQuery = `
    SELECT * FROM "booths"
        
    `;
    console.log('in event booths router');
    pool.query(sqlQuery)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.error('error in event booth DB GET', err);
        res.sendStatus(500);
    });
});

module.exports = router;