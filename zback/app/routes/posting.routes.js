module.exports = app => {
  const postings = require("../controllers/posting.controller.js");     // J:get all the exports functions from this file

  var router = require("express").Router();

  // Create a new Posting
  router.post("/", postings.create);

  // Retrieve all Postings
  router.get("/", postings.findAll);

  // Retrieve all published Postings
  router.get("/published", postings.findAllPublished);

  // Retrieve a single Posting with id
  router.get("/:id", postings.findOne);

  // Update a Posting with id
  router.put("/:id", postings.update);

  // Delete a Posting with id
  router.delete("/:id", postings.delete);

  // Create a new Posting
  router.delete("/", postings.deleteAll);

  app.use("/api/postings", router);   // J: This adds /api/postings to all of the URL paths above
};
