import React from "react";

const RenderTopicsNonDraggable = (props) => {

  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex = props.setCurrTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const setTopicDraft = props.setTopicDraft;
  const setCreatingTopicFlag = props.setCreatingTopicFlag;
  const posnLog = props.posnLog;
  const recdLog = props.posnLog;

  recdLog && console.log("RenderTopicsNonDraggable.js begins. topicsDataArray=", topicsDataArray);

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
              <div
                // className="z-10"
                onClick={() => {
                  setCreatingTopicFlag(false);
                  setCurrTopicIndex(index);
                  setTopicDraft(topic);
                  setShowTopicModal(true);
                }}>

                {/* Be sure to use the same formatting on RenderTopicsDraggable.js  */}
                {/* (This is WET but React-Draggable doesn't seem to work on sub-components.)  */}
                <div className="text-blue-400 px-3 py-1 bg-gray-800 opacity-90  rounded-xl z-10">
                  {(topic.topicLevel === "Main Topic") ?
                    topic.topic ? <div className="text-9xl">{topic.topic}</div> : <div> Click to edit </div>

                  : (topic.topicLevel === "Sub-Topic") ?
                    topic.topic ? <div className="text-5xl">{topic.topic}</div> : <div> Click to edit </div>

                  : 
                    topic.topic ? <div className="text-md">{topic.topic}</div> : <div> Click to edit </div>
                  }
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
