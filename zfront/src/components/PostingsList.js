import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import MainModal from "./MainModal";
import WelcomeModal from "./WelcomeModal";
import RenderStubs from "./RenderStubs";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";
import onClickFindByTitle from "../functions/onClickFindByTitle";
import createPostOnDB from "../functions/createPostOnDB";
// import createPostOnDataArray from "../functions/createPostOnDataArray";
import deletePostFromDB from "../functions/deletePostFromDB";
// import deletePostFromDataArray from "../functions/deletePostFromDataArray";


const emptyPost = {
  title: "",
  contributors: "Click to edit post",
  description: "",
  tags: "",
  contentType: "",
  spiciness: "Spiciness",
  upvotes: 0,
  createdAt: 0, // Placeholder value!!
  updatedAt: 0 // Placeholder value!!
};

const PostingsList = () => {

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showMainModal, setShowMainModal] = useState(false);
  const [postingsDataArray, setPostingsDataArray] = useState();
  const [currPostIndex, setCurrPostIndex] = useState(0); 
  const [postBuffer, setPostBuffer] = useState(emptyPost);   // Really want this as an object, not an array
  // const [showDates, setShowDates] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  let creatingPostFlag = useRef(false);


  console.log("PostingsList.js begins.");
  console.log("PostingsList.js begins: creatingPostFlag=", creatingPostFlag);

  // useEffect(() => {
    if (!postingsDataArray) {
      console.log("postingsDataArray is falsy so retrieving the data from the DB. And in the interim setting it to [emptyPost]")
      setPostingsDataArray([emptyPost]);
      retrievePostings(setPostingsDataArray, emptyPost);  // This function should now never allow postingsDataArray to be null
    }
  // }, [postingsDataArray]);       // C: '[]' means useEffect will only run THE FIRST time the page renders


  const cleanUpAfterMainModal = () => {
    console.log("PostingsList.js cleanUpAfterMainModal: creatingPostFlag=",creatingPostFlag)

    if ((creatingPostFlag.current) && (currPostIndex < postingsDataArray.length) && (currPostIndex >=0)) {
      deletePostFromDB(postingsDataArray, currPostIndex);  // This deletes from DB & postingsDataArray
    }
    // retrievePostings(setPostingsDataArray, emptyPost);
        // The above line will refresh postingsDataArray, undoing the changes to postingsDataArray[currPostIndex]
    setCurrPostIndex(0);
    setShowMainModal(false);
  }


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
              // setShowDates(false);

              // Add an empty post to the DB and postingsDataArray now, so its _id and dates are valid 
              // (so it can be edited or deleted from DB)
              console.log("PostingsList.js 'Create Post' Clicked");
              creatingPostFlag.current = true;
              setPostBuffer(emptyPost);
              createPostOnDB(postBuffer);
              // createPostOnDataArray(setPostingsDataArray, postBuffer);  // keeps postingsDataArray up to date in period
                                                                        // before retrievePostings promise is fulfilled.
              // retrievePostings(setPostingsDataArray, emptyPost);    // async function, will return later
              setCurrPostIndex( () => {
                const newCurrPostIndex = postingsDataArray.length-1;
                console.log("PostingsList.js CreatePost onClick: newCurrPostIndex=",newCurrPostIndex);
                return newCurrPostIndex
              });
              console.log("PostingsList.js CreatePost onClick: creatingPostFlag=", creatingPostFlag);
              // Make function that resets emptyPost values
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
        // setShowDates = {setShowDates}
        creatingPostFlag = {creatingPostFlag}
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
        voteCount = {voteCount}
        setVoteCount = {setVoteCount}
        // showDates = {showDates}
        // emptyPost = {emptyPost}
        creatingPostFlag = {creatingPostFlag}
        cleanUpAfterMainModal = {cleanUpAfterMainModal}
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
