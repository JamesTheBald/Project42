import React, { useRef } from "react";
import Draggable from "react-draggable"
import VoteCounter from "./VoteCounter";
import updatePositionOnDB from "../functions/updatePositionOnDB";
import RenderSpiciness from "./RenderSpiciness"


const RenderStubsDraggable = (props) => {

  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex= props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  let oldPosition = useRef( {x:0,y:0} );

  let defaultPosn = {};


  const handleOnStop = (post, index) => (event, data) => {    // Currying! Spicy! 
    // https://www.carlrippon.com/using-currying-to-pass-additional-data-to-react-event-handlers/
    // console.log("post=",post);  console.log("index=",index);  console.log("event=",event);  console.log("data=",data);

    event.stopPropagation();             //J: I think this is important... don't want bubbling?
    console.log("RenderStubsDraggable.js handleOnStop  x=",data.x, " y=",data.y);
    console.log("RenderStubsDraggable.js handleOnStop  old-x = ", oldPosition.current.x, "old-y = ", oldPosition.current.y )
    
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
      defaultPosn = {x:post.positionX, y:post.positionY};
    }

    oldPosition.current = {x:data.x, y:data.y};
  }

  console.log("RenderStubsDraggable.js before .map  postingsDataArray=", postingsDataArray);


  if (postingsDataArray && postingsDataArray[0]._id) {
    
    return (
      <>
        {postingsDataArray.map((post, index) => {           // console.log("RenderStubsDraggable .map: index=", index, " and post=", post);

          defaultPosn = {x:post.positionX, y:post.positionY};
          // console.log("RenderStub.js .map loop  index=", index, "defaultPosn=", defaultPosn)

          return (
            <div 
              key={index}
              className="w-64 my-2 absolute z-20"
            >

              <Draggable
                onStop = {handleOnStop(post, index)}
                allowAnyClick = {true}
                defaultPosition = {defaultPosn}
              >
  
                <div 
                  name="post-stub"
                  className="flex border-2 border-gray-600 rounded-lg bg-gray-200 shadow-md"
                >
                  {/* bg-gray-200 */}
                  {/* <Tooltip content={PopupContent(post)} delay="200" direction="top" css="tooltipPopup rounded-lg">  */}
                      {/* css="tooltipPopup" is required. Edit background color on tooltip.css */}



                  <div
                    name="title-contributor-container"
                    className="w-3/4 p-2 flex flex-col justify-between border-r-2 border-gray-600"
                  >
                    { post.title ? 
                      <div className="font-medium text-sm line-clamp-2">{post.title}</div>
                      :
                      <div>Click to edit</div>
                    }
                    <div className="mt-2 text-gray-500 text-xs">{post.contributors}</div>
                  </div>



                  <div
                    name="stub-attribute-container"
                    className="w-1/4 flex flex-col items-center justify-center"
                  >
                    
                    <div className="text-gray-500 text-xs p-2">{post.contentType}</div>

                    <RenderSpiciness spiciness = {post.spiciness}/>

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

                  {/* </Tooltip> */}
                  
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
