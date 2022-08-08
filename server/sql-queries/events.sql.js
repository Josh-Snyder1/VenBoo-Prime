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
      "user"."first_name" AS "host_first_name",
      "user"."last_name" AS "host_last_name",
      "user"."email" AS "host_email",
      "user"."phone" AS "host_phone",
      "user"."main_url" AS "host_website",
      "venues"."id" AS "venue_id",
      "venues"."name" AS "venue_name",
      "venues"."capacity" AS "venue_capacity",
      "venues"."contact_name" AS "venue_contact_person",
      "venues"."contact_phone" AS "venue_contact_phone_number",
      "venues"."contact_email" AS "venue_contact_email",
      "venues"."contact_url" AS "venue_contact_website",
      "addresses"."id" AS "address_id",
      "addresses"."address" AS "venue_address",
      "addresses"."address_2" AS "venue_address_2",
      "addresses"."city" AS "venue_city",
      "addresses"."state" AS "venue_state",
      "addresses"."zipcode" AS "venue_zipcode",
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
    JOIN "venues"
      ON "venues"."id" = "events"."venue_id"
    JOIN "addresses"
      ON "addresses"."id" = "venues"."address_id"
    JOIN "user"
      ON "user"."id" = "events"."user_id"
    ${onlyOneRecord ? whereClause : ""}
    GROUP BY "addresses"."id", "venues"."id", "events"."id", "user"."id"
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


// Function that reduces the information for what the host needs
function RestructureBoothInformationForAdminAndHostUser(eventList) {

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

    // Add this updated object to the output array
    adminEventsArray.push(eventObj)
  }

// Return the formatted array
return adminEventsArray
}


// Function that reduces the information for what the host needs
function RestructureBoothInformationForStandardUser(eventList) {

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

    // Remove specific contact information for standard users (vendors)
    const keyValuesToRemove = [
      "host_first_name",
      "host_last_name",
      "host_email",
      "host_phone",
      "host_website",
      "venue_capacity",
      "venue_contact_person",
      "venue_contact_phone_number",
      "venue_contact_email",
      "venue_contact_website"
    ]
    // Remove the specified values from the object
    keyValuesToRemove.forEach(e => delete eventObj[e])

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


// Function that gets a singular booth based on a URL param
function GetOneEventWithVerboseBoothInformation(req, res) {

  // Initialize the variable that will store the function
  // that will be used to create the events list for the user
  let reduceFunctionByUserType;

  // Set the function based on user-type to be used later
  // during the database call and response
  switch (req.user.type) {

    // `admin` and `host` get access to contact information
    case "admin":
    case "host":
    case "vendor":
      reduceFunctionByUserType = RestructureBoothInformationForAdminAndHostUser
      break

    // `vendors` do not get contact information
    default:
      reduceFunctionByUserType = RestructureBoothInformationForStandardUser
  }

  // Call the database
  pool.query(EventsBoothsSQL(onlyOneRecord=true), [req.params.id])
  .then(result => {
    console.log('sql event', result.rows)
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
module.exports = {
  GetEventsWithConsolidatedBoothInformation,
  GetOneEventWithVerboseBoothInformation
}