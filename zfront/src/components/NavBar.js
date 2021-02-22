import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import WelcomeModal from "./WelcomeModal";
import onClickFindByTitle from "../functions/onClickFindByTitle";
import onClickFindByTags from "../functions/onClickFindByTag";
import onClickFindByName from "../functions/onClickFindByName";

const NavBar = (props) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchTerm, setSearchTerm] = useState("Search by Title ");

  const emptyPost = props.emptyPost;
  let showWelcomeModal = props.showWelcomeModal;
  const setShowWelcomeModal = props.setShowWelcomeModal;
  const setShowMainModal = props.setShowMainModal;
  let postingsDataArray = props.postingsDataArray;
  const setPostingsDataArray = props.setPostingsDataArray;
  const setCurrPostIndex = props.setCurrPostIndex;
  const setCreatingPostFlag = props.setCreatingPostFlag;
  const setPostDraft = props.setPostDraft;

  const emptyTopic = props.emptyTopic;
  const setShowTopicModal = props.setShowTopicModal;
  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex= props.setCurrTopicIndex;
  const setCreatingTopicFlag= props.setCreatingTopicFlag;
  const setTopicDraft= props.setTopicDraft;
  // const recdLog=props.recdLog;
  

  const handleSelect = (event) => {
    console.log(event);
    setSearchTerm(event);
  };

  
  return (
    <>
      <nav className="w-full h-20 flex items-center text-blue-200 bg-blue-900 fixed z-50">
        <div className="flex flex-row items-baseline">
          <div className="p-2 text-2xl mx-4  hover:text-blue-400" onClick={() => setShowWelcomeModal(true)}>
            EvolveU Tips and Resources
          </div>
          <WelcomeModal show={showWelcomeModal} onHide={() => setShowWelcomeModal(false)} animation={false} />

          {/* 'Create Post' link */}
          <div
            className="ml-8 p-2 hover:text-blue-400"
            onClick={() => {
              console.log("NavBar.js 'Create Post' Clicked. So creatingPostFlag=true");
              setCreatingPostFlag(true);
              setPostDraft(emptyPost);
              setCurrPostIndex(() => {
                const newCurrPostIndex = postingsDataArray.length; // No need for .length-1 cos we just added an element
                console.log("NavBar.js CreatePost: newCurrPostIndex=", newCurrPostIndex);
                return newCurrPostIndex;
              });
              setShowMainModal(true);
            }}>
            Create Post
          </div>


          {/* 'Create Topic' link */}
          <div
            className="ml-4 p-2 hover:text-blue-400"
            onClick={() => {
              console.log("NavBar.js 'Create Topic' Clicked. So creatingTopicFlag=true");
              setCreatingTopicFlag(true);
              setTopicDraft(emptyTopic);
              setCurrTopicIndex(() => {
                const newCurrTopicIndex = topicsDataArray.length; // No need for .length-1 cos we just added an element
                console.log("NavBar.js CreateTopic: newCurrTopicIndex=", newCurrTopicIndex);
                return newCurrTopicIndex;
              });
              setShowTopicModal(true);
            }}>
            Create Topic
          </div>


          <DropdownButton
            id="dropdown-variants-outline-primary" // Make this dropdown smaller. See Sizing:
            // https://react-bootstrap.netlify.app/components/dropdowns/#sizing
            title={searchTerm}
            onSelect={handleSelect}
            className="ml-12 mb-1"
          >
            <Dropdown.Item eventKey="Search by Title ">Search by Title</Dropdown.Item>
            <Dropdown.Item eventKey="Search by Tag ">Search by Tag</Dropdown.Item>
            <Dropdown.Item eventKey="Search by Contributor ">Search by Contributor</Dropdown.Item>
          </DropdownButton>

          {/* Search by Title */}
          {searchTerm === "Search by Title " && (   // string must exactly match eventKey above
            <div className="mx-4  flex flex-row">
              <input
                type="text"
                className="w-48 p-1 text-gray-800 bg-gray-100 rounded-lg"
                placeholder="Enter Title"
                value={searchTitle}
                onChange={(event) => setSearchTitle(event.target.value)}
              >
              </input>
              <button
                className="ml-3 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
                onClick={() => onClickFindByTitle(searchTitle, setPostingsDataArray)}>
                Search
              </button>
            </div>
          )}

          {/* Search by Tag */}
          {searchTerm === "Search by Tag " && (
            <div className="mx-4  flex flex-row">
              <input
                type="text"
                className="w-48 p-1 text-gray-800 bg-gray-100 rounded-lg"
                placeholder="Enter Tag"
                value={searchTags}
                onChange={(event) => setSearchTags(event.target.value)}
              >
              </input>
              <button
                className="ml-3 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
                onClick={() => onClickFindByTags(searchTags, setPostingsDataArray)}>
                Search
              </button>
            </div>
          )}

          {/* Search by Contributor Name */}
          {searchTerm === "Search by Contributor " && (
            <div className="mx-4  flex flex-row">
              <input
                type="text"
                className="w-48 p-1 text-gray-800 bg-gray-100 rounded-lg"
                placeholder="Enter Name"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
              >
              </input>
              <button
                className="ml-3 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
                onClick={() => onClickFindByName(searchName, setPostingsDataArray)}>
                Search
              </button>
            </div>
          )}

          <button
            className="px-2 py-1 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600"
            onClick={() => {
              setSearchTitle("");
              onClickFindByTitle(searchTitle, setPostingsDataArray);
              setSearchTags("");
              onClickFindByTags(searchTags, setPostingsDataArray);
              setSearchName("");
              onClickFindByName(searchName, setPostingsDataArray);
            }}>
            Clear Search
          </button>


        </div>
      </nav>
    </>
  );
};

export default NavBar;
