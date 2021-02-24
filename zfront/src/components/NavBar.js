import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";

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
  const minZoomScale = props.minZoomScale;
  const maxZoomScale = props.maxZoomScale;
  let zoomScale = props.zoomScale;
  let setZoomScale = props.setZoomScale;
  let zoomSpeed = props.zoomSpeed;
  const setZoomSpeed = props.setZoomSpeed;
  // const recdLog=props.recdLog;
  

  // const handleSelect = (event) => {
  //   console.log("NavBar.js handleSelect event=",event);
  //   setSearchTerm(event);
  // };

  const zoomIn = () => {
    setZoomScale(currZoomScale => {
      const newZoomScale = currZoomScale * (1 + zoomSpeed/400);
      if (newZoomScale < maxZoomScale) {
        return newZoomScale
      } else {
        return maxZoomScale
      } 
    })
  }
  
  const zoomOut = () => {
    setZoomScale(currZoomScale => {
      const newZoomScale = currZoomScale / (1 + zoomSpeed/400);
      if (newZoomScale > minZoomScale) {
        return newZoomScale
      } else {
        return minZoomScale
      } 
    })
  }


  return (
    <>
      <nav className="w-full h-20 z-50 flex items-center text-blue-700 bg-gray-100 border-b border-gray-500 shadow-md relative">
        <div className="flex flex-row items-center z-50 relative">

          <div className="p-2 text-2xl mx-4 font-roundy font-700 hover:text-blue-400" onClick={() => setShowWelcomeModal(true)}>
            Project 42
          </div>
          <WelcomeModal show={showWelcomeModal} onHide={() => setShowWelcomeModal(false)} animation={false} />

          <div className="flex flex-row items-center pt-1">
            {/* 'Create Post' link */}
            <div
              className="ml-10 px-2 font-500 hover:text-blue-400"
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
              className="ml-5 px-2 font-500 hover:text-blue-400"
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

            <Dropdown>
              <Dropdown.Toggle
                // id="variants-outline-Primary"
                // id={`dropdown-variants-Secondary`}
                // style={{backgroundColor: "rgba(245, 245, 245)"}}
                title={searchTerm}
                // onClick={setSearchTerm()}
                className="ml-14 mr-1 text-sm text-gray-800 bg-gray-300 border-gray-700"
              >
                {searchTerm}
              </Dropdown.Toggle>
              <DropdownMenu>
                <Dropdown.Item onSelect={ () => setSearchTerm("Search by Title ")}>Search by Title</Dropdown.Item>
                <Dropdown.Item onSelect={ () => setSearchTerm("Search by Tag ")}>Search by Tag</Dropdown.Item>
                <Dropdown.Item onSelect={ () => setSearchTerm("Search by Contributor ")}>Search by Contributor</Dropdown.Item>
              </DropdownMenu>
            </Dropdown>


                                                              {/* Yes, this next section is quite 'WET'. Oops! */}
            {/* Search by Title */} 
            {searchTerm === "Search by Title " && (   // string must exactly match eventKey above
              <div className="mx-2  flex flex-row">
                <input
                  type="text"
                  className="searchTextInput"
                  placeholder="Enter Title"
                  value={searchTitle}
                  onChange={(event) => setSearchTitle(event.target.value)}
                >
                </input>
                <button
                  className="ml-2 stdButton bg-gray-300 hover:text-blue-600"
                  onClick={() => onClickFindByTitle(searchTitle, setPostingsDataArray)}>
                  Search
                </button>
              </div>
            )}

            {/* Search by Tag */}
            {searchTerm === "Search by Tag " && (
              <div className="mx-2  flex flex-row">
                <input
                  type="text"
                  className="searchTextInput"
                  placeholder="Enter Tag"
                  value={searchTags}
                  onChange={(event) => setSearchTags(event.target.value)}
                >
                </input>
                <button
                  className="ml-2 stdButton bg-gray-300 hover:text-blue-600"
                  onClick={() => onClickFindByTags(searchTags, setPostingsDataArray)}>
                  Search
                </button>
              </div>
            )}

            {/* Search by Contributor Name */}
            {searchTerm === "Search by Contributor " && (
              <div className="mx-2 flex flex-row">
                <input
                  type="text ml-3"
                  className="searchTextInput"
                  placeholder="Enter Name"
                  value={searchName}
                  onChange={(event) => setSearchName(event.target.value)}
                >
                </input>
                <button
                  className="ml-2 stdButton bg-gray-300 hover:text-blue-600"
                  onClick={() => onClickFindByName(searchName, setPostingsDataArray)}>
                  Search
                </button>
              </div>
            )}

            <button
              className="stdButton bg-gray-300 hover:text-blue-600"
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

            <div className="flex flexrow items-center pt-1">
              <button
                className="ml-14 stdButton py-0 bg-gray-100 hover:text-blue-600"
                onClick={() => setZoomScale( () => zoomIn() )}>
                +
              </button>

              <button
                className="ml-2 stdButton py-0 bg-gray-100 hover:text-blue-600"
                onClick={() => setZoomScale( () => zoomOut() )}>
                -
              </button>

              <button
                className="ml-2 stdButton bg-gray-300 py-0 hover:text-blue-600"
                onClick={() => resetZoom() }>
                Reset
              </button>

              <div className="flex items-center">

                <div className="ml-14 mr-2 font-500">Zoom Speed</div>

                <div className="pt-2">
                  <ZoomSpeedSlider 
                    zoomSpeed={zoomSpeed} 
                    setZoomSpeed={setZoomSpeed} 
                  />
                </div>
              </div>
            </div>
            {/* <div>Zoom={zoomScale}</div> */}

          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
