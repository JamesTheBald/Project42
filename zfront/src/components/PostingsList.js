import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import MainModal from "./MainModal";
import WelcomeModal from "./WelcomeModal";
import RenderStubs from "./RenderStubs";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";
import onClickFindByTitle from "../functions/onClickFindByTitle";
// import appendEmptyPost from "../functions/appendEmptyPost";


const PostingsList = () => {
  const emptyPost = {
    title: "",
    contributors: "Click to edit post",
    description: "",
    tags: "",
    contentType: "",
    spiciness: 0,
    upvotes: 0,
  };

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showMainModal, setShowMainModal] = useState(false);
  const [postingsDataArray, setPostingsDataArray] = useState([emptyPost]);
  const [currPostIndex, setCurrPostIndex] = useState(0); 
  const [postBuffer, setPostBuffer] = useState(emptyPost);   // Really want this as an object, not an array
  const [showDates, setShowDates] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");


  console.log("PostingsList.js begins.");

  useEffect(() => {
    retrievePostings(setPostingsDataArray, emptyPost);  // This function should now never allow postingsDataArray to be null
  }, []);                                               // C: '[]' means useEffect will only run THE FIRST time the page renders


  const onChangeSearchTitle = (evnt) => {
    setSearchTitle(evnt.target.value);
    console.log("onChangeSearchTitle(): setSearchTitle to:", evnt.target.value);
  };


  return (
    <div>
      {/* Navbar */}
      <nav className="w-full h-20 flex items-center text-blue-200 bg-blue-900">
        <div className="flex flex-row items-baseline">
          
          <div className="p-2 text-2xl mx-4  hover:text-blue-400" onClick={() => setShowWelcomeModal(true)}>
            Helpful Postings
          </div>
          <WelcomeModal show={showWelcomeModal} onHide={() => setShowWelcomeModal(false)} animation={false} />

          {/* 'CreatePost' link */}
          <div
            className="mx-4 hover:text-blue-400"
            onClick={() => {
              setShowDates(false);
              setPostBuffer(emptyPost);
              setCurrPostIndex( () => {
                const newCurrPostIndex = postingsDataArray.length-1;
                console.log("PostingsList.js CreatePost onClick: newCurrPostIndex=",newCurrPostIndex);
                return newCurrPostIndex
              });
              setShowMainModal(true);
            }}>
            Create Post
          </div>

          {/* Search bar */}
          <div className="flex flex-row mx-4">
            <input
              type="text"
              className="w-100 p-1 text-gray-800 bg-gray-100 rounded-lg"
              placeholder=" Search by Title"
              value={searchTitle}
              onChange={onChangeSearchTitle}></input>
            <button
              className="ml-2 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
              onClick={onClickFindByTitle}>
              Search
            </button>
          </div>
        </div>
      </nav>

      <RenderStubs
        postingsDataArray = {postingsDataArray}
        setCurrPostIndex = {setCurrPostIndex}
        setShowMainModal = {setShowMainModal}
        setPostBuffer = {setPostBuffer}
        setShowDates = {setShowDates}
        // setCreatingNewPst = {setCreatingNewPost}
      />

      <MainModal
        showMainModal = {showMainModal}
        setShowMainModal = {setShowMainModal}
        postingsDataArray = {postingsDataArray}
        setPostingsDataArray = {setPostingsDataArray}
        currPostIndex = {currPostIndex}   //C: currPostIndex points to the element in the postings array that we're interested in
        setCurrPostIndex = {setCurrPostIndex}
        postBuffer = {postBuffer}
        setPostBuffer = {setPostBuffer}
        showDates = {showDates}
        emptyPost = {emptyPost}

        // creatingNewPst = {creatingNewPost}
      />

      <Button variant="outline-danger" onClick={() => {
        removeAllPostings;
        setPostingsDataArray([emptyPost]);
      }
      }>
        {/* Refreshes postingsDataArray */}
        [Dev Only] Remove All
      </Button>
    </div>
  );
};

export default PostingsList;
