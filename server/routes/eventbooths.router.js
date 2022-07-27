const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res)=> {
    const sqlQuery = `
    SELECT
        "user".business_name,
        booths.type,
        booths.dimensions,
        booths.quantity,
        booths.description,
        booths.cost
FROM    booths
JOIN    booth_applications ON  booth_applications.booth_id = booths.id
JOIN    "user" ON "user".id = booth_applications.user_id;
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

router.delete('/:id', (req, res)=> {
    console.log('booth deleted', req.params.id);
    const sqlQuery = `
    DELETE FROM "booths"
    WHERE "id" =$1;
    `;
    const sqlValues = [req.params.id];
    pool
    .query(sqlQuery, sqlValues)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
       console.error('error in delete', err)
        res.sendStatus(500)
      })
  });

module.exports = router;