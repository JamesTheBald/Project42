import React, { useState, useEffect, useRef } from "react"; //, Component
import Button from "react-bootstrap/Button";

import NavBar from "./NavBar";
import MainModal from "./MainModal";
import RenderStubsDraggable from "./RenderStubsDraggable";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";
// import ZoomControls from "./ZoomControls";
import DragModeZoomPanStubs from "./DragModeZoomPanStubs";


const emptyPost = {
  title: "",
  contributors: "",
  content: "",
  tags: "",
  contentType: "",
  spiciness: "",
  upvotes: 0,
  positionX: 0,
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
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const ref = useRef(null);

  function updateZoomPan(stats) {
    console.log("PostingsList.js updateZoomPan() stats=", stats);
    setZoomScale(stats.scale);
    setPositionX(stats.positionX);
    setPositionY(stats.positionY);
  }

  // console.log("PostingsList.js begins: creatingPostFlag=", creatingPostFlag);
  console.log("PostingsList.js begins: postDraft=", postDraft);
  // console.log("PostingsList.js begins: zoomScale=", zoomScale);

  // useEffect(() => {
  //   console.log("PostingsList.js useEffect zoomScale=", zoomScale);
  //   console.log("PostingsList.js useEffect ref.current.style=", ref.current.style);
  //   ref.current.style.transform = `scale(${zoomScale})`;
  // }, [zoomScale]);

  useEffect(() => {
    console.log("PostingsList.js useEffect zoomScale=", zoomScale);
    console.log("PostingsList.js useEffect ref.current =", ref.current);

    ref.current.style.transform = `scale(${zoomScale}) translate(${positionX}px, ${positionY}px)`;
  }, [zoomScale, positionX, positionY]);



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
    console.log("handleKeyDown event.key=", event.key);
    if (event.key === "Shift") {
      setDragMode(true);
    }
  };
  const handleKeyUp = (event) => {
    if (event.key === "Shift") setDragMode(false);
    console.log("PostingsList.js handleKeyUp() zoomScale=", zoomScale);
  };

  // Retrive the data from DB into postingsDataArray, so postingsDataArray is never null
  if (!postingsDataArray) {
    console.log("postingsDataArray is falsy so retrieving it from the DB. In the interim setting it to [emptyPost]");
    setPostingsDataArray([emptyPost]);
    retrievePostings(setPostingsDataArray, emptyPost);
  }


  // MAIN PostingsList RETURN
  return (
    <>
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

      {/* <div className="flex flex-row">
        <div> Scale = {zoomScale}</div>
        <div> positionX = {positionX}</div>
        <div> positionY = {positionY}</div>
      </div> */}

      {/* Draggable mode */}

        <div ref={ref} className="backdrop absolute opacity-50" style={{ zIndex: -10 }}>

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
            />
          )}
        </div>

      {/* ZoomPan mode */}
      {!dragMode && (
        <DragModeZoomPanStubs
          updateZoomPan = { updateZoomPan }
          zoomScale = { zoomScale }
          positionX = { positionX }
          positionY = { positionY }
          postingsDataArray = { postingsDataArray }
          currPostIndex = { currPostIndex }
          setCurrPostIndex = { setCurrPostIndex }
          showMainModal = { showMainModal }
          setShowMainModal = { setShowMainModal }
          postDraft = { postDraft }
          setPostDraft = { setPostDraft }
          setCreatingPostFlag = { setCreatingPostFlag }
          userVoted = { userVoted }
          setUserVoted = { setUserVoted }
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

      {dragMode ? <div>DRAG TIME!</div> : <div>Zoom around</div>}

      <Button
        variant="outline-danger"
        onClick={() => {
          removeAllPostings();
          setPostingsDataArray([emptyPost]);
        }}>
        [Dev Only] Remove All
      </Button>
    </>
  );
};

export default PostingsList;
