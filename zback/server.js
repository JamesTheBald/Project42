const express = require("express");              // J: Methinks Express is basically Axios for the backend
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/dbSetup.js");
const postingRoutes = require("./app/routes/postingRoutes.js");

const PORT = process.env.PORT || 8082;

var corsOptions = {
  origin: "http://localhost:8083"               //J: Should we put the port number in a variable?
};

const exprs = express();                                // J: This runs the express function, to initialize it.
exprs.use(cors(corsOptions));
exprs.use(bodyParser.json());                           // parse requests of content-type - application/json
exprs.use(bodyParser.urlencoded({ extended: true }));   // Returns middleware that only parses urlencoded bodies ...  
                                                      // See https://github.com/expressjs/body-parser#bodyparserurlencodedoptions

//Connect to the MongoDB database using the Mongoose package & settings
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route (not actually called by the frontend)
exprs.get("/", (req, res) => {res.json({ message: "Welcome to Helpful Postings Server" })});


postingRoutes(exprs);   //J: run the postingRoutes functions (from "/routes/postingRoutes.js"), passing to them the express package


// set port, listen for requests
exprs.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
