import React, { useState } from "react";

import PopupContent from "./PopupContent";
import VoteCounter from "./VoteCounter";
import RenderSpiciness from "./RenderSpiciness";
import lockPost from "../functions/lockPost";
import { AiOutlineCaretDown } from "react-icons/ai";
import WarningModalLocked from "./WarningModalLocked";


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

  const handleOnClick = (post, index) => (evnt) => {
    evnt.stopPropagation();

    recdLog && console.log("RenderStubsNonDraggble.js handleOnClick post=", post);
    if (!post.locked) {
      setCreatingPostFlag(false);
      setCurrPostIndex(index);
      setPostDraft(post);
      lockPost(post, index); // writes lock to DB but doesn't update state vars (postDraft, postingsDataArray)
      setShowMainModal(true);
    } else {
      console.log("RenderStubsNonDraggble.js handleOnClick - post is locked");
      setShowWarningModalLocked(true);
    }
  };

  if (postingsDataArray?.[0]?._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          recdLog && console.log("RenderStubs .map: index=", index, " and post=", post);
          posnLog && console.log('RenderStubsNonDraggable begins. post=',post.positionX,', post.positionY=',post.positionY)

          return (
            <div
              key={index}
              className="text-xs flex flex-col items-center absolute text-gray-800"
              style={{  transform: `scale(${stubScale})`, top: post.positionY, left: post.positionX, }}
            >
              {/* Stub */}
              <div
                className="tooltipBase flex w-60 bg-gray-200 border border-gray-900 rounded-lg"
                // onMouseEnter={() => showToolTip(index)}
                // onMouseLeave={() => hideToolTip(index)}
                onClick={handleOnClick(post, index)}
                // style={{  zIndex: "9999" }}
              >
                <div
                  name="title-contributor-container"
                  className="flex flex-col items-start w-3/4 p-3 relative   border-r border-gray-900"
                >
                  {post.title ? (
                    <div>
                      <div className="h-8  overflow-hidden font-500 relative">{post.title}
                      
                        {post.title.length > 60 && (
                          <div
                            name="fade-out-title-container"
                            className="w-1/2 h-4 absolute bottom-0 right-0  bg-gradient-to-l from-gray-200"
                          />
                        )}
                      </div>

                    </div>
                  ) : (
                    <div>Click to edit</div>
                  )}

                  <div className="mt-3 text-gray-600 w-full truncate overflow-hidden">
                    {post.contributors}
                  </div>
                </div>

                <div name="stub-attribute-container"
                  className="flex flex-col justify-between items-center w-3/12 p-2 rounded-r-lg"
                >
                  <div className="text-gray-600"> {post.contentType} </div>

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

                {/* Tooltip - content and formatting must match RenderStubsDraggable's! */}
                <span className="tooltipItself  flex flex-col items-center">

                  <div className={`w-96 p-2  bg-gray-200 rounded-lg  opacity-90`}>
                    <PopupContent post={post} postDraft={postDraft} setPostDraft={setPostDraft} />
                  </div>
                  <div className={`opacity-90`} style={{ transform: "translateY(-8px)" }}>
                    <AiOutlineCaretDown className="text-3xl  text-gray-200" />
                  </div>

                </span>

              </div>

              {/* this matches the 'Dragging Selection Overlay' box on RenderStubsDraggable  */}
              {/* <div className="invisible w-56 h-24 transform -translate-y-24" /> */}


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
