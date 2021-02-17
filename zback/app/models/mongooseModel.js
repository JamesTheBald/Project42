
module.exports = (mongoose) => {
  var postingSchema = mongoose.Schema(
    {
      title: String,
      contributors: String,
      content: String,
      tags: String,
      contentType: String,
      spiciness: String,
      upvotes: Number,
      purpose: String,
      positionX: Number,
      positionY: Number
    },
    { timestamps: true }
  );

  const Posting = mongoose.model("postings", postingSchema);    // "postings" is the name of the collection in our database

  return Posting;
};

// module.exports = (mongoose) => {
//   var topicSchema = mongoose.Schema(
//     {
//       topic: String,
//       subTopic: String,
//     }
//   );

//   const Topic = mongoose.model("topics", topicSchema);

//   return Topic;
// };
