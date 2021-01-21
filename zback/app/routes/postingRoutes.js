module.exports = (func) => {
  const postings = require("../controllers/postingController.js");     // J: get all the controller functions

  var router = require("express").Router();   // creates an Express router middleware mini-app. See https://expressjs.com/en/guide/routing.html

  router.post("/", postings.create);          // Create a new Posting
  router.get("/", postings.findAll);          // Retrieve all Postings
  router.get("/published", postings.findAllPublished);   // Retrieve all published Postings
  router.get("/:id", postings.findOne);       // Retrieve a single Posting with id
  router.put("/:id", postings.update);        // Update a Posting with id
  router.delete("/:id", postings.delete);     // Delete a Posting with id
  router.delete("/", postings.deleteAll);     // Create a new Posting

  func.use("/api/postings", router);   //J: "Binds application-level middleware to an instance of the func object (i.e. the Express package)
                                       // Mounts to the path given. So this adds /api/postings to all of the URL paths above (sez Greg)
                                       // See https://expressjs.com/en/guide/using-middleware.html
};
