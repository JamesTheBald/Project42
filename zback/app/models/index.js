const dbConfig = require("../config/db.config.js");   // J: Sets the URL for the database

const mongoose = require("mongoose");     // J: mongoose is defined in tutorial.model.js
mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  tutorials: require("./tutorial.model.js")(mongoose)
};

module.exports = db;
