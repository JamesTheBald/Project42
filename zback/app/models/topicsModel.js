module.exports = (mongoose) => {
  var topicSchema = mongoose.Schema(
    {
      topic: String,
      topicLevelel: Number,
      positionX: Number,
      positionY: Number
    }
  );

  const Topic = mongoose.model("topics", topicSchema);

  return Topic;
};
