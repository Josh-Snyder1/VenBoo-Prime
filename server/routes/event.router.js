// Import the core libraries and functions
const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get the database connection
const pool = require("../modules/pool");

// Set the router and make these local routes available on the server
const router = express.Router();

// Main route to get the event information.
// Uses logic to determine the information to return based
// on whether the user is a host, vendor, or an admin
router.get("/", rejectUnauthenticated, (req, res) => {

  // Initialize the parameters as a blank array
  let sqlParams = [];

  // Initialize a where clause to the set later
  let setWhereClause = "";

  // -------------------------------------------------
  // Determine the logic to use based on the user-type
  switch (req.user.type) {
    // Host switch case
    case "host":
      // Set the host-specific query
      setWhereClause = "WHERE events.user_id = $1";
      // Add the current user to the params list
      sqlParams.push(req.user.id);
      break;

    // Vendor & admin switch case
    case "vendor":
    case "admin":
      // Keep the `setWhereClause` as a blank string
      break;

    // Set default case for non-registered users
    default:
      // Only allow them to see events in the future
      setWhereClause = "WHERE events.start_date > CURRENT_TIMESTAMP";
      break;
    // -------------------------------------------------
  }

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
      COALESCE(json_agg(
        DISTINCT jsonb_build_object(
          'id', booths.id,
          'event_id', booths.event_id,
          'type', booths.type,
          'dimensions', booths.dimensions,
          'quantity', booths.quantity,
          'description', booths.description,
          'cost', booths.cost
        )
      ) FILTER (WHERE booths.id IS NOT NULL), '[]')
        AS booths,
      COALESCE(json_agg(DISTINCT "tags".*)
        FILTER (WHERE tags.id IS NOT NULL), '[]')
        AS tags,
      COALESCE(json_agg(DISTINCT "addresses".*)
        FILTER (WHERE addresses.id IS NOT NULL), '[]')
        as address
    FROM events
    LEFT JOIN "event_tags"
      ON "events".id = "event_tags".event_id
    LEFT JOIN "tags"
      ON "tags".id = "event_tags".tag_id
    LEFT JOIN "venues"
      ON "events".venue_id = "venues".id
    LEFT JOIN "addresses"
      ON "addresses".id = "venues".address_id
    LEFT JOIN booths
      ON "booths".event_id = "events".id
    ${setWhereClause}
    GROUP BY events.id;`;

  // Create the pool query
  pool
    .query(sqlQuery, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in get events router with ${error}`);
      res.sendStatus(500);
    });
});


router.post("/", rejectUnauthenticated, (req, res) => {
  const addressesQuery = `
      INSERT INTO addresses ( address, city, state )
      VALUES ($1, $2, $3)
      RETURNING id
      `;

  const addressesParams = [req.body.address, req.body.city, req.body.state];

  const venueQuery = `
    INSERT INTO venues (name, address_id)
    VALUES ($1,$2)
    RETURNING id
    `;

  const venueParmas = [req.body.name];

  const eventsQuery = `
    INSERT INTO events (user_id, name, description, start_date, end_date, venue_id)
    VALUES ($1, $2, $3, $4, $5, $6 )
    `;

  const eventsParams = [
    req.body.user,
    req.body.name,
    req.body.description,
    req.body.date[0],
    req.body.date[1],
  ];

  pool
    .query(addressesQuery, addressesParams)
    .then((dbRes) => {
      let addressId = dbRes.rows[0].id;
      // Create Venue
      return pool.query(venueQuery, [...venueParmas, addressId]);
    })
    .then((dbRes2) => {
      let venueId = dbRes2.rows[0].id;
      // Create the event
      return pool.query(eventsQuery, [...eventsParams, venueId]);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`error in add new event router, ${err}`);
      res.sendStatus(500);
    });
});

router.put("/", rejectUnauthenticated, (req, res) => {
  console.log("PUT EDIT FORM req.body is", req.body.venueName);

  const eventsQuery = `UPDATE "events"
  SET name= $3, start_date= $4, end_date= $5
  WHERE id= $1 AND user_id= $2
  RETURNING venue_id;
  `;

  const eventsParams = [
    req.body.eventId,
    req.body.userId,
    req.body.eventName,
    req.body.startDate,
    req.body.endDate,
  ];

  const venueQuery = `UPDATE "venues"
  SET  name= $1
  WHERE id= $2
  RETURNING address_id
  `;
  const venueParmas = [req.body.venueName];

  const addressesQuery = `UPDATE "addresses"
  SET address= $1, city= $2, state= $3, zipcode= $4
  WHERE id= $5
  `;

  const addressesParams = [
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.zip,
  ];
  const eventId = Number(req.body.eventId);

  // UPDATE TAGS

  const emptyEventTagsParams = [eventId];
  const emptyEventTagsQuery = `
  DELETE FROM "event_tags" 
  WHERE event_id= $1 ;
    `;
  for (const tg of req.body.tag) {
    const eventTagsParams = [eventId, tg];
    const eventTagsQuery = `
    INSERT INTO "event_tags" (event_id, tag_id)
    VALUES ($1, $2)
    `;
    pool.query(emptyEventTagsQuery, emptyEventTagsParams).then((dbRes) => {
      return pool.query(eventTagsQuery, eventTagsParams).then((dbRes2) => {
        return dbRes2;
      });
    });
  }

  // UPDATE EVENT, VENUE AND ADDRESS
  pool
    .query(eventsQuery, eventsParams)
    .then((dbRes) => {
      let venueId = dbRes.rows[0].venue_id;
      return pool
        .query(venueQuery, [...venueParmas, venueId])
        .then((dbRes2) => {
          let addressId = dbRes2.rows[0].address_id;
          return pool
            .query(addressesQuery, [...addressesParams, addressId])
            .then((dbRes3) => {
              console.log("DB RES 3 is >>>>>>", dbRes3.rows);
              return dbRes3;
            });
        });
    })
    .catch((error) => {
      console.log("error in event router PUT", error);
    });
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
          "booth_applications".id AS "boothApp_id",
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
      WHERE "events".id = $1;
  `;

  // Get the event ID from the URL params
  const sqlParams = [req.params.id];

  // Pool the DB to get the results
  pool
    .query(sqlQuery, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error in booth-applications with ${err}`);
      res.sendStatus(500);
    });
});

//duplicate code that is done in the booths.router.js file

// router.delete('/:id', (req, res)=> {
//   console.log('booth deleted from available', req.params.id);
//   const sqlQuery = `
//   DELETE FROM booths
//   WHERE id =$1;
//   `;
//   const sqlParams = [req.params.id];
//   pool
//   .query(sqlQuery, sqlParams)
//   .then(dbRes => {
//       res.sendStatus(201);
//     })
//     .catch(err => {
//      console.error('error in delete', err)
//       res.sendStatus(500)
//     })
// });

// Make the router routes accessible
module.exports = router;
