const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {

  console.log(req.user.id, "IS ID >>>>>>>>>>>>>>>>.")

  const sqlQuery = `SELECT * FROM "events"`
  console.log('in route.get for events')
  pool.query( sqlQuery ).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log('in get events router', error)
      res.sendStatus(500);
  });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  //   console.log("action.payload is", req.body.date[1]);

  const sqlQuery = `
      INSERT INTO addresses ( address, city, state )
      VALUES ($1, $2, $3)
      RETURNING id
      `;

  const sqlParams = [req.body.address, req.body.city, req.body.state];

  const sqlQuery2 = `
    INSERT INTO venues (name, address_id)
    VALUES ($1,$2)
    RETURNING id
    `;

  const sqlParams2 = [req.body.name];

  const sqlQuery3 = `
    INSERT INTO events (user_id, name, description, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5 )
    `;

  const sqlParams3 = [
    req.body.user,
    req.body.name,
    req.body.description,
    req.body.date[0],
    req.body.date[1],
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      console.log(
        "????",
        dbRes.rows[0],
        dbRes.rows[0].id !== undefined,
        dbRes.rows[0].id === undefined
      );
      if (dbRes.rows[0].id) {
        pool
          .query(sqlQuery2, [...sqlParams2, dbRes.rows[0].id])
          .then((dbRes2) => {
            console.log("2>>>>>>", dbRes2);
            if (dbRes2.rows[0].id) {
              console.log(">>>>>>>>>", dbRes2);
              pool.query(sqlQuery3, sqlParams3);
            }
          });
      }
    })
    .catch((err) => {
      console.log(`error in add new event router, ${err}`);
      res.sendStatus(500);
    });
  res.sendStatus(200);
});


// Router call that returns a list of all the booth requests
// made by vendors for a specific event. Returns a list of all
// applications: approved, pending, rejected
router.get("/:id/booth-applications", (req, res) => {

  // Set the SQL query
  const sqlQuery = `
      SELECT
          "events".id as "event_id",
          "booths".id as "booth_id",
          "booths".type,
          "booths".dimensions,
          "booths".quantity,
          "booths".description,
          "booths".cost,
          "booth_applications".approved_by_host,
          "booth_applications".notes,
          "booth_applications".requested_on,
          "user".id as "vendor_id",
          "user".email,
          "user".business_name,
          "user".description
      FROM "events"
      JOIN "booths"
          ON "events".id = "booths".event_id
      JOIN "booth_applications"
          ON "booths".id = "booth_applications".booth_id
      JOIN "user"
          ON "booth_applications".user_id = "user".id
      WHERE "events".user_id = $1;
  `

  // Get the event ID from the URL params
  const sqlParams = [req.params.id]

  // Pool the DB to get the results
  pool.query(sqlQuery, sqlParams)
  .then(result => res.send(result.rows))
  .catch(err => `Error in booth-applications with ${err}`)
})


// Make the router routes accessible
module.exports = router;