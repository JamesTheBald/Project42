import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import MainModal from "./MainModal";
import WelcomeModal from "./WelcomeModal";
import RenderStubs from "./RenderStubs";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";
import onClickFindByTitle from "../functions/onClickFindByTitle";
// import createPostOnDB from "../functions/createPostOnDB";
// import createPostOnDataArray from "../functions/createPostOnDataArray";
// import deletePostFromDB from "../functions/deletePostFromDB";
// import createPostOnDataArray from "../functions/createPostOnDataArray";
// import deletePostFromDataArray from "../functions/deletePostFromDataArray";


const emptyPost = {
  title: "",
  contributors: "",
  description: "",
  tags: "",
  contentType: "",
  spiciness: "Spiciness",
  upvotes: 0,
};

const PostingsList = () => {

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showMainModal, setShowMainModal] = useState(false);
  const [postingsDataArray, setPostingsDataArray] = useState();
  const [currPostIndex, setCurrPostIndex] = useState(0); 
  const [postDraft, setPostDraft] = useState(emptyPost);
  const [searchTitle, setSearchTitle] = useState("");
  const [creatingPostFlag, setCreatingPostFlag] = useState(false);


  console.log("PostingsList.js begins: creatingPostFlag=", creatingPostFlag);

  // Retrive the data from DB into postingsDataArray, so postingsDataArray is never null
  if (!postingsDataArray) {
    console.log("postingsDataArray is falsy so retrieving the data from the DB. And in the interim setting it to [emptyPost]")
    setPostingsDataArray([emptyPost]);
    retrievePostings(setPostingsDataArray, emptyPost); 
  }


  const handleChangeSearchTitle = (evnt) => {
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
              // setShowDates(false);

              // Add an empty post to the DB and postingsDataArray now, so its _id and dates are valid 
              // (so it can be edited or deleted from DB)
              console.log("PostingsList.js 'Create Post' Clicked. So creatingPostFlag=true");
              setCreatingPostFlag(true);
              setPostDraft(emptyPost);
              setCurrPostIndex( () => {
                const newCurrPostIndex = postingsDataArray.length;    // was .length-1
                console.log("PostingsList.js CreatePost: newCurrPostIndex=",newCurrPostIndex);
                return newCurrPostIndex
              });
              // console.log("PostingsList.js CreatePost: creatingPostFlag=", creatingPostFlag);
              setShowMainModal(true);
            }}>
            Create Post
          </div>

          {/* Search bar */}
          <div className="flex flex-row mx-4">
            <input
              type="text"
              className="w-100 p-1 text-gray-800 bg-gray-100 rounded-lg"
              placeholder="Search by Title"
              value={searchTitle}
              onChange={handleChangeSearchTitle}></input>
            <button
              className="ml-2 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
              onClick={ () => onClickFindByTitle(searchTitle, setPostingsDataArray)}>
              Search
            </button>
          </div>
        </div>
      </nav>

      <RenderStubs
        postingsDataArray = {postingsDataArray}
        setCurrPostIndex = {setCurrPostIndex}
        setShowMainModal = {setShowMainModal}
        setPostDraft = {setPostDraft}
        setCreatingPostFlag = {setCreatingPostFlag}
      />


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
      />


      <Button variant="outline-danger" onClick={() => {
        removeAllPostings();
        setPostingsDataArray([emptyPost]);
      }}>
        [Dev Only] Remove All
      </Button>
    </div>
  );
};

export default PostingsList;
