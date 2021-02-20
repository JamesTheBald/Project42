import React, { useState } from "react";
import Draggable from "react-draggable";
import PopupContent from "./PopupContent";
import VoteCounter from "./VoteCounter";
import updatePostOnDB from "../functions/updatePostOnDB";
import RenderSpiciness from "./RenderSpiciness";
import lockPost from "../functions/lockPost";
import LockedWarningModal from "./LockedWarningModal";
import { AiOutlineCaretDown } from "react-icons/ai";


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

  const [showLockedWarningModal, setShowLockedWarningModal] = useState(false);

  let posnX = [];
  let posnY = [];
  stubDragged.current = false;

  //Open MainModal when stub is clicked without dragging
  const handleOnStop = (post, index) => (event, data) => {
    // Above line uses 'currying'. See https://www.carlrippon.com/using-currying-to-pass-additional-data-to-react-event-handlers/
    event.stopPropagation(); //J: I think this is important... don't want bubbling?
    console.log("RenderStubsDraggable.js handleOnStop  x=", data.x, " y=", data.y);
    posnLog && console.log("RenderStubsDraggable.js posnX[", index, "] = ", posnX[index], ", posnY[", index, "] = ", posnY[index]);

    if (post.locked) {
      console.log("RenderStubsDraggble.js handleOnStop - post is locked");
      setShowLockedWarningModal(true);

    } else if (data.x === posnX[index] && data.y === posnY[index] && !post.locked) {
      console.log("RenderStubsDraggable.js handleOnStop: You just clicked (without dragging) - Opening MainModal");
      setCreatingPostFlag(false);
      setCurrPostIndex(index);
      setPostDraft(post);
      lockPost(post, index); // writes lock to DB but doesn't update state vars (postDraft, postingsDataArray)
      setShowMainModal(true);
    } else {
      // if dragged, update positionX&Y in post and on the database
      console.log("RenderStubsNonDraggble.js handleOnStop - post was dragged or is locked")  // ADD A WARNING POPUP
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
                allowAnyClick={true}
                defaultPosition={{ x: posnX[index], y: posnY[index] }}
                >
                <div className="text-xs flex flex-col items-center absolute text-gray-800
                  border border-blue-200 border-dashed borderOpacity-0 hover:borderOpacity-60">
                              {/* absolute positioning in above line is required */}
                  <div className="flex flex-col items-center" style={{transform: `scale(${stubScale})`}}>

                    {/* Tooltip divs - content and formatting must match RenderStubsNonDraggable's! */}
                    <div className={"invisible w-96 p-2  bg-gray-200 rounded-lg  opacity-90 z-10"}>
                      <PopupContent post={post} postDraft={postDraft} setPostDraft={setPostDraft} />
                    </div>
                    <div className={`invisible opacity-90`} style={{ transform: "translateY(-8px)"}}>
                      <AiOutlineCaretDown className="text-3xl  text-gray-200"/>
                    </div>

                    {/* Stub */}
                    <div
                      className="flex w-56 mb-2 border border-gray-900 rounded-lg bg-gray-200 z-10"
                      // onClick={handleOnClick(post, index)}
                    >
                      <div
                        name="title-contributor-container"
                        className="flex flex-col justfy-between relative items-start w-3/4 p-2 border-r border-gray-900">
                        {post.title ? (
                          <div>
                            <div className="max-h-6 leading-3 overflow-hidden">
                              <p className="text-xs font-500">{post.title}</p>
                            </div>
                            {post.title.length > 60 ? (
                              <div
                                name="fade-out-title-container"
                                className="mt-2 absolute top-3 right-0 w-full h-3 bg-gradient-to-l from-gray-200">
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : (
                          <div> Click to edit </div>
                        )}
                        <div>
                          <div className="m-2 text-gray-500 text-xs absolute bottom-0 left-0 truncate w-4/5">
                            {post.contributors}
                          </div>
                        </div>
                      </div>

                      <div
                        name="stub-attribute-container"
                        className="flex flex-col justify-between items-center w-1/4 p-2 rounded-r-lg">
                        <div className="text-gray-500 text-xs"> {post.contentType} </div>

                        <div className="my-1.5">
                          <RenderSpiciness spiciness={post.spiciness} />
                        </div>

                        <VoteCounter
                          postingsDataArray={postingsDataArray}
                          userVoted={userVoted}
                          setUserVoted={setUserVoted}
                          postDraft={postDraft}
                          setPostDraft={setPostDraft}
                          index={index}
                        />
                      </div>
                    </div>

                  </div>

                </div>
              </Draggable>

              <LockedWarningModal
                showLockedWarningModal={showLockedWarningModal}
                setShowLockedWarningModal={setShowLockedWarningModal}
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
