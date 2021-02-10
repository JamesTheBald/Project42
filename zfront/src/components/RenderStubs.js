import React from "react";
import Tooltip from "./Tooltip";
import PopupContent from "./PopupContent";
import Draggable from "react-draggable";
import VoteCounter from "./VoteCounter";

const RenderStubs = (props) => {

  let postingsDataArray = props.postingsDataArray;
  // let currPostIndex = props.currPostIndex;
  const setCurrPostIndex= props.setCurrPostIndex;
  // let showMainModal = props.showMainModal;
  const setShowMainModal = props.setShowMainModal;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;
  let userVoted = props.userVoted;
  const setUserVoted = props.userVoted;


  console.log("RenderStubs.js postingsDataArray=", postingsDataArray);

  if (postingsDataArray?.length>0) {
    
    return (
      <>
        {postingsDataArray.map((post, index) => {
          // console.log("RenderStubs .map: indx=", indx, " and pst=", pst);

          return (
            <div key={index} className="w-64 my-2">
              <Tooltip content={PopupContent(post)} delay="200" direction="top" css="tooltipPopup rounded-lg"> 
                   {/* css="tooltipPopup" is required. Edit background color on tooltip.css */}
                <Draggable>
                  <div
                    className="border p-2 border-gray-800 rounded-lg"
                    onDoubleClick={() => {
                      setCreatingPostFlag(false);
                      setCurrPostIndex(index);
                      console.log("RenderStubs.js CurrPostIndex=",index);
                      setPostDraft(post)
                      setShowMainModal(true);
                    }}
                  >
                    <div>
                      { post.title ? 
                        <div>{post.title}</div>
                        :
                        <div> Click to edit </div>
                      }
                      <div className="mt-2">{post.contributors}</div>
                      <VoteCounter
                        postingsDataArray = {postingsDataArray}
                        // showMainModal = {showMainModal}
                        index = {index}
                        postDraft = {postDraft}
                        setPostDraft = {setPostDraft}
                        userVoted = {userVoted}
                        setUserVoted = {setUserVoted}
                      />
                    </div>
                  </div>
                </Draggable>
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

export default RenderStubs;
