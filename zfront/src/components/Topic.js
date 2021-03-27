import React from "react";

const Topic = (props) => {
  const topic = props.topic;
  const topicTitle = topic.topic || "Click to Edit";
  
  let topicClassName = "";

  if (topic?.topicLevel) {
    topicClassName =
      topic.topicLevel === "Main Topic"
        ? "text-7xl px-6 rounded-xl"
        : topic.topicLevel === "Sub-Topic"
        ? "text-3xl px-4 py-1 rounded-lg"
        : "text-sm px-2 py-1 rounded-md";
  }

  return (
    <div className="visible">
      <div>
        <div className={`bg-gray-800 absolute top-0 left-0 w-full h-full opacity-60 ${topicClassName}`} />
        <div className={`text-yellow-300 relative ${topicClassName}`}>{topicTitle}</div>
      </div>
    </div>
  );
};

export default Topic;
