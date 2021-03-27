import React, { useState } from "react";
import Draggable from "react-draggable";
import updatePostOnDB from "../functions/updatePostOnDB";
import WarningModalLocked from "./WarningModalLocked";
import Stub from "./Stub";

const RenderStubsDraggable = (props) => {
  let postingsDataArray = props.postingsDataArray;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  const stubScale = props.stubScale;
  const recdLog = props.recdLog;

  const [showWarningModalLocked, setShowWarningModalLocked] = useState(false);

  const millisecondsSinceUpdated = (postDraft) => {
    const then = Date.parse(postDraft.updatedAt);
    const now = Date.now();
    console.log("This post was edited at ", then);
    console.log("Current time is ", now);
    console.log("Difference is ", now - then);
    return now - then;
  };


  const handleOnStop = (post, i) => (event, data) => {
    // 'Currying'- see https://www.carlrippon.com/using-currying-to-pass-additional-data-to-react-event-handlers/
    console.log("RenderStubsDraggable.js handleOnStop  x=", data.x, " y=", data.y);

    if (post.locked && millisecondsSinceUpdated(post) < 3600000) {
      console.log("RenderStubsDraggble.js handleOnStop - post is locked, for less than an hour");
      setShowWarningModalLocked(true);

    } else {
      // Update positionX&Y
      post.positionX = data.x;
      post.positionY = data.y;
      updatePostOnDB(post, i);
    }
  };

  recdLog && console.log("RenderStubsDraggable.js before .map  postingsDataArray=", postingsDataArray);

  if (postingsDataArray?.[0]?._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          recdLog && console.log("RenderStubsDraggable.js starting .map: post=", post, " and index=", index);

          return (
            <div key={index}>
              <Draggable
                onStop={handleOnStop(post, index)}
                defaultPosition={{ x: post.positionX, y: post.positionY }}
                // bounds='parent'  parent does not work - sets y to zero
              >
                <div className="stubWrapper absolute invisible"
                  // Invisible utility is used so that the unscaled container div doesn't appear.
                  // Absolute positioning is required here. Scaling must be in line below.
                >
                  <div className="flex flex-col items-center relative visible" style={{ transform: `scale(${stubScale})` }}>
                    <Stub
                      post={post}
                      index={index}
                      postingsDataArray={postingsDataArray}
                      postDraft={postDraft}
                      setPostDraft={setPostDraft}
                      userVoted={userVoted}
                      setUserVoted={setUserVoted}
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
