import React, { useState } from "react";
import Draggable from "react-draggable";
import updatePostOnDB from "../functions/updatePostOnDB";
import lockPost from "../functions/lockPost";
import WarningModalLocked from "./WarningModalLocked";
import Stub from "./Stub";

const RenderStubsDraggable = (props) => {
  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex = props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  let stubDragged = props.stubDragged;
  const stubScale = props.stubScale;
  const recdLog = props.recdLog;
  const posnLog = props.posnLog;
  const evntLog = props.evntLog;

  const [showWarningModalLocked, setShowWarningModalLocked] = useState(false);
  const [undraggable, setUndraggable] = useState(true);

  let posnX = [];
  let posnY = [];
  stubDragged.current = false;

  const millisecondsSinceUpdated = (postDraft) => {
    const then = Date.parse(postDraft.updatedAt);
    const now = Date.now();
    console.log("This post was edited at ", then);
    console.log("Current time is ", now);
    console.log("Difference is ", now - then);
    return now - then;
  };

  //Open MainModal when stub is clicked without dragging
  const handleOnStop = (post, index) => (event, data) => {
    // Above line uses 'currying'. See https://www.carlrippon.com/using-currying-to-pass-additional-data-to-react-event-handlers/
    event.stopPropagation();
    console.log("RenderStubsDraggable.js handleOnStop  x=", data.x, " y=", data.y);
    posnLog &&
      console.log(
        "RenderStubsDraggable.js posnX[",
        index,
        "] = ",
        posnX[index],
        ", posnY[",
        index,
        "] = ",
        posnY[index]
      );

    if (post.locked && millisecondsSinceUpdated(post) < 3600000) {
      console.log("RenderStubsDraggble.js handleOnStop - post is locked, for less than an hour");
      setShowWarningModalLocked(true);
    } else if (data.x === posnX[index] && data.y === posnY[index]) {
      console.log("RenderStubsDraggable.js handleOnStop: You just clicked (without dragging) - Opening MainModal");
      setCreatingPostFlag(false);
      setCurrPostIndex(index);
      setPostDraft(post);
      lockPost(post, index); // writes lock to DB but doesn't update state vars (postDraft, postingsDataArray)
      setShowMainModal(true);
    } else {
      // if dragged, update positionX&Y in post and on the database
      console.log("RenderStubsNonDraggble.js handleOnStop - post was dragged"); // ADD A WARNING POPUP
      post.positionX = data.x;
      post.positionY = data.y;
      updatePostOnDB(post, index);
    }
    posnX[index] = data.x;
    posnY[index] = data.y;
    stubDragged.current = true;
  };

  recdLog && console.log("RenderStubsDraggable.js before .map  postingsDataArray=", postingsDataArray);

  if (postingsDataArray?.[0]?._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          recdLog && console.log("RenderStubsDraggable.js starting .map: post=", post, " and index=", index);
          posnX[index] = post.positionX;
          posnY[index] = post.positionY;

          return (
            <div key={index}>
              <Draggable
                onStop={handleOnStop(post, index)}
                // allowAnyClick={true}
                defaultPosition={{ x: posnX[index], y: posnY[index] }}
                disabled={undraggable}
              >
                <div className="stubWrapper">
                  {/* Above line's absolute positioning is required. Scaling must be in line below.  */}
                  <div className="flex flex-col items-center relative" style={{ transform: `scale(${stubScale})` }}>
                    <Stub
                      post={post}
                      index={index}
                      handleOnClick={handleOnStop}
                      postingsDataArray={postingsDataArray}
                      postDraft={postDraft}
                      setPostDraft={setPostDraft}
                      userVoted={userVoted}
                      setUserVoted={setUserVoted}
                    />

                    {/*  Dragging Selection Overlay: an invisible area over the stub, to limit region of stub dragging selectibility */}
                    <span
                      className="w-60 h-24 z-50"
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
                </div>
              </Draggable>

              <WarningModalLocked
                showWarningModalLocked={showWarningModalLocked}
                setShowWarningModalLocked={setShowWarningModalLocked}
              />
            </div>
          );
        })}
      </>
    );
  } else {
    return <div> No posts visible </div>;
  }
};

export default RenderStubsDraggable;
