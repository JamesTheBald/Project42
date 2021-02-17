import React, { useState, useEffect, useRef } from "react";

import NavBar from "./NavBar";
import MainModal from "./MainModal";
import RenderStubsDraggable from "./RenderStubsDraggable";
import retrievePostings from "../functions/retrievePostings";
// import removeAllPostings from "../functions/removeAllPostings";
import ZoomPanNonDraggableStubs from "./ZoomPanNonDraggableStubs";

const emptyPost = {
  title: "",
  contributors: "",
  tags: "",
  contentType: "",
  spiciness: "",
  upvotes: 0,
  purpose: "",
  positionX: 0, // Coordinates for post's location. Don't confuse with panX & panY (screen pan distances)
  positionY: 0,
};

const PostingsList = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showMainModal, setShowMainModal] = useState(false);
  const [postingsDataArray, setPostingsDataArray] = useState();
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const [postDraft, setPostDraft] = useState(emptyPost);
  const [creatingPostFlag, setCreatingPostFlag] = useState(false);
  const [userVoted, setUserVoted] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.5);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const stubsDraggable = useRef(null);
  const stubDragged = useRef(false);
  const zoomedOrPanned = useRef(false);
  const imageWidth = 3840; // Set these to equal image dimensions
  const imageHeight = 2160;

  zoomedOrPanned.current = false;


  function updateZoomPan(stats) {
    // console.log("PostingsList.js updateZoomPan() stats=", stats);
    console.log("PostingsList.js updateZoomPan() zoomScale=", stats.scale, ", panX=",stats.positionX, ', panY=',stats.positionY);
    setZoomScale(stats.scale);
    setPanX(stats.positionX);
    setPanY(stats.positionY);
    // zoomedOrPanned.current = true;
  }

  // console.log("PostingsList.js begins: creatingPostFlag=", creatingPostFlag);
  console.log("PostingsList.js begins: postDraft=", postDraft);

  useEffect(() => {
    // console.log("PostingsList.js useEffect zoomScale=", zoomScale);
    // console.log("PostingsList.js useEffect ref.current =", ref.current);
    let adjustedPanX = imageWidth / 2 - imageWidth / (2 * zoomScale) + panX / zoomScale;
    let adjustedPanY = imageHeight / 2 - imageHeight / (2 * zoomScale) + panY / zoomScale;

    stubsDraggable.current.style.transform = `scale(${zoomScale}) translate(${adjustedPanX}px, ${adjustedPanY}px)`;
  }, [zoomScale, panX, panY]);

  useEffect(() => {
    // from: https://stackoverflow.com/questions/59546928/keydown-up-events-with-react-hooks-not-working-properly
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyDown = (event) => {
    // console.log("handleKeyDown event.key=", event.key);
    if (event.key === "Shift") {
      setDragMode(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Shift") setDragMode(false);
    // console.log("PostingsList.js handleKeyUp() zoomScale=", zoomScale);
  };

  // Retrive the data from DB into postingsDataArray, so postingsDataArray is never null
  if (!postingsDataArray) {
    console.log("postingsDataArray is falsy so retrieving it from the DB. In the interim setting it to [emptyPost]");
    setPostingsDataArray([emptyPost]);
    retrievePostings(setPostingsDataArray, emptyPost);
  }

  // const screenSize = {maxWidth: `${imageWidth/2}`, maxHeight: `${imageHeight/2}`};

  const createPostAtMouseClick = (event) => {
    // let currentTargetRect = evnt.currentTarget.getBoundingClientRect();
    // Do we want this relative to the bounding rectange?
    console.log("createPostAtMouseClick stubDragged.current=", stubDragged.current);

    if (!stubDragged.current) {
      const offsetX = event.pageX - window.pageXOffset; // - currentTargetRect.left;
      const offsetY = event.pageY - window.pageYOffset; // - currentTargetRect.top;
      console.log("createPostAtMouseClick event.pageX=", event.pageX, "  window.pageXOffset=",window.pageXOffset);
      console.log("createPostAtMouseClick event.pageY=", event.pageY, "  window.pageYOffset=",window.pageYOffset);

      console.log("PostingsList.js createPostAtMouseClick: creatingPostFlag=true");
      setCreatingPostFlag(true);
  
      const emptyPostWithCoords = { ...emptyPost, positionX: offsetX, positionY: offsetY };
      setPostDraft(emptyPostWithCoords);
      console.log("PostingsList.js createPostAtMouseClick: setting postDraft to", emptyPostWithCoords);
  
      setCurrPostIndex(() => {
        const newCurrPostIndex = postingsDataArray.length; // No need for .length-1 cos we just added an element
        console.log("PostingsList.js createPostAtMouseClick: newCurrPostIndex=", newCurrPostIndex);
        return newCurrPostIndex;
      });
      setShowMainModal(true);
      stubDragged.current = false;
    }
  };


  // MAIN PostingsList RETURN
  return (
    <div>
      
      <NavBar
        emptyPost={emptyPost}
        showWelcomeModal={showWelcomeModal}
        setShowWelcomeModal={setShowWelcomeModal}
        setShowMainModal={setShowMainModal}
        postingsDataArray={postingsDataArray}
        setPostingsDataArray={setPostingsDataArray}
        setCurrPostIndex={setCurrPostIndex}
        setCreatingPostFlag={setCreatingPostFlag}
        setPostDraft={setPostDraft}
      />

      {/* Draggable Mode */}
      <div
        ref={stubsDraggable}
        onClick={(event) => createPostAtMouseClick(event)}  // 
        className="backdrop absolute"
        style={{ zIndex: -10 }}
      >
        {dragMode && (
          <RenderStubsDraggable
            postingsDataArray={postingsDataArray}
            setCurrPostIndex={setCurrPostIndex}
            setShowMainModal={setShowMainModal}
            postDraft={postDraft}
            setPostDraft={setPostDraft}
            setCreatingPostFlag={setCreatingPostFlag}
            userVoted={userVoted}
            setUserVoted={setUserVoted}
            stubDragged={stubDragged}
          />
        )}
      </div>


      {/* ZoomPan mode */}
      {!dragMode && (
        <ZoomPanNonDraggableStubs
          updateZoomPan={updateZoomPan}
          zoomScale={zoomScale}
          panX={panX}
          panY={panY}
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
        />
      )}

      {/* Both modes, but often hidden */}
      {showMainModal && (
        <MainModal
          showMainModal={showMainModal}
          setShowMainModal={setShowMainModal}
          postingsDataArray={postingsDataArray}
          setPostingsDataArray={setPostingsDataArray}
          currPostIndex={currPostIndex} //C: currPostIndex points to the element in the postings array that we're interested in
          setCurrPostIndex={setCurrPostIndex}
          postDraft={postDraft}
          setPostDraft={setPostDraft}
          creatingPostFlag={creatingPostFlag}
          userVoted={userVoted}
          setUserVoted={setUserVoted}
        />
      )}

      {dragMode && <div>DRAG TIME!</div>}
    </div>
  );
};

export default PostingsList;
