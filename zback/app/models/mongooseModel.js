
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Posting = mongoose.model("posting", schema, "postings");    // "posting" is the name of the collection in BeZKoder's database,
                                                                      // while "postings" is the name of the collection in our db. 
  return Posting;
};
