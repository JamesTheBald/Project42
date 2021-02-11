import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Navbar from "./Navbar";
import MainModal from "./MainModal";
import RenderStubs from "./RenderStubs";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";

// import HomeButtonProvider from "./HomeButtonProvider";


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

      {showMainModal && 
        <MainModal 
          showMainModal = {showMainModal}
          setShowMainModal = {setShowMainModal}
          postingsDataArray = {postingsDataArray}
          setPostingsDataArray = {setPostingsDataArray}
          currPostIndex = {currPostIndex}   //C: currPostIndex points to the element in the postings array that we're interested in
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
        </Button>
    </>
  );
};

export default PostingsList;
