const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {

  const sqlQuery = `SELECT * FROM "events"`
  console.log('in route.get for events')
  pool.query( sqlQuery ).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log('in get events router', error)
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

module.exports = router;
