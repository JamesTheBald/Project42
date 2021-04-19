import React, { useState, useEffect, useRef } from "react";

import NavBar from "./NavBar";
import MainModal from "./MainModal";
import TopicModal from "./TopicModal";
import RenderStubsDraggable from "./RenderStubsDraggable";
import RenderTopicsDraggable from "./RenderTopicsDraggable";
// import RenderBackgroundDraggable from "./RenderBackgroundDraggable";
import AdminControls from "./AdminControls";

import retrievePosts from "../functions/retrievePosts";
import retrieveTopics from "../functions/retrieveTopics";
import ZoomPanNonDraggableStubs from "./ZoomPanNonDraggableStubs";

const posnLogKey = false; //  true logs most important Zoompan scale and panX & panY positions
const posnLog = false; //  true logs all Zoompan scale and panX & panY positions
const recdLog = false; //  true logs state variables aka 'records', e.g. postingsDataArray, postDraft, topicsDataArray
const evntLog = false; //  true logs events, e.g. onClick, onKeyDown

const stubScale = 0.3;
const extraZoomOutFactor = 1;

const imageWidth = 4600; // Set these to equal background image dimensions (in app.css), in pixels
const imageHeight = 2000;
const initialPanX = 0;
const initialPanY = 0;

let displayWidth = window.innerWidth;
let minZoomScaleByWidth = (displayWidth / imageWidth) * extraZoomOutFactor;
const displayHeight = window.innerHeight;
let minZoomScaleByHeight = (displayHeight / imageHeight) * extraZoomOutFactor;
let minZoomScale = minZoomScaleByWidth < minZoomScaleByHeight ? minZoomScaleByWidth : minZoomScaleByHeight;

const maxZoomScale = 12;
const minZoomSpeed = 40;
const maxZoomSpeed = 600;

const blurKickInZoomLevel = 20;
const blurStepOnStart = 3; // step change in blurring (in pixels) when blurKickInZoomLevel is reached
const blurRampUpRate = 4; // as a multiplier of zoomLevel, to give pixels of blur

const emptyPost = {
  title: "Click to enter title of new post here",
  contributors: "Firstname & last initial of each contributor (e.g. Tony E.)",
  tags: "What tags are related to your post?",
  purpose: "Please enter a brief description. What is this post about?",
  contentType: "",
  spiciness: "",
  upvotes: 0,
  positionX: 1041, // Coordinates for post's location. Don't confuse with panX & panY (screen pan distances)
  positionY: 1000,
  locked: false,
  archived: false,
};

const emptyTopic = {
  topic: "", // Click to Enter Title of New Topic
  topicLevel: "Main Topic",
  positionX: 1200, // Coordinates for topic's location. Don't confuse with panX & panY (screen pan distances)
  positionY: 1200,
  locked: false,
  archived: false,
};

