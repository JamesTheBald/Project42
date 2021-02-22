module.exports = (mongoose) => {
  var topicSchema = mongoose.Schema(
    {
      topic: String,
      topicLevel: String,
      positionX: Number,
      positionY: Number,
      locked: Boolean,
      archived: Boolean
    }
  );

  const Topic = mongoose.model("topics", topicSchema);

  return Topic;
};
