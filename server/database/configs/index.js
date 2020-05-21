require("dotenv").config();

// import everything we set in our .env file so it's not public
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

const Sequelize = require("sequelize");

// with sequelize we connect and set our db
const connector = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

// auth to the db, can paste it to everywere
const authenticate = async (connector) => {
  try {
    await connector.authenticate();
    console.log(`Connection to db was good`);
  } catch (e) {
    console.error(`Something went wrong when connecting to db: ${e}`);
  }
};

authenticate(connector);

// we set a db object that will host the sequelize info, the connection and the model we import from our models

const db = {};

db.Sequelize = Sequelize;
db.connector = connector;
db.user = require("../models/user.model")(Sequelize, connector);

module.exports = db;
