import React from "react";
import Tooltip from "./Tooltip";
import PopupContent from "./PopupContent";
import VoteCounter from "./VoteCounter";
import RenderSpiciness from "./RenderSpiciness";


const RenderStubsNonDraggable = (props) => {

  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex= props.setCurrPostIndex;
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
        {postingsDataArray.map((post, index) => {           // console.log("RenderStubs .map: index=", index, " and post=", post);

          return (
            <div key={index} 
                className="w-64 my-2 absolute" 
                style={{top: post.positionY, left: post.positionX, zIndex: -1}} 
                onClick={() => {
                  setCreatingPostFlag(false);
                  setCurrPostIndex(index);
                  setPostDraft(post)
                  setShowMainModal(true);
                } 
              }>

                <div className="p-2 border border-gray-800 rounded-lg bg-red-200 ">

                  <Tooltip content={PopupContent(post)} delay="200" direction="top" css="tooltipPopup rounded-lg"> 
                      {/* css="tooltipPopup" is required. Edit background color on tooltip.css */}

                    { post.title ? 
                      <div>{post.title}</div>
                      :
                      <div> Click to edit </div>
                    }
                    <div className="mt-2">{post.contributors}</div>

                    <RenderSpiciness spiciness = {post.spiciness} />
                    
                    <VoteCounter
                      postingsDataArray = {postingsDataArray}
                      userVoted = {userVoted}
                      setUserVoted = {setUserVoted}
                      postDraft = {postDraft}
                      setPostDraft = {setPostDraft}
                      index = {index}
                    />

                  </Tooltip>
                  
                </div>
             
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
