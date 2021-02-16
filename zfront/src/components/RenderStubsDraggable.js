import React, { useRef } from "react";
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
  let oldPosition = useRef({ x: 0, y: 0 });

  let defaultPosn = {};
  stubDragged.current = false;

  
  const handleOnStop = (post, index) => (event, data) => {
    // Currying! Spicy!
    // https://www.carlrippon.com/using-currying-to-pass-additional-data-to-react-event-handlers/
    // console.log("post=",post);  console.log("index=",index);  console.log("event=",event);  console.log("data=",data);
    event.stopPropagation(); //J: I think this is important... don't want bubbling?
    console.log("RenderStubsDraggable.js handleOnStop  x=", data.x, " y=", data.y);
    console.log("RenderStubsDraggable.js old-x = ", oldPosition.current.x,"old-y = ",oldPosition.current.y);

    if (data.x === oldPosition.current.x && data.y === oldPosition.current.y) {
      console.log("RenderStubsDraggable.js handleOnStop You just clicked! Opening MainModal");
      setCreatingPostFlag(false);
      setCurrPostIndex(index);
      setPostDraft(post);
      setShowMainModal(true);
    } else {
      post.positionX = data.x;
      post.positionY = data.y;
      updatePositionOnDB(post, index);
      defaultPosn = { x: post.positionX, y: post.positionY };
    }
    oldPosition.current = { x: data.x, y: data.y };
    stubDragged.current = true;
  };



  console.log("RenderStubsDraggable.js before .map  postingsDataArray=", postingsDataArray);

  if (postingsDataArray && postingsDataArray[0]._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          // console.log("RenderStubsDraggable .map: index=", index, " and post=", post);

          defaultPosn = { x: post.positionX, y: post.positionY };
          // console.log("RenderStub.js .map loop  index=", index, "defaultPosn=", defaultPosn)

          return (
            <div key={index}>
              <Draggable onStop={handleOnStop(post, index)} allowAnyClick={true} defaultPosition={defaultPosn}>

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