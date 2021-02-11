import React, { useRef } from "react";    // , useEffect
import Tooltip from "./Tooltip";
import PopupContent from "./PopupContent";
import Draggable from "react-draggable"
import VoteCounter from "./VoteCounter";

const RenderStubs = (props) => {

  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex= props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  let oldPosition = useRef( {x:100,y:100} );

  // const bounds = { bottom: 0, right: 0 };

  // let userVoted = props.userVoted;
  // const setUserVoted = props.userVoted;


  const handlerOnStop = (post, index) => (event, data) => {    // Currying! Spicy! 
    // https://www.carlrippon.com/using-currying-to-pass-additional-data-to-react-event-handlers/
    // console.log("post=",post);  console.log("index=",index);  console.log("event=",event);  console.log("data=",data);

    event.stopPropagation();             //J: I think this is important... don't want bubbling?
    console.log("x=",data.x, " y=",data.y);
    console.log("oldPosition.current.x = ", oldPosition.current.x, "oldPosition.current.y = ", oldPosition.current.y )
    
    if (data.x === oldPosition.current.x && data.y === oldPosition.current.y) {
      console.log("You just clicked! Opening MainModal");

      setCreatingPostFlag(false);
      setCurrPostIndex(index);
      console.log("RenderStubs.js CurrPostIndex=",index);
      setPostDraft(post)
      setShowMainModal(true);
    } else {
      // save the new coordinates (data.x, data.y) to DB, postingsDataArray[index].positionX and .positionY
    }

    oldPosition.current = {x:data.x, y:data.y};
  }


  console.log("RenderStubs.js postingsDataArray=", postingsDataArray);

  if (postingsDataArray?.length>0) {
    
    return (
      <>
        <div className="backdrop"></div>


        {postingsDataArray.map((post, index) => {
          // console.log("RenderStubs .map: index=", index, " and post=", post);

          return (
            <div key={index} className="w-64 my-2">

            {/* make <Draggable conditional on keypress? */}
              <Draggable
                // bounds={bounds}
                onStop={handlerOnStop(post, index)}
                allowAnyClick={true}
                // Specify location of the stub using post.positionX and post.positionY
              >
  
                  <div className="border p-2 border-gray-800 rounded-lg">
                    <Tooltip content={PopupContent(post)} delay="200" direction="top" css="tooltipPopup rounded-lg"> 
                        {/* css="tooltipPopup" is required. Edit background color on tooltip.css */}


                      { post.title ? 
                        <div>{post.title}</div>
                        :
                        <div> Click to edit </div>
                      }
                      <div className="mt-2">{post.contributors}</div>
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

export default RenderStubs;
