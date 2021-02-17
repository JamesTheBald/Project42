// const db = require("../models/dbSetup.js");   //db is the object with all the mongoose settings for the database
// const topicsModel = db.postings;           //J: dbModel was called Posting. I changed it to be clearer and less specific to postings

// // Create and Save a Topic and/ or Sub-Topic
// exports.create = (req, res) => {
//     const topic = new topicsModel({
//     topic: req.body.topic,
//     subTopic: req.body.subTopic,
//   });

//   // Save Topic to the database
//   topic
//     .save(topic)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       console.log("topicsController.js .create err=",err)
//       res.status(500).send({
//         message:
//           err.message || "An error occurred during topic creation."
//       });
//     });
// };
// // Retrieve all topics from the database.
// exports.findAll = (req, res) => {
//   const topic = req.query.topic;
//   const subTopic = req.query.subTopic;
 

//   let condition = {};

//   if (topic) {
//     condition = topic ? { topic: { $regex: new RegExp(topic), $options: "i" } } : {};
//   } else if (subTopic) {
//     condition = subTopic ? {subTopic: { $regex: new RegExp(subTopic), $options: "i" } } : {}; 
//   }

//   console.log("topicsController.js findAll req.query=",req.query)
//   console.log("topicsController.js findAll condition=",condition)

//   topicsModel.find(condition)
//     .then(data => {
//       console.log ("data=",data)
//       res.send(data);
//     })
//     .catch(err => {
//       console.log("topicsController.js .findAll .find err=",err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving postings."
//       });
//     });
// };


// // Find a single topic with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   topicsModel.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Posting with ID " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       console.log("topicsController.js .findOne err=",err)
//       res
//         .status(500)
//         .send({ message: "Error retrieving topic with ID=" + id });
//     });
// };


// // Update a topic by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update cannot be empty!"
//     });
//   }

//   const id = req.params.id;

//   topicsModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update topic with id=${id}. Maybe topic was not found!`
//         });
//       } else res.send({ message: "topic was updated successfully." });
//     })
//     .catch(err => {
//       console.log("topicsController.js .update err=",err)
//       res.status(500).send({
//         message: "Error updating posting with id=" + id
//       });
//     });
// };


// // Delete a Posting with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   topicsModel.findByIdAndRemove(id, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete topic with ID=${id}. Maybe topic was not found!`
//         });
//       } else {
//         res.send({
//           message: "topic was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       console.log("topicsController.js .delete err=",err)
//       res.status(500).send({
//         message: "Could not delete topic with ID=" + id
//       });
//     });
// };


// // Delete all topics from the database.
// exports.deleteAll = (req, res) => {
//   topicsModel.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} topics were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       console.log("topicsController.js .deleteAll err=",err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all topics."
//       });
//     });
// };

