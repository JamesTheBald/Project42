import React from "react";
import Draggable from "react-draggable";
import updateTopicOnDB from "../functions/updateTopicOnDB";

const RenderTopicsDraggable = (props) => {

  let topicsDataArray = props.topicsDataArray
  const setCurrTopicIndex = props.setCurrTopicIndex
  const setShowTopicModal = props.setShowTopicModal
  const setTopicDraft = props.setTopicDraft
  const setCreatingTopicFlag = props.setCreatingTopicFlag
  let topicDragged = props.topicDragged

  let oldX = [];
  let oldY = [];
  topicDragged.current = false;

  
  //Open TopicModal when topic stub is clicked without dragging
  const handleOnStop = (topic, index) => (event, data) => {     // uses 'currying'

    event.stopPropagation(); 
    console.log("RenderTopicsDraggable.js handleOnStop  x=", data.x, " y=", data.y);
    console.log("RenderTopicsDraggable.js oldX[",index,"] = ", oldX[index],", oldY[",index,"] = ",oldY[index]);

    if (data.x === oldX[index] && data.y === oldY[index]) {
      console.log("RenderTopicsDraggable.js handleOnStop: You just clicked (without dragging) - Opening TopicModal");
      setCreatingTopicFlag(false);
      setCurrTopicIndex(index);
      setTopicDraft(topic);
      setShowTopicModal(true);
    } else {    // if dragged, update positionX&Y in topic and on the database
      topic.positionX = data.x;
      topic.positionY = data.y;
      updateTopicOnDB(topic, index);
    }
    oldX[index] = data.x;
    oldY[index] = data.y;
    topicDragged.current = true;
  };


  console.log("RenderTopicsDraggable.js before .map  topicsDataArray=", topicsDataArray);

  if (topicsDataArray?.[0]?._id) {
    return (
      <>
        {topicsDataArray.map((topic, index) => {
          // console.log("RenderTopicsDraggable.js starting .map: topic=",topic, " and index=",index);
          oldX[index] = topic.positionX;
          oldY[index] = topic.positionY;

          return (
            <div key={index}>
              <Draggable onStop={handleOnStop(topic, index)} allowAnyClick={true} defaultPosition={{x: oldX[index], y: oldY[index]}}>

                <div className="w-100 h-24 bg-yellow-200 rounded-lg">
                  {topic.topic ? <div className="text-4xl z-10">{topic.topic}</div> : <div> Click to edit </div>}
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