const AlphaComponent = () => {
  useEffect(() => {
    console.log("AlphaComponent.js is first run");
  }, []);

  const [postingsDataArray, setPostingsDataArray] = useState();
  const [showMainModal, setShowMainModal] = useState(false);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const [postDraft, setPostDraft] = useState(emptyPost);
  const [creatingPostFlag, setCreatingPostFlag] = useState(false);
  const [userVoted, setUserVoted] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [zoomScale, setZoomScale] = useState(minZoomScale);
  const [panX, setPanX] = useState(initialPanX);
  const [panY, setPanY] = useState(initialPanY);
  const [zoomSpeed, setZoomSpeed] = useState(300);

  const [topicsDataArray, setTopicsDataArray] = useState();
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [currTopicIndex, setCurrTopicIndex] = useState(0);
  const [topicDraft, setTopicDraft] = useState(emptyTopic);
  const [creatingTopicFlag, setCreatingTopicFlag] = useState(false);
  const [blurLevel, setBlurLevel] = useState(false);
  const [showToolMenu, setShowToolMenu] = useState(false);

  const draggableTransform = useRef(null);

  recdLog && console.log("AlphaComponent.js begins...");
  recdLog && console.log("postingsDataArray=", postingsDataArray);
  recdLog && console.log("postDraft=", postDraft);
  recdLog && console.log("topicsDataArray=", topicsDataArray);
  recdLog && console.log("topicDraft=", topicDraft);

  if (displayWidth !== window.innerWidth) {
    displayWidth = window.innerWidth;
    let minZoomScaleByWidth = (displayWidth / imageWidth) * extraZoomOutFactor;
    minZoomScale = minZoomScaleByWidth < minZoomScaleByHeight ? minZoomScaleByWidth : minZoomScaleByHeight;
    setShowToolMenu(false);
    console.log("AlphaComponent: displayWidth=", displayWidth, ", displayHeight=", displayHeight);
    console.log("AlphaComponent: minZoomScaleByWidth=", minZoomScaleByWidth);
    console.log("AlphaComponent: minZoomScaleByHeight=", minZoomScaleByHeight);
    console.log("AlphaComponent: So minZoomScale=", minZoomScale);
  }

  const updateZoomPan = (stats) => {
    posnLogKey && console.log("AlphaComponent.js updateZoomPan() zoomScale=", stats.scale, ", blurLevel=", blurLevel);
    posnLogKey && console.log("AlphaComponent.js updateZoomPan() panX=", stats.positionX, ", panY=", stats.positionY);
    setZoomScale(stats.scale);
    setPanX(stats.positionX);
    setPanY(stats.positionY);
    setBlurLevel(
      zoomScale < blurKickInZoomLevel
        ? 1
        : zoomScale * blurRampUpRate - blurKickInZoomLevel * blurRampUpRate - 1 + blurStepOnStart
    );
    setShowToolMenu(false);
  };

  const resetZoom = () => {
    setZoomScale(minZoomScale);
    setPanX(initialPanX);
    setPanY(initialPanY);
    scrollToTopLeft();
  };

  const scrollToTopLeft = () => {
    // from https://gist.github.com/romanonthego/223d2efe17b72098326c82718f283adb
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log("Using fallback scrolling method (for older browsers)");
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    posnLog && console.log("AlphaComponent.js useEffect() zoomScale=", zoomScale, "panX=", panX, ", panY=", panY);

    // convert from react-zoom-pan-pinch's coordinate system (panX, panY) to the background's (adjustedPanX etc)
    let adjustedPanX = imageWidth / 2 - imageWidth / (2 * zoomScale) + panX / zoomScale;
    let adjustedPanY = imageHeight / 2 - imageHeight / (2 * zoomScale) + panY / zoomScale;

    draggableTransform.current.style.transform = `scale(${zoomScale}) translate(${adjustedPanX}px, ${adjustedPanY}px)`;
  }, [zoomScale, panX, panY]);

  useEffect(() => {
    console.log("AlphaComponent - useEffect EventListeners 'keyup' & keydown' added");
    // from: https://stackoverflow.com/questions/59546928/keydown-up-events-with-react-hooks-not-working-properly
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Shift") {
      setDragMode(true);
      evntLog && console.log("AlphaComponent.js handleKeyDown() Shift key pressed");
    }
    if (event.key === "Alt") {
      setAdminMode(true);
      evntLog && console.log("AlphaComponent.js handleKeyDown() Alt key pressed");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Shift") {
      setDragMode(false);
      evntLog && console.log("AlphaComponent.js handleKeyUp() Shift key released");
    }
    if (event.key === "Alt") {
      setAdminMode(false);
      evntLog && console.log("AlphaComponent.js handleKeyUp() Alt key released");
    }
  };

  // Retrive from DB into postingsDataArray, so postingsDataArray is never null
  if (!postingsDataArray) {
    console.log("postingsDataArray is falsy so retrieving it from the DB. In the interim setting it to [emptyPost]");
    setPostingsDataArray([emptyPost]);
    retrievePosts(setPostingsDataArray, emptyPost, recdLog);
  }

  // Retrive from DB into topicsDataArray, so topicsDataArray is never null
  if (!topicsDataArray) {
    console.log("topicsDataArray is falsy so retrieving it from the DB. In the interim setting it to [emptyTopic]");
    setTopicsDataArray([emptyTopic]);
    retrieveTopics(setTopicsDataArray, emptyTopic);
  }


  const createPostAtMouseClick = (event) => {
    
    // const offsetX = event.pageX - window.pageXOffset; // - currentTargetRect.left;
    const posX = (event.pageX - panX) / zoomScale - window.pageXOffset;
    const posY = (event.pageY - panY - 80) / zoomScale - window.pageYOffset;

    // const offsetY = event.pageY - window.pageYOffset; // - currentTargetRect.top;
    // const posY = ((event.pageY + 80) * imageHeight) / displayHeight; // 80px to account for the Navbar
    posnLog && console.log("createPostMouseClk zoomScale=",zoomScale, ", panX=", panX, ", panY=", panY);
    posnLog && console.log("createPostMouseClk pageXOffset=",window.pageXOffset, ", pageYOffset=", window.pageYOffset);
    posnLog && console.log("createPostMouseClk posX=", posX, ", posY=", posY);
    
    // setCreatingPostFlag(true);
    // const emptyPostWithCoords = { ...emptyPost, positionX: posX, positionY: posY };
    // setPostDraft(emptyPostWithCoords);
    // console.log("AlphaComponent.js createPostAtMouseClick: setting postDraft to", emptyPostWithCoords);

    // setCurrPostIndex(() => {
    //   const newCurrPostIndex = postingsDataArray.length; // No need for .length-1 cos we just added an element
    //   console.log("AlphaComponent.js createPostAtMouseClick: newCurrPostIndex=", newCurrPostIndex);
    //   return newCurrPostIndex;
    // });
    // setShowMainModal(true);
  }
  

  // MAIN AlphaComponent
  return (
    <div className="backgroundColor" style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
      {/* <div style={{ width: `${displayWidth}px`, height: `${displayHeight}px` }}> */}

      <div name="Container for navBar and Admin Controls" className="flex flex-row w-full">
        <NavBar
          className="absolute"
          emptyPost={emptyPost}
          setShowMainModal={setShowMainModal}
          postingsDataArray={postingsDataArray}
          setPostingsDataArray={setPostingsDataArray}
          setCurrPostIndex={setCurrPostIndex}
          setCreatingPostFlag={setCreatingPostFlag}
          setPostDraft={setPostDraft}
          emptyTopic={emptyTopic}
          setShowTopicModal={setShowTopicModal}
          topicsDataArray={topicsDataArray}
          setTopicsDataArray={setTopicsDataArray}
          setCurrTopicIndex={setCurrTopicIndex}
          setCreatingTopicFlag={setCreatingTopicFlag}
          setTopicDraft={setTopicDraft}
          minZoomScale={minZoomScale}
          maxZoomScale={maxZoomScale}
          zoomScale={zoomScale}
          setZoomScale={setZoomScale}
          resetZoom={resetZoom}
          zoomSpeed={zoomSpeed}
          setZoomSpeed={setZoomSpeed}
          minZoomSpeed={minZoomSpeed}
          maxZoomSpeed={maxZoomSpeed}
          displayWidth={displayWidth}
          showToolMenu={showToolMenu}
          setShowToolMenu={setShowToolMenu}
          // recdLog={recdLog}
        />

        {adminMode && (
          <AdminControls
            emptyPost={emptyPost}
            emptyTopic={emptyTopic}
            postingsDataArray={postingsDataArray}
            setPostingsDataArray={setPostingsDataArray}
            topicsDataArray={topicsDataArray}
            setTopicsDataArray={setTopicsDataArray}
            recdLog={recdLog}
          />
        )}
      </div>

      <div
        ref={draggableTransform}
        // onClick={(event) => createPostAtMouseClick(event)}
        className="absolute z-0" // absolute is required here
        style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
      >
        {/* Draggable Mode */}
        {dragMode && (
          <>
            <div 
              className="backgroundImage absolute"
              //  style={{ filter: `blur(${blurLevel}px)` }}
              onClick={createPostAtMouseClick}
            />

            <RenderTopicsDraggable
              topicsDataArray={topicsDataArray}
              recdLog={posnLog}
            />

            <RenderStubsDraggable
              postingsDataArray={postingsDataArray}
              postDraft={postDraft}
              setPostDraft={setPostDraft}
              userVoted={userVoted}
              setUserVoted={setUserVoted}
              stubScale={stubScale}
              recdLog={recdLog}
            />
            
          </>
        )}
      </div>

      {/* ZoomPan mode */}
      {!dragMode && (
        <ZoomPanNonDraggableStubs
          updateZoomPan={updateZoomPan}
          zoomScale={zoomScale}
          panX={panX}
          panY={panY}
          minZoomScale={minZoomScale}
          maxZoomScale={maxZoomScale}
          initialPanX={initialPanX}
          initialPanY={initialPanY}
          zoomSpeed={zoomSpeed}
          postingsDataArray={postingsDataArray}
          currPostIndex={currPostIndex}
          setCurrPostIndex={setCurrPostIndex}
          showMainModal={showMainModal}
          setShowMainModal={setShowMainModal}
          postDraft={postDraft}
          setPostDraft={setPostDraft}
          setCreatingPostFlag={setCreatingPostFlag}
          userVoted={userVoted}
          setUserVoted={setUserVoted}
          topicsDataArray={topicsDataArray}
          setCurrTopicIndex={setCurrTopicIndex}
          setShowTopicModal={setShowTopicModal}
          setTopicDraft={setTopicDraft}
          setCreatingTopicFlag={setCreatingTopicFlag}
          stubScale={stubScale}
          blurLevel={blurLevel}
          displayWidth={displayWidth}
          imageWidth={imageWidth}
          scrollToTopLeft={scrollToTopLeft}
          posnLog={posnLog}
          recdLog={recdLog}
        />
      )}

      {/* Present for both DragMode and !DragMode, but often hidden */}
      {showMainModal && (
        <MainModal
          emptyPost={emptyPost}
          showMainModal={showMainModal}
          setShowMainModal={setShowMainModal}
          postingsDataArray={postingsDataArray}
          setPostingsDataArray={setPostingsDataArray}
          currPostIndex={currPostIndex}
          setCurrPostIndex={setCurrPostIndex}
          postDraft={postDraft}
          setPostDraft={setPostDraft}
          creatingPostFlag={creatingPostFlag}
          userVoted={userVoted}
          setUserVoted={setUserVoted}
          recdLog={recdLog}
        />
      )}

      {showTopicModal && (
        <TopicModal
          showTopicModal={showTopicModal}
          setShowTopicModal={setShowTopicModal}
          topicsDataArray={topicsDataArray}
          setTopicsDataArray={setTopicsDataArray}
          currTopicIndex={currTopicIndex}
          setCurrTopicIndex={setCurrTopicIndex}
          topicDraft={topicDraft}
          setTopicDraft={setTopicDraft}
          creatingTopicFlag={creatingTopicFlag}
          recdLog={recdLog}
        />
      )}
      {/* </div> */}
    </div>
  );
};

export default AlphaComponent;
