
module.exports = (mongoose) => {
  var postingSchema = mongoose.Schema(
    {
      title: String,
      contributors: String,
      description: String,
      published: Boolean,
      tags: String,
    },
    { timestamps: true }
  );

  const Posting = mongoose.model("postings", postingSchema);    // "postings" is the name of the collection in our database

  return Posting;
};
