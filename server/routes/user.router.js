const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `UPDATE "user"
  SET first_name= $2, last_name= $3, title= $4, business_name= $5, description= $6, phone= $7, main_url= $8, facebook_url= $9, etsy_url= $10, linkedin_url= $11 
  WHERE id= $1  
    `;

  const sqlParams = [
    req.body.id,
    req.body.name,
    req.body.lastName,
    req.body.title,
    req.body.BuisnessName,
    req.body.description,
    req.body.phone,
    req.body.website,
    req.body.facebook,
    req.body.etsy,
    req.body.linkedIn,
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in user router", error);
    });
});
// const sqlQuery1 = `
// UPDATE "addresses"
// SET (address = $2, city = $3, state = $4, zipcode = $5)
// WHERE id = $1
// `;
// const sqlParams1 = [
//   req.body.address.id,
//   req.body.address,
//   req.body.city,
//   req.body.state,
//   req.body.zip,
// ];

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  // const email = req.body.email;
  // const password = encryptLib.encryptPassword(req.body.password);

  const sqlQuery = `INSERT INTO "user" (email, password, phone, type)
    VALUES ($1, $2, $3, $4) RETURNING id`;

  const sqlParams = [
    req.body.username,
    encryptLib.encryptPassword(req.body.password),
    req.body.phoneNumber,
    req.body.userType,
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((result) => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
