const db = require("../models/dbSetup.js");   //db is the object with all the mongoose settings for the database
const postingsModel = db.postings; 


// Create and Save a new Posting
exports.create = (req, res) => {

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
    locked: req.body.locked,
    archived: req.body.archived
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

  console.log("postingsController.js findAll req.query=",req.query)
  console.log("postingsController.js findAll title=",title)

  let condition = { archived: false };
  console.log("postingsController.js findAll condition=",condition)

  if (title) {
    condition = title ? { archived: false, title: { $regex: new RegExp(title), $options: "i" } } : {};   // $options: "i" means case insensitive
  } else if (tags) {
    condition = tags ? {archived: false, tags: { $regex: new RegExp(tags), $options: "i" } } : {}; 
  } else if (name) {
    condition = name ? {archived: false, contributors: { $regex: new RegExp(name), $options: "i" } } : {};
  }

  console.log("postingsController.js with search terms, findAll condition=",condition)

  postingsModel.find(condition)
    .then(data => {
      console.log ("postingsController.sj retrived ",data.length," postings")
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
      console.log("Update post received. id=", id, " and req.body=", req.body)
      console.log("Update post received. data=", data)

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


// Unarchive all Postings 
exports.unarchiveAll = (req, res) => {
  postingsModel.updateMany({}, {$set: {archived: false}} )
  .then(data => {
    res.send({
      message: `${data.matchedCount} postings were deleted successfully!`
    });
  })
  .catch(err => {
    console.log("postingsController.js .deleteAll err=",err)
    res.status(500).send({
      message:
        err.message || "Alas, an error occurred while unarchiving all postings."
    });
  });
}


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



const upload = require("../middleware/uploadMiddleware");

exports.uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    return res.send(`Files have been uploaded.`);

  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

