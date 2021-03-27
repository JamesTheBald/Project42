import React, { useState } from "react";

import lockPost from "../functions/lockPost";
import WarningModalLocked from "./WarningModalLocked";
import Stub from "./Stub";


const RenderStubsNonDraggable = (props) => {
  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex = props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  const stubScale = props.stubScale;
  const recdLog = props.recdLog;
  const posnLog = props.posnLog

  const [showWarningModalLocked, setShowWarningModalLocked] = useState(false);


  recdLog && console.log("RenderStubsNonDraggable.js begins. postingsDataArray=", postingsDataArray);

  const prepAndOpenPostModal = (post, index) => {
    setCreatingPostFlag(false);
    setCurrPostIndex(index);
    setPostDraft(post);
    lockPost(post, index); // writes lock to DB but doesn't update state vars (postDraft, postingsDataArray)
    setShowMainModal(true);
  }


  const handleOnClick = (post, index) => (evnt) => {
    evnt.stopPropagation();   // J: Meant to stop 'bubbling but I'm not sure it does anything or is even needed
    console.log("RenderStubsNonDraggble.js handleOnClick post=", post);

    if (post.locked && (millisecondsSinceUpdated(post) < 3600000)) {
      console.log("RenderStubsNonDraggble.js handleOnClick - post is locked");
      setShowWarningModalLocked(true);
    } else {
      prepAndOpenPostModal(post, index);
    }
  };


  const millisecondsSinceUpdated = (postDraft) => {
    const then = Date.parse(postDraft.updatedAt);
    const now = Date.now();
    console.log("This post was edited at ", then);
    console.log("Current time is ", now);
    console.log("Difference is ", now-then);
    return now-then
  }


  if (postingsDataArray?.[0]?._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          posnLog && console.log('RenderStubsNonDraggable begins. post=',post.positionX,', post.positionY=',post.positionY)

          return (
            <div
              key={index}
              className="stubWrapper absolute invisible"
              // Invisible utility is used so that the unscaled container div doesn't appear.
              // Absolute positioning is required here. Scaling must be in line below.
              style={{  transform: `scale(${stubScale})`, top: post.positionY, left: post.positionX, }}
            >
              <div onClick={handleOnClick(post,index)}>
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

export default RenderStubsNonDraggable;
