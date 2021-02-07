import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import MainModal from "./MainModal";
import WelcomeModal from "./WelcomeModal";
import RenderStubs from "./RenderStubs";
import retrievePostings from "../functions/retrievePostings";
import removeAllPostings from "../functions/removeAllPostings";
import onClickFindByTitle from "../functions/onClickFindByTitle";
import onClickFindByTags from "../functions/onClickFindByTag";
import onClickFindByName from "../functions/onClickFindByName";


const emptyPost = {
  title: "",
  contributors: "",
  description: "",
  tags: "",
  contentType: "",
  spiciness: "",
  upvotes: 0,
};

const PostingsList = () => {

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showMainModal, setShowMainModal] = useState(false);
  const [postingsDataArray, setPostingsDataArray] = useState();
  const [currPostIndex, setCurrPostIndex] = useState(0); 
  const [postDraft, setPostDraft] = useState(emptyPost);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [searchName, setSearchName] = useState("");
  const [creatingPostFlag, setCreatingPostFlag] = useState(false);
  const [voteCount, setVoteCount] = useState(0);


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

  const handleChangeSearchTags = (evnt) => {
    setSearchTags(evnt.target.value);
    console.log("onChangeSearchs(): setSearchTags to:", evnt.target.value);
  };

  const handleChangeSearchName = (evnt) => {
    setSearchName(evnt.target.value);
    console.log("onChangeSearchTitle(): setSearchName to:", evnt.target.value);
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

              console.log("PostingsList.js 'Create Post' Clicked. So creatingPostFlag=true");
              setCreatingPostFlag(true);
              setPostDraft(emptyPost);
              setCurrPostIndex( () => {
                const newCurrPostIndex = postingsDataArray.length;    // No need for .length-1 cos we just added an element
                console.log("PostingsList.js CreatePost: newCurrPostIndex=",newCurrPostIndex);
                return newCurrPostIndex
              });
              setShowMainModal(true);
            }}>
            Create Post
          </div>

          {/* Search by Title */}
          <div className="flex flex-row mx-4">
            <input
              type="text"
              className="w-100 p-1 text-gray-800 bg-gray-100 rounded-lg"
              placeholder="Enter Title"
              value={searchTitle}
              onChange={handleChangeSearchTitle}></input>
            <button
              className="ml-2 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
              onClick={ () => onClickFindByTitle(searchTitle, setPostingsDataArray)}>
              Search by Title
            </button>
          </div>


          {/* Search by Tag */}
          <div className="flex flex-row mx-4">
            <input
              type="text"
              className="w-100 p-1 text-gray-800 bg-gray-100 rounded-lg"
              placeholder="Enter Tag"
              value={searchTags}
              onChange={handleChangeSearchTags}></input>
            <button
              className="ml-2 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
              onClick={ () => onClickFindByTags(searchTags, setPostingsDataArray)}>
              Search by Tag
            </button>
          </div>


          {/* Search by Name */}
          <div className="flex flex-row mx-4">
            <input
              type="text"
              className="w-100 p-1 text-gray-800 bg-gray-100 rounded-lg"
              placeholder="Enter Name"
              value={searchName}
              onChange={handleChangeSearchName}></input>
            <button
              className="ml-2 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
              onClick={ () => onClickFindByName(searchName, setPostingsDataArray)}>
              Search by Name
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
        voteCount = {voteCount}
        setVoteCount = {setVoteCount}
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
