
module.exports = (mongoose) => {
  var postingSchema = mongoose.Schema(
    {
      title: String,
      authors: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  const Posting = mongoose.model("postings", postingSchema);    // "postings" is the name of the collection in our database

  return Posting;
};
