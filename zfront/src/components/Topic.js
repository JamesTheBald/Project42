import React from 'react'

const Topic = (props) => {

  const topic = props.topic;
  const topicTitle = topic.topic || "Click to Edit"
  let topicClassName = "";

  if (topic?.topicLevel) {
    topicClassName = (topic.topicLevel === "Main Topic") ? "text-7xl px-6  rounded-xl"
      : (topic.topicLevel === "Sub-Topic") ? "text-3xl px-4 py-1 rounded-lg"
      : "text-md px-2 py-1 rounded-md"
  }

  return (
    <div>
      <div className={`text-yellow-300 relative z-10 ${topicClassName}`}>{topicTitle}</div>
      <div className={`bg-gray-800 relative transform -translate-y-full opacity-60 z-0 ${topicClassName}`}>
        {topicTitle}
      </div>
    </div> 
  )
}

export default Topic;
