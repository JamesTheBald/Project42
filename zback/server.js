const express = require("express");                   // J: Methinks Express is basically Axios for the backend
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/dbSetup.js");
const tutorialRoutes = require("./app/routes/tutorial.routes.js");

const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:8081"             //J: Should we put the port number in a variable?
};

const app = express();                                // J: This runs the express function, to initialize it.
app.use(cors(corsOptions));
app.use(bodyParser.json());                           // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));   // parse requests of content-type - application/x-www-form-urlencoded


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


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
  console.log('server.js app.get for "/" res.json=',res.json)
});


tutorialRoutes(app);     // runs the function at that location, and passing the function app (express).  J: ???


// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
