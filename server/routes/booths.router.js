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
            events.id AS event_id,
            events.start_date,
            events.end_date,
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

router.post('/', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `INSERT INTO booths (event_id, type, quantity)
                        VALUES ($1, $2, $3)`

    const sqlParams = [req.body.id, 'Medium', 5]
    console.log('in booths.router post', req.body)

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

    console.log('in router.delete booths', req.params.id)
    const sqlQuery = `DELETE FROM booths
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

    console.log('in booths.router.put', req.body)
    const sqlQuery = `UPDATE booths
                        SET 
                            type = $6,
                            dimensions = $5,
                            quantity = $4,
                            description = $3,
                            cost = $2
                        WHERE id = $1`

    const sqlParams = [
                        req.params.id, 
                        req.body.newCost, 
                        req.body.newDescription, 
                        req.body.newQuantity,
                        req.body.newDimensions,
                        req.body.newType
                    ]

    pool.query( sqlQuery, sqlParams )
        .then(dbRes => {
            console.log('in booths router')
            res.sendStatus(201)
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
})

router.post('/apply', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `INSERT INTO booth_applications (booth_id, user_id)
                        VALUES ($1, $2)`

    const sqlParams = [req.body.id, req.user.id]
    console.log('in booths.router post application', sqlParams)

    pool.query( sqlQuery, sqlParams )
        .then(dbRes => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
})

module.exports = router;