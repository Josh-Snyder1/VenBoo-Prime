const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {

    const sqlQuery = `SELECT * FROM venues
                        ORDER BY name ASC`
    console.log('in route.get for tags')
    pool.query( sqlQuery ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});


router.post('/', rejectUnauthenticated, (req, res) => {

    const addressSqlQuery = `
        INSERT INTO addresses (address, address_2, city, state, zipcode)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`

    const addressSqlParams = [
        req.body.address,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.zipcode
    ]

    const venueSqlQuery =`
    INSERT INTO venues 
    (name, contact_name, contact_phone, contact_email, contact_url, capacity, notes, address_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

    const venueSqlParams =[
        req.body.venueName, 
        req.body.contactName, 
        req.body.contactPhone,
        req.body.contactEmail,
        req.body.website,
        req.body.capacity,
        req.body.notes
    ]

    console.log('in venues.router post', req.body)

    pool
    .query(addressSqlQuery, addressSqlParams)
    .then((dbRes) => {
      let addressId = dbRes.rows[0].id;
      console.log("ADDRESS ID IS >>>>>>", addressId);
      // Create Venue
      return pool.query(venueSqlQuery, [...venueSqlParams, addressId]);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`error in add new venue router, ${err}`);
      res.sendStatus(500);
    });

});


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

router.put('/:venueId', rejectUnauthenticated, (req, res) => {

    console.log('in venues.router.put', req.body)
    const addressSqlQuery = `
        UPDATE addresses 
        SET    
            address = $6,
            address_2 = $5,
            city = $4,
            state = $3,
            zipcode = $2
        WHERE
            id = $1
        `

    const addressSqlParams = [
        req.body.addressId,
        req.body.zip,
        req.body.state,
        req.body.city,
        req.body.address2,
        req.body.newAddress
    ]

    const venueSqlQuery =`
        UPDATE venues 
            SET    
                notes = $8,
                contact_url = $7,
                contact_email = $6,
                contact_phone = $5,
                contact_name = $4,
                capacity = $3,
                name = $2
            WHERE
                id = $1
            `

    const venueSqlParams =[
        req.body.venueId,
        req.body.venueName, 
        req.body.capacity, 
        req.body.contactName,
        req.body.contactPhone,
        req.body.contactEmail,
        req.body.website,
        req.body.notes
    ]

    pool
    .query(addressSqlQuery, addressSqlParams)
    .then((dbRes) => {
        console.log('after address sql')
    //   let addressId = dbRes.rows[0].id;
    //   console.log("ADDRESS ID IS >>>>>>", addressId);
      // Create Venue
      return pool.query(venueSqlQuery,venueSqlParams);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`error in add new venue router, ${err}`);
      res.sendStatus(500);
    });
})

module.exports = router;
