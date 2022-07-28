// Import the core libraries and functions
const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

// Set the router and make these local routes available on the server
const router = express.Router();


// Main route to get the event information.
// Uses logic to determine the information to return based
// on whether the user is a host, vendor, or an admin
router.get('/', rejectUnauthenticated, (req, res) => {

  // Build the base SQL query
  let sqlQuery = `
    SELECT
      events.id,
      events.user_id,
      events.description,
      events.name,
      events.start_date,
      events.end_date,
      events.venue_id,
      events.verified,
      json_agg(booths) AS booths
    FROM events
    LEFT JOIN booths
      ON booths.event_id = events.id`

  // Will need to check 
  let sqlParams = []


  // -------------------------------------------------
  // Determine the logic to use based on the user-type
  switch (req.user.type) {
    // Host switch case
    case "host":
      // Set the host-specific query
      sqlQuery = sqlQuery + `
        WHERE events.user_id = $1
        GROUP BY events.id;
      `
      sqlParams = [
        req.user?.id,
      ]
      break

    // Vendor & admin switch case
    case "vendor":
    case "admin":
      // Set the host-specific query
      sqlQuery = sqlQuery + `
      GROUP BY events.id;
      `
      break

    // Set default case for non-registered users
    default:
      // Only allow them to see events in the future
      `
      WHERE events.start_date > CURRENT_TIMESTAMP
      GROUP BY events.id;
      `
      break
  // -------------------------------------------------
  }


  // Create the pool query
  pool.query( sqlQuery, sqlParams ).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(`Error in get events router with ${error}`)
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