import React, { useState } from "react";
import Draggable from "react-draggable";
import updateTopicOnDB from "../functions/updateTopicOnDB";
import Topic from "./Topic";


const RenderTopicsDraggable = (props) => {
  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex = props.setCurrTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const setTopicDraft = props.setTopicDraft;
  const setCreatingTopicFlag = props.setCreatingTopicFlag;
  let topicDragged = props.topicDragged;
  const posnLog = props.posnLog;
  const evntLog = props.evntLog;

  const [undraggable, setUndraggable] = useState(true);

  let posnX = [];
  let posnY = [];
  topicDragged.current = false;

  const prepAndOpenTopicModal = (topic, index) => {
    setCreatingTopicFlag(false);
    setCurrTopicIndex(index);
    setTopicDraft(topic);
    setShowTopicModal(true);
  }

  //Open TopicModal when topic stub is clicked without dragging (and isn't locked). Next line uses 'currying'.
  const handleOnStop = (topic, index) => (event, data) => {
    event.stopPropagation();
    console.log("RenderTopicsDraggable.js handleOnStop  x=", data.x, " y=", data.y);

    if (data.x === posnX[index] && data.y === posnY[index] && !topic.locked) {
      console.log("RenderTopicsDraggable.js handleOnStop: You just clicked (without dragging) - Opening TopicModal");
      prepAndOpenTopicModal(topic, index);
    } else {
      // if dragged, update positionX&Y in topic and on the database
      console.log("RenderTopicsNonDraggble.js handleOnStop - topic was dragged or is locked"); // ADD A WARNING POPUP
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
                disabled={undraggable}
              >
                <div className="flex flex-col items-center relative">
                  {" "}
                  {/* This needs to be a div for Draggable to work */}
                  <Topic topic={topic} />
                  {/*  Dragging Selection Overlay: an invisible area over the stub, to limit region of stub dragging selectibility */}
                  <span
                    className="w-full h-1/2 z-50"
                    style={{ position: "absolute", top: "0%", left: "50%", transform: "translateX(-50%)" }}
                    onMouseEnter={() => {
                      setUndraggable(false);
                      evntLog && console.log("Moused over Dragging Selection Overlay. undraggable=false");
                    }}
                    onMouseMove={() => {
                      setUndraggable(false);
                      evntLog && console.log("Mouse moved over Dragging Selection Overlay. undraggable=false");
                    }}
                    onMouseLeave={() => {
                      setUndraggable(true);
                      evntLog && console.log("Mouse Left Dragging Selection Overlay. undraggable=true");
                    }}
                  />
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
