require("dotenv").config();

/* APP DEPENDENCIES */
const express = require("express");
const db = require("./database/configs");
require("./auth");

/* APP CONFIGS */
const app = express();

/* ROUTE FETCHERS */
// we split our routes in different variables instead of having everything inside app
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");

/* DATABASE CONNECTOR */
db.connector
  .sync()
  .then(() => console.log("Drop and create db"))
  .catch((error) => console.error(`sync failed: ${error}`));

/* APP MIDDLEWARE */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ROUTE SETTERS */
// here is were we define which route relates to which variable created before
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);

/* ERROR HANDLER */
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
