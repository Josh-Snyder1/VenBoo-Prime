const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

const userRouter = require("./routes/user.router");
const eventsRouter = require("./routes/event.router");
const boothsRouter = require("./routes/booths.router");
const tagsRouter = require("./routes/tags.router");
const eventBoothsRouter = require("./routes/eventbooths.router");
const vendorRouter = require("./routes/vendors.router");
const adminRouter = require("./routes/admin.router");
const venuesRouter = require("./routes/venues.router");
const addressRouter = require("./routes/address.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/events", eventsRouter);
app.use("/api/booths", boothsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/eventbooths", eventBoothsRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/venues", venuesRouter);
app.use("/api/address", addressRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
