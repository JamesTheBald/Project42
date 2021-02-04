const db = require("../models/dbSetup.js");   //db is the object with all the mongoose settings for the database
const mongooseModel = db.postings;           //J: dbModel was called Posting. I changed it to be clearer and less specific to postings


// Create and Save a new Posting
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.title) { 
  //     res.status(400).send({ message: "Validation Error - Title Cannot Be Empty" });
  //   return;
  // }

  // Create a Posting
  const posting = new mongooseModel({
    title: req.body.title,
    contributors: req.body.contributors,
    description: req.body.description,
    tags: req.body.tags,
    contentType: req.body.contentType,
    spiciness: req.body.spicness,
    upvotes: req.body.upvotes,
  });

  // Save Posting to the database
  posting
    .save(posting)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("postingController.js .create err=",err)
      res.status(500).send({
        message:
          err.message || "Drat - An error occurred creating the posting."
      });
    });
};


// Retrieve all Postings from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};     // J: What does this line do?

  mongooseModel.find(condition)
    .then(data => {
      console.log ("data=",data)
      res.send(data);
    })
    .catch(err => {
      console.log("postingController.js .findAll .find err=",err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving postings."
      });
    });
};


// Find a single Posting with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  mongooseModel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Posting with ID " + id });
      else res.send(data);
    })
    .catch(err => {
      console.log("postingController.js .findOne err=",err)
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

  mongooseModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Posting with id=${id}. Maybe Posting was not found!`
        });
      } else res.send({ message: "Posting was updated successfully." });
    })
    .catch(err => {
      console.log("postingController.js .update err=",err)
      res.status(500).send({
        message: "Error updating Posting with id=" + id
      });
    });
};


// Delete a Posting with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  mongooseModel.findByIdAndRemove(id, { useFindAndModify: false })
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
      console.log("postingController.js .delete err=",err)
      res.status(500).send({
        message: "Could not delete Posting with ID=" + id
      });
    });
};


// Delete all Postings from the database.
exports.deleteAll = (req, res) => {
  mongooseModel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Postings were deleted successfully!`
      });
    })
    .catch(err => {
      console.log("postingController.js .deleteAll err=",err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all postings."
      });
    });
};


// // Find all published Postings
// exports.findAllPublished = (req, res) => {
//   mongooseModel.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving postings."
//       });
//     });
// };
