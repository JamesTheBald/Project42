import React from "react";
import Draggable from "react-draggable";
import updateTopicOnDB from "../functions/updateTopicOnDB";
import TopicFormat from "./TopicFormat";


const RenderTopicsDraggable = (props) => {
  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex = props.setCurrTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const setTopicDraft = props.setTopicDraft;
  const setCreatingTopicFlag = props.setCreatingTopicFlag;
  let topicDragged = props.topicDragged;
  const posnLog = props.posnLog;

  let posnX = [];
  let posnY = [];
  topicDragged.current = false;

  //Open TopicModal when topic stub is clicked without dragging (and isn't locked)
  const handleOnStop = (topic, index) => (event, data) => {     // uses 'currying'
    event.stopPropagation();
    console.log("RenderTopicsDraggable.js handleOnStop  x=", data.x, " y=", data.y);

    if (data.x === posnX[index] && data.y === posnY[index] && !topic.locked) {
      console.log("RenderTopicsDraggable.js handleOnStop: You just clicked (without dragging) - Opening TopicModal");
      setCreatingTopicFlag(false);
      setCurrTopicIndex(index);
      setTopicDraft(topic);
      setShowTopicModal(true);
      
    } else {
      // if dragged, update positionX&Y in topic and on the database
      console.log("RenderTopicsNonDraggble.js handleOnStop - topic was dragged or is locked")  // ADD A WARNING POPUP
      topic.positionX = data.x;
      topic.positionY = data.y;
      updateTopicOnDB(topic, index);
    }

    posnX[index] = data.x;
    posnY[index] = data.y;
    topicDragged.current = true;
  };

  posnLog && console.log("RenderTopicsDraggable.js before .map  topicsDataArray=", topicsDataArray);

  if (topicsDataArray?.[0]?._id) {
    return (
      <>
        {topicsDataArray.map((topic, index) => {
          // console.log("RenderTopicsDraggable.js starting .map: topic=",topic, " and index=",index);
          posnX[index] = topic.positionX;
          posnY[index] = topic.positionY;

          posnLog && console.log("RenderTopicsDraggable posnX=", posnX[index], ", posnY=", posnY[index]);
          return (
            <div key={index} className="absolute">
              {/* Absolute positioning of above div is necessary for topics below to position properly */}
              <Draggable
                onStop={handleOnStop(topic, index)}
                defaultPosition={{ x: posnX[index], y: posnY[index] }}
              >

                <div>
                  <TopicFormat topic={topic} />
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
