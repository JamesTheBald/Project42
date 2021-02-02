import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import MainModal from "./MainModal";
import WelcomeModal from "./WelcomeModal";
import RenderStubs from "./RenderStubs";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";
import onClickFindByTitle from "../functions/onClickFindByTitle";

const PostingsList = () => {
  const emptyPost = {
    _id: 0, //J: _id was null
    title: "",
    contributors: "",
    description: "",
    tags: "",
    contentType: "",
    spiciness: 0,
    upvotes: 0,
  };

  const [postingsDataArray, setPostingsDataArray] = useState([emptyPost]);
  // const [currPostIndex, setCurrPostIndex] = useState(0); 
  // currPostIndex doesn't need to be a state var as it doesn't change once MainModal is invoked.
  const [searchTitle, setSearchTitle] = useState("");
  const [showMainModal, setShowMainModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [creatingNewPost, setCreatingNewPost] = useState(false);   
   // creatingNewPost needs to be a state var as it controls display of 'Create Post' title and of creation date & modified date. 


  console.log("PostingsList.js begins. postingsDataArray=",postingsDataArray);    // Should be emptyPost

  let currPostIndex = 0;        //C: points to the element in the postings array that we're interested in
  const assignCurrPostIndex = (indx) => {     //J: Creating a callback function to pass to RenderStub.js. 
                                              //   See Tony's suggestion in React channel of Discord server
    currPostIndex = indx;
  }
    
  
  useEffect(() => {
    retrievePostings(setPostingsDataArray);
  }, []); // C: '[]' means useEffect will only run THE FIRST time the page renders

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

          {/* Create Post link */}
          <div
            className="mx-4 hover:text-blue-400"
            onClick={() => {
              setCreatingNewPost(true);
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
        postingsDataArr = {postingsDataArray}
        assignCurrPostIndex = {assignCurrPostIndex}
        setShowMainModl = {setShowMainModal}
        setCreatingNewPst = {setCreatingNewPost}   //J: Thinking this shouldn't be a state var
      />

      <MainModal
        emptyPst = {emptyPost}
        showMainModl = {showMainModal}
        setShowMainModl = {setShowMainModal}

        postingsDataArr = {postingsDataArray}
        setPostingsDataArr = {setPostingsDataArray}

        currPostIndex = {currPostIndex}

        creatingNewPst = {creatingNewPost}          //J: Thinking this shouldn't be a state var..?
        // setCreatingNewPst = {setCreatingNewPost}
      />

      <Button variant="outline-danger" onClick={() => removeAllPostings(setPostingsDataArray)}>
        {/* Refreshes postingsDataArray */}
        [Dev Only] Remove All
      </Button>
    </div>
  );
};

export default PostingsList;
