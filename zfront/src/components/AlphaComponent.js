import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";

import removeAllPosts from "../functions/removeAllPosts";
import removeAllTopics from "../functions/removeAllTopics";
import NavBar from "./NavBar";
import MainModal from "./MainModal";
import TopicModal from "./TopicModal";
import RenderStubsDraggable from "./RenderStubsDraggable";
import RenderTopicsDraggable from "./RenderTopicsDraggable";
import retrievePosts from "../functions/retrievePosts";
import retrieveTopics from "../functions/retrieveTopics";
import ZoomPanNonDraggableStubs from "./ZoomPanNonDraggableStubs";
import unlockAll from "../functions/unlockAll";


const posnLog = false;  // Set true if you want to see console logs with Zoompan positions panX and panY
const recdLog = true;  // Set true if you want to see postingsDataArray, postDraft, topicsDataArray, etc 
const actnLog = true;  // Set true if you want to see postingsDataArray, postDraft, topicsDataArray, etc 

const emptyPost = {
  title: "",
  contributors: "",
  tags: "",
  contentType: "",
  spiciness: "",
  upvotes: 0,
  positionX: 200, // Coordinates for post's location. Don't confuse with panX & panY (screen pan distances)
  positionY: 200,
  locked: false
};

const emptyTopic = {
  topic: "",
  topicLevel: "",
  positionX: 200, // Coordinates for topic's location. Don't confuse with panX & panY (screen pan distances)
  positionY: 200,
};

const AlphaComponent = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [postingsDataArray, setPostingsDataArray] = useState();
  const [showMainModal, setShowMainModal] = useState(false);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const [postDraft, setPostDraft] = useState(emptyPost);
  const [creatingPostFlag, setCreatingPostFlag] = useState(false);
  const [userVoted, setUserVoted] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.5);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(80);

  const [topicsDataArray, setTopicsDataArray] = useState();
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [currTopicIndex, setCurrTopicIndex] = useState(0);
  const [topicDraft, setTopicDraft] = useState(emptyTopic);
  const [creatingTopicFlag, setCreatingTopicFlag] = useState(false);

  const stubsDraggable = useRef(null);
  const stubDragged = useRef(false);
  const topicDragged = useRef(false);
  const zoomedOrPanned = useRef(false);
  const imageWidth = 3840; // Set these to equal background image dimensions
  const imageHeight = 2160;

  zoomedOrPanned.current = false;


  console.log("AlphaComponent.js begins");
  recdLog && console.log("AlphaComponent.js postingsDataArray=", postingsDataArray);
  recdLog && console.log("AlphaComponent.js postDraft=", postDraft);
  recdLog && console.log("AlphaComponent.js topicsDataArray=", topicsDataArray);
  recdLog && console.log("AlphaComponent.js topicDraft=", topicDraft);

  function updateZoomPan(stats) {
    posnLog && console.log("AlphaComponent.js updateZoomPan() zoomScale=", stats.scale, ", panX=",stats.positionX, ', panY=',stats.positionY);
    setZoomScale(stats.scale);
    setPanX(stats.positionX);
    setPanY(stats.positionY);
  }

  useEffect(() => {
    // console.log("AlphaComponent.js useEffect zoomScale=", zoomScale);
    // console.log("AlphaComponent.js useEffect ref.current =", ref.current);
    let adjustedPanX = imageWidth / 2 - imageWidth / (2 * zoomScale) + panX / zoomScale;
    let adjustedPanY = imageHeight / 2 - imageHeight / (2 * zoomScale) + panY / zoomScale;

    stubsDraggable.current.style.transform = `scale(${zoomScale}) translate(${adjustedPanX}px, ${adjustedPanY}px)`;
  }, [zoomScale, panX, panY]);

  useEffect(() => {
    console.log("AlphaComponent - useEffect EventListeners 'keyup' & keydown' added")
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
      actnLog && console.log("AlphaComponent.js handleKeyDown() Shift key pressed");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Shift") {
      setDragMode(false);
      actnLog && console.log("AlphaComponent.js handleKeyUp() Shift key released");
    }
  };

  // Retrive tfrom DB into postingsDataArray, so postingsDataArray is never null
  if (!postingsDataArray) {
    console.log("postingsDataArray is falsy so retrieving it from the DB. In the interim setting it to [emptyPost]");
    setPostingsDataArray([emptyPost]);
    retrievePosts(setPostingsDataArray, emptyPost);
  }

