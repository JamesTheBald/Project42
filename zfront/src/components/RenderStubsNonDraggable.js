import React, { useState, useEffect } from "react";
import PopupContent from "./PopupContent";
import VoteCounter from "./VoteCounter";
import RenderSpiciness from "./RenderSpiciness";
import lockPost from "../functions/lockPost";
// import { GoTriangleDown } from "react-icons/go";
import { AiOutlineCaretDown } from "react-icons/ai";

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
  // const zoomedOrPanned = props.zoomedOrPanned
  const recdLog = props.recdLog;
  // const posnLog = props.posnLog

  const [vizArray, setVizArray] = useState([]);
  // let timeout;
  // const delay = 300;

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
    // timeout = setTimeout(() => {
    setVizArray((currVizArray) => {
      let newVizArray = [...currVizArray];
      newVizArray[index] = "visible";
      // console.log("RenderStubsNonDraggable.js showToolTip newVizArray=", newVizArray);
      return newVizArray;
    });
    // }, delay || 200);
  };

  const hideToolTip = (index) => {
    setVizArray((currVizArray) => {
      let newVizArray = [...currVizArray];
      newVizArray[index] = "invisible";
      // console.log("RenderStubsNonDraggable.js showToolTip newVizArray=", newVizArray);
      return newVizArray;
    });
    // clearInterval(timeout);
  };

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
      console.log("RenderStubsNonDraggble.js handleOnClick - post is locked"); // ADD A WARNING POPUP
    }
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
              className="text-xs flex flex-col items-center absolute text-gray-800"
              style={{ top: post.positionY, left: post.positionX, transform: `scale(${stubScale})` }}>
              {/* Tooltip divs - content and formatting must match RenderStubsDraggable's! */}
              <div className="flex flex-col items-center" style={{ zIndex: "-9999" }}>
                <div className={`${vizArray[index]} w-96 p-2  bg-gray-200 rounded-lg  opacity-90`}>
                  <PopupContent post={post} postDraft={postDraft} setPostDraft={setPostDraft} />
                </div>
                <div className={`${vizArray[index]} opacity-90`} style={{ transform: "translateY(-8px)" }}>
                  <AiOutlineCaretDown className="text-3xl  text-gray-200" />
                </div>
              </div>

              {/* Stub */}
              <div
                className="flex w-56 mb-2 border border-gray-900 rounded-lg bg-gray-200 relative"
                onMouseEnter={() => showToolTip(index)}
                onMouseLeave={() => hideToolTip(index)}
                onClick={handleOnClick(post, index)}
                style={{ zIndex: "9999" }}>
                <div
                  name="title-contributor-container"
                  className="flex flex-col justfy-between relative items-start w-3/4 p-2 border-r border-gray-900">
                  {post.title ? (
                    <div>
                      <div className="max-h-6 leading-3 overflow-hidden font-500">{post.title}</div>

                      {post.title.length > 60 ? (
                        <div
                          name="fade-out-title-container"
                          className="mt-2 absolute top-3 right-0 w-full h-3 bg-gradient-to-l from-gray-200"></div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <div>Click to edit</div>
                  )}

                  <div>
                    <div className="m-2 text-gray-500  absolute bottom-0 left-0 truncate w-4/5">
                      {post.contributors}
                    </div>
                  </div>
                </div>

                <div
                  name="stub-attribute-container"
                  className="flex flex-col justify-between items-center w-1/4 p-2 rounded-r-lg">
                  <div className="text-gray-500"> {post.contentType} </div>

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

              <div className="invisible w-56 h-24 transform -translate-y-24" style={{ zIndex: "-9999" }} />
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
