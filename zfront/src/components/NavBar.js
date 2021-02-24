import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import WelcomeModal from "./WelcomeModal";
import ZoomSpeedSlider from "./ZoomSpeedSlider";
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
  const resetZoom= props.resetZoom;
  let zoomScale = props.zoomScale;
  let setZoomScale = props.setZoomScale;
  let zoomSpeed = props.zoomSpeed;
  const setZoomSpeed = props.setZoomSpeed;
  // const recdLog=props.recdLog;
  

  const handleSelect = (event) => {
    console.log(event);
    setSearchTerm(event);
  };


  return (
    <>
      <nav className="w-full h-20 z-50 flex items-center text-blue-800 bg-gray-300 border-b border-gray-500 shadow-md relative"
          // style={{ zIndex: 999}}
          // backgroundColor: "#28436e"
      >
        <div className="flex flex-row items-baseline z-50 relative">

          <div className="p-2 text-2xl mx-4  hover:text-blue-400" onClick={() => setShowWelcomeModal(true)}>
            Project 42
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
                                                            {/* Yes, this next section is quite 'WET'. Oops! */}
          {/* Search by Title */} 
          {searchTerm === "Search by Title " && (   // string must exactly match eventKey above
            <div className="mx-4  flex flex-row">
              <input
                type="text"
                className="w-48 p-1 text-gray-800 bg-gray-100 rounded"
                placeholder="Enter Title"
                value={searchTitle}
                onChange={(event) => setSearchTitle(event.target.value)}
              >
              </input>
              <button
                className="ml-3 stdButton"
                             // px-3 py-1 text-gray-800 bg-gray-400 border border-gray-800 rounded shadow-sm
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
                className="w-48 p-1 text-gray-800 bg-gray-100 rounded"
                placeholder="Enter Tag"
                value={searchTags}
                onChange={(event) => setSearchTags(event.target.value)}
              >
              </input>
              <button
                className="ml-3 stdButton"
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
                className="w-48 p-1 text-gray-800 bg-gray-100 rounded"
                placeholder="Enter Name"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
              >
              </input>
              <button
                className="ml-3 stdButton"
                onClick={() => onClickFindByName(searchName, setPostingsDataArray)}>
                Search
              </button>
            </div>
          )}

          <button
            className="stdButton"
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


          <button
            className="ml-16 px-3 py-1 text-gray-800 bg-yellow-200 rounded  hover:text-blue-600 "
            onClick={() => setZoomScale( (currZoomScale) => setZoomScale(currZoomScale * (1 + zoomSpeed/400) ))}>
            +
          </button>

          <button
            className="ml-4 px-3 py-1 text-gray-800 bg-yellow-200 rounded  hover:text-blue-600 "
            onClick={() => setZoomScale( (currZoomScale) => setZoomScale(currZoomScale * (1 - zoomSpeed/400) ))}>
            -
          </button>

          <button
            className="ml-4 px-2 py-1 text-gray-800 bg-yellow-200 rounded  hover:text-blue-600 "
            onClick={() => resetZoom() }>
            Reset Zoom
          </button>

          <div className="flex items-center">

            <div className="ml-10 mr-4">Zoom Speed:</div>
            <div className="pt-1">
              <ZoomSpeedSlider 
                zoomSpeed={zoomSpeed} 
                setZoomSpeed={setZoomSpeed} 
              />
            </div>

            <div>Zoom={zoomScale}</div>

          </div>



        </div>
      </nav>
    </>
  );
};

export default NavBar;
