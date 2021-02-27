import React from 'react'

const TopicFormat = (props) => {

  const topic = props.topic;
  console.log("TopicFormat.js topic=", topic);

  const topicTitle = topic.topic || "Click to Edit"
  console.log("TopicFormat.js topicLevel=", topic.topicLevel);

  let topicClassName = "";

  if (topic?.topicLevel) {
    
    topicClassName = (topic.topicLevel === "Main Topic") ?
        "text-7xl px-6  rounded-xl"
      : (topic.topicLevel === "Sub-Topic") ?
        "text-3xl px-4 py-1 rounded-lg"
      :
        "text-md px-2 py-1 rounded-md"

    console.log("TopicFormat.js topicClassName=", topicClassName);
  }


  return (
      // <div className="">
        <div className={`text-yellow-400 bg-gray-800 opacity-80 ${topicClassName}`}>
          {topicTitle}
        </div> 
      // </div>
  )
}

export default TopicFormat;
