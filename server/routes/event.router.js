// Import the core libraries and functions
const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get the database connection
const pool = require("../modules/pool");

// Set the router and make these local routes available on the server
const router = express.Router();

// Import the used functions
const { GetEventsWithConsolidatedBoothInformation } = require("../sql-queries/events.sql")


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
  // On event creation TODO
  // set tags
  // set address zipcode input apon event creation
  // Add venue contact inputs to form contact_phone and contact_email

  const addressesQuery = `
      INSERT INTO addresses ( address, address_2, city, state, zipcode )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `;
  console.log("Address table is >>>>", req.body);
  const addressesParams = [
    req.body.address,
    req.body.address2,
    req.body.city,
    req.body.state,
    req.body.zip,
  ];

  const venueQuery = `
    INSERT INTO venues (name, contact_phone, contact_email, address_id)
    VALUES ($1,$2,$3,$4)
    RETURNING id
    `;

  const venueParmas = [req.body.venue, req.body.phone, req.body.email];

  const eventsQuery = `
    INSERT INTO events (user_id, name, description, start_date, end_date, venue_id)
    VALUES ($1, $2, $3, $4, $5, $6 )
    RETURNING id
    `;

  const eventsParams = [
    req.body.user,
    req.body.name,
    req.body.description,
    req.body.date[0],
    req.body.date[1],
  ];

  const eventTagsQuery = `
    INSERT INTO "event_tags" (tag_id, event_id)
    VALUES ($1, $2)
    `;

  console.log("SHOULD BE ARRAY OF NUMBERS", req.body.tag);
  const eventTagsParams = [~~req.body.tag];

  pool
    .query(addressesQuery, addressesParams)
    .then((dbRes) => {
      let addressId = dbRes.rows[0].id;
      console.log("ADDRESS ID IS >>>>>>", req.body.tag);
      // Create Venue
      return pool.query(venueQuery, [...venueParmas, addressId]);
    })
    .then((dbRes2) => {
      let venueId = dbRes2.rows[0].id;
      console.log("Venue ID IS >>>>>>", venueId);
      // Create the event
      return pool.query(eventsQuery, [...eventsParams, venueId]);
    })
    .then((dbRes3) => {
      let eventId = dbRes3.rows[0].id;
      console.log(eventId);
      // post event id
        return req.body.tag.map((tag) => {
          return pool.query(eventTagsQuery, [tag, eventId]);
        })
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
  console.log("UPDATE TAGS", eventId);
  // old tags
  const currentTagsParams = [eventId];

  const currentTagsQuery = ` 
  SELECT "tag_id", "id" FROM "event_tags" 
  WHERE "event_id"= $1
  `;
  // Deletes Tag
  const emptyEventTagsQuery = `
  DELETE FROM "event_tags"
  WHERE id = $1 ;
    `;
  // Update DB with new selected Tags
  const eventTagsQuery = `
    INSERT INTO "event_tags" (event_id, tag_id)
    VALUES ($1, $2)
    `;

  let newTags = [];
  let deleteTags = [];

  pool.query(currentTagsQuery, currentTagsParams).then((dbRes) => {
    console.log(req.body.tag);
    // Makes a new array of Old Tags from object with tag_id and id
    const oldTags = Array.from(dbRes.rows, (x) => x.tag_id);
    // Loops over new tags to find new tags to add to DB
    // pushes to new Tag array
    for (const t of req.body.tag) {
      if (!oldTags.includes(t)) {
        newTags.push(t);
      }
    }
    // Loops over old tags amd checks to see if new tags array contains a old tag
    // If it does contain the old tag it pushes the duplicate tag id to delete Tags array
    for (const t of dbRes.rows) {
      if (!req.body.tag.includes(t.tag_id)) {
        deleteTags.push(t.id);
      }
    }

    // loops through deleteTags array and deletes the tag
    for (const tag of deleteTags) {
      pool.query(emptyEventTagsQuery, [tag]).then(() => {
        console.log("sucessfully deleted Id", tag);
      });
    }
    // ADD NEW TAGS
    // loopes through newTags array and adds New Tags to DB
    for (const addTag of newTags) {
      pool.query(eventTagsQuery, [eventId, addTag]).then(() => {
        console.log("sucessfully added tag", addTag);
      });
    }
  });

  console.log("tags", newTags);

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
              return dbRes3;
            });
        });
    })
    .catch((error) => {
      console.log(`error in event router PUT ${error}`);
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


// Function to get events and booths information
router.get("/events-and-booths", rejectUnauthenticated, (req, res) => {
  GetEventsWithConsolidatedBoothInformation(req, res)
})

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
