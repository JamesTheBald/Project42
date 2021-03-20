import React from "react";
import Topic from "./Topic";

const RenderTopicsNonDraggable = (props) => {

  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex = props.setCurrTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const setTopicDraft = props.setTopicDraft;
  const setCreatingTopicFlag = props.setCreatingTopicFlag;
  const posnLog = props.posnLog;
  const recdLog = props.posnLog;

  recdLog && console.log("RenderTopicsNonDraggable.js begins. topicsDataArray=", topicsDataArray);

  const prepAndOpenTopicModal = (topic, index) => {
    setCreatingTopicFlag(false);
    setCurrTopicIndex(index);
    setTopicDraft(topic);
    setShowTopicModal(true);
  }


  if (topicsDataArray?.[0]?._id) {
    return (
      <>
        {topicsDataArray.map((topic, index) => {
          // console.log("RenderTopicsNonDraggable .map: index=", index, " and topic=", topic);
          posnLog && console.log('RenderTopicsNonDraggable topic.positionX=',topic.positionX,', topic.positionY=',topic.positionY)

          return (
            <div
              key={index}
              className="flex flex-col items-center absolute text-gray-800"
              style={{ top: topic.positionY, left: topic.positionX }}
            >
              
              <Topic topic={topic} index={index} prepAndOpenTopicModal={prepAndOpenTopicModal} />
              
            </div>
          );
        })}
      </>
    );
  } else {
    return <div> No topics visible </div>;
  }
};

export default RenderTopicsNonDraggable;
