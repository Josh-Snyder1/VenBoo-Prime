// Import the database settings
const pool = require("../modules/pool")


// Function that gets the events, booths, and booth
// application numbers. Allows for either a single event
// or all events
function EventsBoothsSQL(onlyOneRecord=false) {

  // Set the optional `WHERE` clause
  const whereClause = `WHERE "events"."id" = $1`

  return `
    SELECT
      "events"."id",
      "events"."user_id",
      "events"."description",
      "events"."name",
      "events"."start_date",
      "events"."end_date",
      "events"."venue_id",
      "events"."verified",
      COALESCE(json_agg(
        DISTINCT jsonb_build_object(
          'id', "booths"."id",
          'type', "booths"."type",
          'dimensions', "booths"."dimensions",
          'quantity', "booths"."quantity",
          'reserved_booths', (
            SELECT
              COUNT("booth_applications"."approved_by_host")
            FROM "booth_applications"
            WHERE "booths"."id" = "booth_applications"."booth_id"
              AND "booth_applications"."approved_by_host" = 'APPROVED'
          ),
          'available_booths', (
            SELECT
              "booths"."quantity" - COUNT("booth_applications"."approved_by_host")
            FROM "booth_applications"
            WHERE "booths"."id" = "booth_applications"."booth_id"
              AND "booth_applications"."approved_by_host" = 'APPROVED'
          ),
          'cost', "booths"."cost"
        )
      ) FILTER (WHERE "booths"."id" IS NOT NULL), '[]')
      AS "booths",
    COALESCE(json_agg(DISTINCT "tags".*)
      FILTER (WHERE "tags"."id" IS NOT NULL), '[]')
      AS "tags"
    FROM "events"
    JOIN "booths"
      ON "events"."id" = "booths"."event_id"
    JOIN "booth_applications"
      ON "booths"."id" = "booth_applications"."booth_id"
    JOIN "event_tags"
      ON "events"."id" = "event_tags"."event_id"
    JOIN "tags"
      ON "tags"."id" = "event_tags"."tag_id"
    ${onlyOneRecord ? whereClause : ""}
    GROUP BY "events"."id"
    ORDER BY "events"."start_date";
  `
}


// Function that reduces the information for what the admin needs
function ReduceFieldsForAdminUser(eventList) {

    // Initialize the output array
    adminEventsArray = []

    // Loop over all the results
    for (const eventObj of eventList) {

      // Add the booth values together
      eventObj["total_booths"] = eventObj.booths.reduce(
        (value, boothObj) => value + boothObj.quantity, 0
      )

      // Add the reserved booth values
      eventObj["reserved_booths"] = eventObj.booths.reduce(
        (value, boothObj) => value + boothObj.reserved_booths, 0
      )

      // Add the available booth values together
      eventObj["available_booths"] = eventObj.booths.reduce(
        (value, boothObj) => value + boothObj.available_booths, 0
      )

      // Remove the booths list from the return object
      delete eventObj.booths

      // Add this updated object to the output array
      adminEventsArray.push(eventObj)
    }

  // Return the formatted array
  return adminEventsArray
}


// Function that gets a specific event and shows information
// relating to the booths that are available
function GetEventsWithConsolidatedBoothInformation(req, res) {

  // Initialize the variable that will store the function
  // that will be used to create the events list for the user
  let reduceFunctionByUserType;

  // Set the function based on user-type to be used later
  // during the database call and response
  switch (req.user.type) {
    case "admin":
      reduceFunctionByUserType = ReduceFieldsForAdminUser
      break
    default:
      return
  }

  // Call the database
  pool.query(EventsBoothsSQL())
  .then(result => {
    // Return the formatted result array
    res.send(
      reduceFunctionByUserType(result.rows)
    )
  })
  .catch(error => {
    console.log(`Error on GetEventsWithConsolidatedBoothInformation with ${error}`)
    res.sendStatus(500)
  })
}


// Make the function accessible
module.exports = { GetEventsWithConsolidatedBoothInformation }