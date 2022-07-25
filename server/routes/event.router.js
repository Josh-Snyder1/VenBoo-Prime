const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

const router = express.Router();

router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("action.payload is", req.body.date[1]);
  const sqlQuery = `
  INSERT INTO events (user_id, name, description, start_date, end_date)
  VALUES ($1, $2, $3, $4, $5 )
  `;

  const sqlParams = [
    req.body.user,
    req.body.name,
    req.body.description,
    req.body.date[0],
    req.body.date[1],
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`error in add new event router, ${err}`);
      res.sendStatus(500);
    });
});

module.exports = router;
