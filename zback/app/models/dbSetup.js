const dbConfig = require("../config/dbUrl.js");   // J: Sets the URL for the database
const mongoose = require("mongoose");                 // J: imports the standard Mongoose module (defined in package-lock.json)

mongoose.Promise = global.Promise;        // J: ??

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  tutorials: require("./mongooseModel.js")(mongoose)   // This sets the value of db.tutorials to be the function defined in
                                                       // mongooseModel.js, to which it passes the standard Mongoose package 
};

module.exports = db;
