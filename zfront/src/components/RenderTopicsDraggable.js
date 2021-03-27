import React from "react";
import Draggable from "react-draggable";
import updateTopicOnDB from "../functions/updateTopicOnDB";
import Topic from "./Topic";


const RenderTopicsDraggable = (props) => {
  let topicsDataArray = props.topicsDataArray;
  const recdLog = props.posnLog;

  const handleOnStop = (topic, index) => (event, data) => {
    event.stopPropagation();
    console.log("RenderTopicsDraggable.js handleOnStop  x=", data.x, " y=", data.y);

    // Update positionX&Y
    topic.positionX = data.x;
    topic.positionY = data.y;
    updateTopicOnDB(topic, index);
  };

  
  recdLog && console.log("RenderTopicsDraggable.js before .map  topicsDataArray=", topicsDataArray);

  if (topicsDataArray?.[0]?._id) {
    return (
      <>
        {topicsDataArray.map((topic, index) => {
          // recdLog && console.log("RenderTopicsDraggable.js starting .map: topic=",topic, " and index=",index);
          // posnLog && console.log("RenderTopicsDraggable X=", topic.positionX, ", Y=", topic.positionY);
          return (
            <div key={index} className="absolute invisible">
              {/* Absolute positioning of above div is necessary for topics below to position properly */}
              <Draggable
                onStop={handleOnStop(topic, index)}
                defaultPosition={{ x: topic.positionX, y: topic.positionY }}
              >
                <div className="flex flex-col items-center relative visible">  {/* Need div here for Draggable */}
                  <Topic topic={topic} />
                </div>

              </Draggable>
            </div>
          );
        })}
      </>
    );
  } else {
    return <div> No topics visible </div>;
  }
};

export default RenderTopicsDraggable;
