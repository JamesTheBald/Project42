import React from "react";
import Tooltip from "./Tooltip";
import PopupContent from "./PopupContent";
import VoteCounter from "./VoteCounter";
import RenderSpiciness from "./RenderSpiciness";

const RenderStubsNonDraggable = (props) => {
  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex = props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;

  console.log("RenderStubsNonDraggable.js postingsDataArray=", postingsDataArray);

  if (postingsDataArray && postingsDataArray[0]._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          // console.log("RenderStubs .map: index=", index, " and post=", post);

          return (
            <div key={index}>
          
              <Tooltip content={PopupContent(post)} delay="200" direction="top" css="tooltipPopup rounded-lg">
                {/* css="tooltipPopup" is required. Edit background color on tooltip.css */}

                <div
                  style={{ top: post.positionY, left: post.positionX}}    // , zIndex: -1 
                  className="flex border-2 border-gray-600 rounded-lg bg-red-200 shadow-md w-64 my-2 absolute z-10"
                  onClick={ () => {
                    setCreatingPostFlag(false);
                    setCurrPostIndex(index);
                    setPostDraft(post);
                    setShowMainModal(true);
                }}>


                  <div
                    name="title-contributor-container"
                    className="w-3/4 p-2 flex flex-col justify-between border-r-2 border-gray-600"
                  >
                    {post.title ? 
                    <div className="font-medium text-sm line-clamp-2">{post.title}</div>
                    :
                    <div> Click to edit </div>
                    }
                    <div className="mt-2 text-gray-500 text-xs">{post.contributors}</div>
                  </div>



                  <div
                    name="stub-attribute-container"
                    className="w-1/4 flex flex-col items-center justify-center"
                  >
                    <div className="text-gray-500 text-xs p-2">{post.contentType}</div>

                    <RenderSpiciness spiciness={post.spiciness} />

                    <div className="p-2">
                      <VoteCounter
                        postingsDataArray = {postingsDataArray}
                        userVoted = {userVoted}
                        setUserVoted = {setUserVoted}
                        postDraft = {postDraft}
                        setPostDraft = {setPostDraft}
                        index = {index}
                      />
                    </div>
                  </div>



                </div>
              </Tooltip>
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
