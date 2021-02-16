import React from "react";    // , { useRef }
import Draggable from "react-draggable";
import PopupContent from "./PopupContent";
import VoteCounter from "./VoteCounter";
import updatePositionOnDB from "../functions/updatePositionOnDB";
import RenderSpiciness from "./RenderSpiciness";

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
 
  let oldX = [];
  let oldY = [];
  stubDragged.current = false;

  
  //Open MainModal when stub is clicked without dragging
  const handleOnStop = (post, index) => (event, data) => {
    // Above line uses 'currying'. See https://www.carlrippon.com/using-currying-to-pass-additional-data-to-react-event-handlers/
    event.stopPropagation(); //J: I think this is important... don't want bubbling?
    console.log("RenderStubsDraggable.js handleOnStop  x=", data.x, " y=", data.y);
    console.log("RenderStubsDraggable.js oldX[",index,"] = ", oldX[index],", oldY[",index,"] = ",oldY[index]);

    if (data.x === oldX[index] && data.y === oldY[index]) {
      console.log("RenderStubsDraggable.js handleOnStop: You just clicked (without dragging) - Opening MainModal");
      setCreatingPostFlag(false);
      setCurrPostIndex(index);
      setPostDraft(post);
      setShowMainModal(true);
    } else {    // if dragged, update positionX&Y in post and on the database
      post.positionX = data.x;
      post.positionY = data.y;
      updatePositionOnDB(post, index);
    }
    oldX[index] = data.x;
    oldY[index] = data.y;

    stubDragged.current = true;
  };


  console.log("RenderStubsDraggable.js before .map  postingsDataArray=", postingsDataArray);

  if (postingsDataArray && postingsDataArray[0]._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          // console.log("RenderStubsDraggable.js starting .map: post=",post, " and index=",index);
          oldX[index] = post.positionX;
          oldY[index] = post.positionY;

          return (
            <div key={index}>
              <Draggable onStop={handleOnStop(post, index)} allowAnyClick={true} defaultPosition={{x: oldX[index], y: oldY[index]}}>

                <div className="flex flex-col items-center absolute text-gray-800">

                  {/* Tooltip divs - content and formatting must match RenderStubsNonDraggable's! */}
                  <div className={"invisible w-80 p-2  bg-gray-200 border border-gray-600 rounded-lg z-10"}>
                    <PopupContent post={post} />
                  </div>
                  <div className={"invisible"}>Down Arrow Here</div>
                  {/* J: I'm thinking React Icon "IoMdArrowDropdown" */}

                  {/* Stub */}
                  <div
                    className="flex w-56 mt-4 mb-2 border border-gray-900 rounded-lg bg-gray-200 z-10"
                  >

                    <div
                      name="title-contributor-container"
                      className="flex flex-col justfy-around items-start w-3/4 p-2 border-r border-gray-900"
                    >
                      {post.title ? <div className="text-xs">{post.title}</div> : <div> Click to edit </div>}
                      <div className="mt-2 text-gray-500 text-xs">{post.contributors}</div>
                    </div>

                    <div
                      name="stub-attribute-container"
                      className="flex flex-col justify-between items-center w-1/4 p-2 rounded-r-lg"
                    >
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
              </Draggable>
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