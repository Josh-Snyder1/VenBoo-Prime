const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('in eventbooths router PUT', req.body.boothAppId)
    const sqlQuery = `
        UPDATE "booth_applications"
        SET "approved_by_host" = 'APPROVED'
        WHERE "id" = $1
    `
    pool.query(sqlQuery, [req.body.boothAppId])
        .then(result => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/', rejectUnauthenticated, (req, res)=> {
    console.log('in router.get eventbooths')
    const sqlQuery = `
    SELECT
    booth_applications.id,  
	"user".business_name,
	    booths.dimensions,
        booths.quantity,
        booths.description,
        booths.cost,
	json_agg(booths.type) AS type,
	json_agg(tags.name) AS tags
FROM booths
JOIN booth_applications
	ON booth_applications.booth_id = booths.id
JOIN "user"
	ON "user".id = booth_applications.user_id
JOIN vendor_tags
	ON vendor_tags.user_id = "user".id
JOIN tags
	ON vendor_tags.tag_id = tags.id
    
GROUP BY "user".business_name, booths.type, booths.description, booths.dimensions, booths.cost, booths.quantity, booth_applications.id;

    `;
    console.log('in event booths router');
    pool.query(sqlQuery)
    .then(result => {
        res.send(result.rows);
        console.log('test router.get eventbooths')
    })
    .catch(err => {
        console.error('error in event booth DB GET', err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res)=> {
    console.log('booth deleted', req.params.id);
    const sqlQuery = `
    DELETE FROM booth_applications
    WHERE id =$1;
    `;
    const sqlParams = [req.params.id];
    pool
    .query(sqlQuery, sqlParams)
    .then(dbRes => {
        res.sendStatus(201);
      })
      .catch(err => {
       console.error('error in delete', err)
        res.sendStatus(500)
      })
  });



module.exports = router;