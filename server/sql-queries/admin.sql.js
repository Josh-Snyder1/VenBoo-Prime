// Import the database connection information
const pool = require('../modules/pool');


// Function that gets the current cost values that
// are displayed on the Admin dashboard
function AdminDashboardCost(req, res) {

  // Set the SQL query.
  //
  // ------- IMPORTANT ---------
  // The "events".start_date MUST compare against the
  // user-supplied `endDate`, and...
  // The "events".end_date MUST compare against the
  // user-supplied `startDate`!
  // Otherwise, it will not find events that fall
  // within the requested range
  const sqlQuery = `
    SELECT
      COUNT(DISTINCT "events".id) AS "number_of_events",
      ROUND(SUM("booths".cost), 2) AS "total_cost",
      ROUND(SUM("booths".cost * "booths".service_charge), 2) AS "income",
      ROUND(SUM("booths".cost) - SUM("booths".cost * "booths".service_charge), 2) AS "host_payment"
    FROM "events"
    JOIN "booths"
      ON "events".id = "booths".event_id
    JOIN "booth_applications"
      ON "booths".id = "booth_applications".booth_id
    WHERE "booth_applications".approved_by_host = 'APPROVED'
      AND "events".start_date < $2
      AND "events".end_date >= $1;
  `

  // Set the start and end date params
  const sqlParams = [
    req.params.startDate,
    req.params.endDate,
  ]

  // Make the DB request
  pool.query(sqlQuery, sqlParams)
  .then(result => {
    console.log(result.rows)
    res.send(result.rows)
  })
  .catch(error => {
    console.log(`Error occurred in /get-event-cost-details-by-date/ with ${error}`)
    res.sendStatus(500)
  })
}


module.exports = { AdminDashboardCost }