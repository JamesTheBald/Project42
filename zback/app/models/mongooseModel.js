
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

  const Posting = mongoose.model("posting", postingSchema, "postings");    // "posting" is the name of the collection in BeZKoder's database,
                                                                      // while "postings" is the name of the collection in our db. 
  return Posting;
};
