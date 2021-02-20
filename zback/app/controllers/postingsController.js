const db = require("../models/dbSetup.js");   //db is the object with all the mongoose settings for the database
const postingsModel = db.postings; 


// Create and Save a new Posting
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.title) { 
  //     res.status(400).send({ message: "Validation Error - Title Cannot Be Empty" });
  //   return;
  // }

  // Create a Posting
  const posting = new postingsModel({
    title: req.body.title,
    contributors: req.body.contributors,
    tags: req.body.tags,
    contentType: req.body.contentType,
    spiciness: req.body.spiciness,
    upvotes: req.body.upvotes,
    content: req.body.content,
    purpose: req.body.purpose,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    locked: req.body.locked
  });

  // Save Posting to the database
  posting
    .save(posting)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("postingsController.js .create err=",err)
      res.status(500).send({
        message:
          err.message || "Drat - An error occurred creating the posting."
      });
    });
};

// Retrieve all Postings from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const tags = req.query.tags;
  const name = req.query.name;

  let condition = {};

  if (title) {
    condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  } else if (tags) {
    condition = tags ? {tags: { $regex: new RegExp(tags), $options: "i" } } : {}; 
  } else if (name) {
    condition = name ? { contributors: { $regex: new RegExp(name), $options: "i" } } : {};
  }

  // console.log("postingsController.js findAll title=",title)
  // console.log("postingsController.js findAll tags=",tags)
  // console.log("postingsController.js findAll name=",name)
  console.log("postingsController.js findAll req.query=",req.query)
  console.log("postingsController.js findAll condition=",condition)

  postingsModel.find(condition)
    .then(data => {
      console.log ("data=",data)
      res.send(data);
    })
    .catch(err => {
      console.log("postingsController.js .findAll .find err=",err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving postings."
      });
    });
};


// Find a single Posting with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  postingsModel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Posting with ID " + id });
      else res.send(data);
    })
    .catch(err => {
      console.log("postingsController.js .findOne err=",err)
      res
        .status(500)
        .send({ message: "Error retrieving Posting with ID=" + id });
    });
};


// Update a Posting by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  postingsModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Posting with id=${id}. Maybe Posting was not found!`
        });
      } else res.send({ message: "Posting was updated successfully." });
    })
    .catch(err => {
      console.log("postingsController.js .update err=",err)
      res.status(500).send({
        message: "Error updating Posting with id=" + id
      });
    });
};


// Delete a Posting with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  postingsModel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Posting with ID=${id}. Maybe Posting was not found!`
        });
      } else {
        res.send({
          message: "Posting was deleted successfully!"
        });
      }
    })
    .catch(err => {
      console.log("postingsController.js .delete err=",err)
      res.status(500).send({
        message: "Could not delete Posting with ID=" + id
      });
    });
};


// Delete all Postings from the database.
exports.deleteAll = (req, res) => {
  postingsModel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Postings were deleted successfully!`
      });
    })
    .catch(err => {
      console.log("postingsController.js .deleteAll err=",err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all postings."
      });
    });
};