// Retrive from DB into topicsDataArray, so topicsDataArray is never null
if (!topicsDataArray) {
  console.log("topicsDataArray is falsy so retrieving it from the DB. In the interim setting it to [emptyTopic]");
  setTopicsDataArray([emptyTopic]);
  retrieveTopics(setTopicsDataArray, emptyTopic);
}


  const createPostAtMouseClick = (event) => {
    // Uses: event, stubDragged, setCreatingPostFlag, emptyPost, setPostDraft, setCurrPostIndex, postingsDataArray, setShowMainModal
    // This function needs the event object, so may need currying to move to external file.
    // let currentTargetRect = evnt.currentTarget.getBoundingClientRect();
    // Do we want this relative to the bounding rectange?
    console.log("createPostAtMouseClick stubDragged.current=", stubDragged.current, " and dragMode=",dragMode);
    
    if (dragMode && !stubDragged.current && !topicDragged.current) {
      const offsetX = event.pageX - window.pageXOffset; // - currentTargetRect.left;
      const offsetY = event.pageY - window.pageYOffset; // - currentTargetRect.top;
      posnLog && console.log("createPostAtMouseClick event.pageX=", event.pageX, "  window.pageXOffset=",window.pageXOffset);
      posnLog && console.log("createPostAtMouseClick event.pageY=", event.pageY, "  window.pageYOffset=",window.pageYOffset);

      console.log("AlphaComponent.js createPostAtMouseClick: creatingPostFlag=true");
      setCreatingPostFlag(true);
  
      const emptyPostWithCoords = { ...emptyPost, positionX: offsetX, positionY: offsetY };
      setPostDraft(emptyPostWithCoords);
      console.log("AlphaComponent.js createPostAtMouseClick: setting postDraft to", emptyPostWithCoords);
  
      setCurrPostIndex(() => {
        const newCurrPostIndex = postingsDataArray.length; // No need for .length-1 cos we just added an element
        console.log("AlphaComponent.js createPostAtMouseClick: newCurrPostIndex=", newCurrPostIndex);
        return newCurrPostIndex;
      });
      setShowMainModal(true);
      stubDragged.current = false;
    }
  };


  // MAIN AlphaComponent RETURN
  return (
    <div>
      
      <NavBar className="absolute"
        emptyPost={emptyPost}
        showWelcomeModal={showWelcomeModal}
        setShowWelcomeModal={setShowWelcomeModal}
        setShowMainModal={setShowMainModal}
        postingsDataArray={postingsDataArray}
        setPostingsDataArray={setPostingsDataArray}
        setCurrPostIndex={setCurrPostIndex}
        setCreatingPostFlag={setCreatingPostFlag}
        setPostDraft={setPostDraft}

        emptyTopic ={emptyTopic}
        setShowTopicModal ={setShowTopicModal}
        topicsDataArray ={topicsDataArray}
        setTopicsDataArray ={setTopicsDataArray}
        setCurrTopicIndex={setCurrTopicIndex}
        setCreatingTopicFlag={setCreatingTopicFlag}
        setTopicDraft={setTopicDraft}
        // recdLog={recdLog}
      />


      {/* Draggable Mode */}
      <div
        ref={stubsDraggable}
        onClick={(event) => createPostAtMouseClick(event)}
        className="backdrop absolute"
        style={{ zIndex: -10 }}
      >
        {dragMode && (
          <>
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
              recdLog={recdLog}
              posnLog={posnLog}
            />
            <RenderTopicsDraggable
              topicsDataArray={topicsDataArray}
              setCurrTopicIndex={setCurrTopicIndex}
              setShowTopicModal={setShowTopicModal}
              setTopicDraft={setTopicDraft}
              setCreatingTopicFlag={setCreatingTopicFlag}
              topicDragged={topicDragged}
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
          posnLog={posnLog}
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

          emptyTopic={emptyTopic}
          setShowTopicModal={setShowTopicModal}
          topicsDataArray={topicsDataArray}
          setCurrTopicIndex={setCurrTopicIndex}
          setCreatingTopicFlag={setCreatingTopicFlag}
          setTopicDraft={setTopicDraft}
        />
      )}

      {/* Present for both DragMode and !DragMode, but often hidden */}
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
          recdLog={recdLog}
        />
      )}

      {showTopicModal && (
        <TopicModal
          showTopicModal={showTopicModal}
          setShowTopicModal={setShowTopicModal}
          topicsDataArray={topicsDataArray}
          setTopicsDataArray={setTopicsDataArray}
          currTopicIndex={currTopicIndex} //C: currTopicIndex points to the element in the topics array that we're interested in
          setCurrTopicIndex={setCurrTopicIndex}
          topicDraft={topicDraft}
          setTopicDraft={setTopicDraft}
          creatingTopicFlag={creatingTopicFlag}
          recdLog={recdLog}
        />
      )}

      {dragMode && <div>Drag items to desired positions</div>}

      <div>
        <Button
          variant="outline-danger"
          onClick={() => {
            removeAllPosts();
            setPostingsDataArray([emptyPost]);
          }}>
          Remove All Posts
        </Button>

        <Button
          variant="outline-danger"
          onClick={() => {
            removeAllTopics();
            setTopicsDataArray([emptyTopic]);
          }}>
          Remove All Topics
        </Button>

        <Button
          variant="outline-danger"
          onClick={() => {
            unlockAll(postingsDataArray, topicsDataArray);
          }}>
          Unlock All
        </Button>

      </div>
    </div>
  );
};

export default AlphaComponent;
