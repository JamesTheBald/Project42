import React, { useState, useEffect } from "react";
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
  // const posnLog = props.posnLog


  const [vizArray, setVizArray] = useState([]);
  let timeout;
  const delay = 300;

  // console.log("RenderStubsNonDraggable.js begins. postingsDataArray=", postingsDataArray);

  useEffect(() => {
    if (postingsDataArray?.[0]?._id) {
      postingsDataArray.map((post, index) => {
        // console.log("RenderStubsNonDraggable useEffect setting VizArray")
        setVizArray((currVizArray) => {
          let newVizArray = [...currVizArray];
          newVizArray[index] = "invisible";
          return newVizArray;
        });
      });
    }
  }, [postingsDataArray]);

  const showToolTip = (index) => {
    timeout = setTimeout(() => {
      setVizArray((currVizArray) => {
        let newVizArray = [...currVizArray];
        newVizArray[index] = "visible";
        // console.log("RenderStubsNonDraggable.js showToolTip newVizArray=", newVizArray);
        return newVizArray;
      });
    }, delay || 200);
  };

  const hideToolTip = (index) => {
    setVizArray((currVizArray) => {
      let newVizArray = [...currVizArray];
      newVizArray[index] = "invisible";
      // console.log("RenderStubsNonDraggable.js showToolTip newVizArray=", newVizArray);
      return newVizArray;
    });
    clearInterval(timeout);
  };


  if (postingsDataArray?.[0]?._id) {
    return (
      <>
        {postingsDataArray.map((post, index) => {
          // console.log("RenderStubs .map: index=", index, " and post=", post);
          // posnLog && console.log('RenderStubsNonDraggable begins. post=',post.positionX,', post.positionY=',post.positionY)

          return (
            <div
              key={index}
              className="flex flex-col items-center absolute text-gray-800"
              style={{ top: post.positionY, left: post.positionX }} // , zIndex: -1
            >
              {/* Tooltip divs - content and formatting must match RenderStubsDraggable's! */}
              <div className={`${vizArray[index]} w-80 p-2  bg-gray-200 border border-gray-600 rounded-lg z-10`}>
                <PopupContent post={post} />
              </div>
              <div className={`${vizArray[index]}`}>Down Arrow Here</div>
              {/* J: I'm thinking React Icon "IoMdArrowDropdown" */}

              {/* Stub */}
              <div
                className="flex w-56 mt-4 mb-2 border border-gray-900 rounded-lg bg-gray-200 z-10"
                onMouseEnter={() => showToolTip(index)}
                onMouseLeave={() => hideToolTip(index)}
                onClick={() => {
                  setCreatingPostFlag(false);
                  setCurrPostIndex(index);
                  setPostDraft(post);
                  setShowMainModal(true);
                }}
              >

                <div
                  name="title-contributor-container"
                  className="flex flex-col justfy-between items-start w-3/4 p-2 border-r border-gray-900"
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
          );
        })}
      </>
    );
  } else {
    return <div> No posts visible </div>;
  }
};

export default RenderStubsNonDraggable;
