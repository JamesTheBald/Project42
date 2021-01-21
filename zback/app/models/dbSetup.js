const dbConfig = require("../config/dbUrl.js");   // J: Sets the URL for the database
const mongoose = require("mongoose");                 // J: imports the standard Mongoose module (defined in package-lock.json)

mongoose.Promise = global.Promise;   // J: This is legacy code from older examples that isn't needed with Mongoose 5. (1st google hit)

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  postings: require("./mongooseModel.js")(mongoose)   // This sets the value of db.postings to be the function defined in
                                                       // mongooseModel.js, to which it passes the standard Mongoose package 
};

module.exports = db;
