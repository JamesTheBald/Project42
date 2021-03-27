import React from "react";
import Draggable from "react-draggable";


const RenderBackgroundDraggable = (props) => {
  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex = props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  let emptyPost = props.emptyPost;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;
  // const blurLevel = props.blurLevel;

  // const recdLog = props.recdLog;
  const posnLog = props.posnLog;
  // const evntLog = props.evntLog;

  let oldPosnX;
  let oldPosnY;


  //Open MainModal when background is clicked without dragging
  const handleOnStart = (event, data) => {   // This line uses 'currying'
    event.stopPropagation();
    console.log("RenderStubsDraggable.js handleOnStart  oldPosnX=", data.x, " oldPosnY=", data.y);

    oldPosnX = data.x;
    oldPosnY = data.y;
  };


  //Open MainModal when background is clicked without dragging
  const handleOnStop = (event, data) => {
    event.stopPropagation();
    console.log("RenderBackgroundDraggable.js handleOnStop  x=", data.x, " y=", data.y);
   
      console.log("RenderBackgroundDraggable.js handleOnStop: You just clicked (without dragging) - Creating Post");
      // posnLog &&
        console.log("RenderBackgroundDraggable.js handleOnStop  event=", event, " data=", data);
        console.log("RenderBackgroundDraggable.js handleOnStop  x=", data.x, " y=", data.y);
        posnLog &&
        console.log("RenderBackgroundDraggable.js oldPosnX=",oldPosnX,", oldPosnY=",oldPosnY);
  
    if (data.x === oldPosnX && data.y === oldPosnY) {
      console.log("RenderBackgroundDraggable.js handleOnStop: You just clicked (without dragging) - Opening MainModal");
      setCreatingPostFlag(true);

      emptyPost.positionX = data.x;
      emptyPost.positionY = data.y;
      setPostDraft(emptyPost);
  
      setCurrPostIndex(() => {
        const newCurrPostIndex = postingsDataArray.length; // No need for .length-1 cos we just added an element
        console.log("NavBar.js CreatePost: newCurrPostIndex=", newCurrPostIndex);
        return newCurrPostIndex;
      });
  
      setShowMainModal(true);
    }
    oldPosnX = data.x;
    oldPosnY = data.y;
  };


  return (
    // <>
      <div>
        <Draggable
          onStart={handleOnStart}
          onStop={handleOnStop}
          // defaultPosition={{ x: 0, y: 0 }}
          // disabled={true}
        >
          <div className="backgroundImage absolute" />
          {/* style={{ filter: `blur(${blurLevel}px)` }} */}

        </Draggable>
      </div>
    // </>
  );
};

export default RenderBackgroundDraggable;
