import React, { useState, useEffect, Component } from "react";
import Button from "react-bootstrap/Button";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Navbar from "./Navbar";
import MainModal from "./MainModal";
import RenderStubs from "./RenderStubs";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";

import ZoomControls from "./ZoomControls"
// import Stub from "./Stub.js";


const emptyPost = {
  title: "",
  contributors: "",
  content: "",
  tags: "",
  contentType: "",
  spiciness: "",
  upvotes: 0,
  // positionX: 0,
  // positionY: 0
};

// const stubArray = [
//   { title: "Git Merge tutorial", contributors: "Collin A, James M, Yemi O", fromTop: "78.5%", fromLeft: "19%" },
//   { title: "Git Introduction", contributors: "Granger, H", fromTop: "80%", fromLeft: "20%" },
//   { title: "Git is Sh*t", contributors: "Just Sayin", fromTop: "82%", fromLeft: "18%" },
//   { title: "VS Code Git Tools", contributors: "Smith, J", fromTop: "77%", fromLeft: "20.5%" },
//   { title: "Useful VS Code Extensions", contributors: "Murphy, J", fromTop: "73%", fromLeft: "22%" },
// ];


const PostingsList = () => {

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showMainModal, setShowMainModal] = useState(false);
  const [postingsDataArray, setPostingsDataArray] = useState();
  const [currPostIndex, setCurrPostIndex] = useState(0); 
  const [postDraft, setPostDraft] = useState(emptyPost);
  const [creatingPostFlag, setCreatingPostFlag] = useState(false);

  const [userVoted, setUserVoted] = useState(false);


  useEffect(() => {
    window.addEventListener('contextmenu', (evnt) => evnt.preventDefault(), false);
    return () => window.removeEventListener('contextmenu', (evnt) => evnt.preventDefault(), false);
  }, [])


  console.log("PostingsList.js begins: creatingPostFlag=", creatingPostFlag);
  console.log("PostingsList.js begins: postDraft=", postDraft);
  console.log("PostingsList.js begins: postingsDataArray=", postingsDataArray);


  // Retrive the data from DB into postingsDataArray, so postingsDataArray is never null
  if (!postingsDataArray) {
    console.log("postingsDataArray is falsy so retrieving the data from the DB. And in the interim setting it to [emptyPost]")
    setPostingsDataArray([emptyPost]);
    retrievePostings(setPostingsDataArray, emptyPost); 
  }

  class ZoomPan extends Component {
    render() {
      return (
        <>
          <TransformWrapper
            defaultScale={0.5}
            defaultPositionX={0}
            defaultPositionY={0}
            enablePadding={false}
            wheel={{
              step: 160,
            }}
            options={{        // See "Options prop elements" on https://www.npmjs.com/package/react-draggable
              minScale: 0.5,
              maxScale: 15,
              centerContent: false,
              limitToBounds: false,
            }}
          >

            {/* {({ scale, zoomIn, zoomOut, setTransform }) => {        // Also positionX, positionY
            
              <ZoomControls scale={scale} zoomIn={zoomIn} zoomOut={zoomOut} setTransform={setTransform} /> */}
                {/* ZoomControls need to be inside TransformWrapp. Also positionX = {positionX} positionY = {positionY} */}

              <TransformComponent>
                <>
                  {/* <div className="backdrop"></div> */}

                  <RenderStubs
                    postingsDataArray = {postingsDataArray}
                    currPostIndex = {currPostIndex}
                    setCurrPostIndex = {setCurrPostIndex}
                    showMainModal = {showMainModal}
                    setShowMainModal = {setShowMainModal}
                    postDraft = {postDraft}
                    setPostDraft = {setPostDraft}
                    setCreatingPostFlag = {setCreatingPostFlag}
                    userVoted = {userVoted}
                    setUserVoted = {setUserVoted}
                  />

                  {/* {showMainModal && 
                    <MainModal 
                      showMainModal = {showMainModal}
                      setShowMainModal = {setShowMainModal}
                      postingsDataArray = {postingsDataArray}
                      setPostingsDataArray = {setPostingsDataArray}
                      currPostIndex = {currPostIndex}   //C: currPostIndex points to the element in the postings array that we want
                      setCurrPostIndex = {setCurrPostIndex}
                      postDraft = {postDraft}
                      setPostDraft = {setPostDraft}
                      creatingPostFlag = {creatingPostFlag}
                      userVoted = {userVoted}
                      setUserVoted = {setUserVoted}
                    />
                  }

                  <Button 
                    variant="outline-danger"
                    onClick={() => {
                      removeAllPostings();
                      setPostingsDataArray([emptyPost]);
                    }}
                  >
                    [Dev Only] Remove All
                  </Button> */}

                  {/* {stubArray.map((stubData, index) => {
                    return (
                      <Stub
                        key={index}
                        title={stubData.title}
                        contributors={stubData.contributors}
                        fromTop={stubData.fromTop}
                        fromLeft={stubData.fromLeft}
                      />
                    );
                  })} */}

                </>
              </TransformComponent>
            {/* }} */}
          </TransformWrapper>


        </>
      );
    }
  }



  return (
    <>

      <Navbar
        emptyPost = {emptyPost}
        showWelcomeModal = {showWelcomeModal}
        setShowWelcomeModal = {setShowWelcomeModal}
        setShowMainModal = {setShowMainModal}
        postingsDataArray = {postingsDataArray}
        setPostingsDataArray = {setPostingsDataArray}
        setCurrPostIndex = {setCurrPostIndex}
        setCreatingPostFlag = {setCreatingPostFlag}
        setPostDraft = {setPostDraft}
      />

      <ZoomPan />

    </>
  );
};

export default PostingsList;
