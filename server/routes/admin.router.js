// Import the core libraries and functions
const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Set the router function
const router = express.Router();

// Import the used functions
const { AdminDashboardCost } = require("../sql-queries/admin.sql")






// Route for the admin to get money values for events from
// the database. Takes in a start date and an end date and 
// aggregates the sums over those times for all events.
router.get('/get-event-cost-details-by-date/:startDate/:endDate', rejectUnauthenticated, (req, res) => {
  
  // Make the admin SQL query
  AdminDashboardCost(req, res)
})


// Make the router accessible
module.exports = router