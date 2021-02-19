import React from "react";
import lockTopic from "../functions/lockTopic";


  const RenderTopicsNonDraggable = (props) => {
  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex = props.setCurrTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const setTopicDraft = props.setTopicDraft;
  const setCreatingTopicFlag = props.setCreatingTopicFlag;
  // const zoomedOrPanned = props.zoomedOrPanned
  const posnLog = props.posnLog
  const recdLog = props.recdLog

  // console.log("RenderTopicsNonDraggable.js begins. topicsDataArray=", topicsDataArray);

  const handleOnClick = (topic, index) => (evnt) => {
    evnt.stopPropagation();
    
    recdLog && console.log("RenderTopicsNonDraggble.js handleOnClick topic=", topic);
    if (!topic.locked) {
      setCreatingTopicFlag(false);
      setCurrTopicIndex(index);
      setTopicDraft(topic);
      lockTopic(topic, index);  // writes lock to DB but does NOT update state vars topicDraft, topicsDataArray
      setShowTopicModal(true);
    } else {
      console.log("RenderTopicsNonDraggble.js handleOnClick - topic is locked")  // ADD A WARNING POPUP
    }
  };


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
              style={{ top: topic.positionY, left: topic.positionX }} // , zIndex: -1
            >
              {/* Topic Stub */}
              <div onClick={handleOnClick(topic, index)}>
  

                <div className="bg-yellow-200 rounded-lg">
                  {topic.topic ? <div className="text-4xl z-10">{topic.topic}</div> : <div> Click to edit </div>}
                </div>

              </div>
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
