const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/vendor', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT
            events.name,
            booths.type,
            booths.dimensions,
            booths.quantity,
            booths.description,
            booths.cost,
            booth_applications.approved_by_host,
            booth_applications.requested_on,
            booth_applications.id
        FROM booths
        JOIN booth_applications
            ON booth_applications.booth_id = booths.id
        JOIN events
            ON booths.event_id = events.id
        WHERE booth_applications.user_id = $1;
    `;
    console.log('in /vendor GET for booths.router');
    pool.query( sqlQuery, [req.user.id])
        .then (result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('error in /vendor GET for booths.router', err);
            res.sendStatus(500);
        });
});

module.exports = router;