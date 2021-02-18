import React from "react";

const RenderTopicsNonDraggable = (props) => {
  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex = props.setCurrTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const setTopicDraft = props.setTopicDraft;
  const setCreatingTopicFlag = props.setCreatingTopicFlag;

  if (topicsDataArray?.[0]?._id) {
    return (
      <>
        {topicsDataArray.map((topic, index) => {
          // console.log("RenderTopicsNonDraggable .map: index=", index, " and topic=", topic);

          return (
            <div
              key={index}
              className="flex flex-col items-center absolute text-gray-800"
              style={{ top: topic.positionY, left: topic.positionX }} // , zIndex: -1
            >
              {/* Topic Stub */}
              <div
                className="z-10"
                onClick={() => {
                  setCreatingTopicFlag(false);
                  setCurrTopicIndex(index);
                  setTopicDraft(topic);
                  setShowTopicModal(true);
                }}>

                <div className="w-100 h-24 bg-yellow-200 rounded-lg">
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
