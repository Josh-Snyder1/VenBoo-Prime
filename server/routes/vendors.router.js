// Import the core libraries and functions
const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// Set the router and make these local routes available on the server
const router = express.Router();

// Import the used SQL queries
const { getAllVendors, getCostsOverTimeRange, getVendorsList } = require("../sql-queries/vendors.sql")


//---------------------------------------------------------
// Main route to get the event information.
// Uses logic to determine the information to return based
// on whether the user is a host, vendor, or an admin
router.get("/", rejectUnauthenticated, (req, res) => getVendorsList(req, res));

// Route to get information about a vendor's specific requested or approved booth
router.get("/approved-vendor-booths", (req, res) => getCostsOverTimeRange(req, res))

// Get a list of all vendors and their tags
router.get("/all", (req,res) => getAllVendors(req, res));


// Make the routes available
module.exports = router