import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { FaBars } from "react-icons/fa";

import WelcomeModal from "./WelcomeModal";
import onClickFindByTitle from "../functions/onClickFindByTitle";
import onClickFindByTags from "../functions/onClickFindByTag";
import onClickFindByName from "../functions/onClickFindByName";
import NavBarToolMenu from "./NavBarToolMenu";

const NavBar = (props) => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchTerm, setSearchTerm] = useState("Title ");

  const emptyPost = props.emptyPost;
  const setShowMainModal = props.setShowMainModal;
  let postingsDataArray = props.postingsDataArray;
  const setPostingsDataArray = props.setPostingsDataArray;
  const setCurrPostIndex = props.setCurrPostIndex;
  const setCreatingPostFlag = props.setCreatingPostFlag;
  const setPostDraft = props.setPostDraft;

  const emptyTopic = props.emptyTopic;
  const setShowTopicModal = props.setShowTopicModal;
  let topicsDataArray = props.topicsDataArray;
  const setCurrTopicIndex = props.setCurrTopicIndex;
  const setCreatingTopicFlag = props.setCreatingTopicFlag;
  const setTopicDraft = props.setTopicDraft;

  let minZoomScale = props.minZoomScale;
  const maxZoomScale = props.maxZoomScale;
  let zoomScale = props.zoomScale;
  let setZoomScale = props.setZoomScale;
  const resetZoom = props.resetZoom;
  let zoomSpeed = props.zoomSpeed;
  const setZoomSpeed = props.setZoomSpeed;
  const minZoomSpeed = props.minZoomSpeed;
  const maxZoomSpeed = props.maxZoomSpeed;
  const displayWidth = props.displayWidth;
  let showToolMenu = props.showToolMenu;
  const setShowToolMenu = props.setShowToolMenu;
    // const recdLog=props.recdLog;

  // const handleSelect = (event) => {
  //   console.log("NavBar.js handleSelect event=",event);
  //   setSearchTerm(event);
  // };

  const zoomIn = () => {
    setZoomScale((currZoomScale) => {
      const newZoomScale = currZoomScale * (1 + zoomSpeed / 400);
      if (newZoomScale < maxZoomScale) {
        return newZoomScale;
      } else {
        return maxZoomScale;
      }
    });
  };

  const zoomOut = () => {
    setZoomScale((currZoomScale) => {
      const newZoomScale = currZoomScale / (1 + zoomSpeed / 400);
      if (newZoomScale > minZoomScale) {
        return newZoomScale;
      } else {
        return minZoomScale;
      }
    });
  };

  const createPost = () => {
    console.log("NavBar.js 'Create Post' Clicked. So creatingPostFlag=true");
    setCreatingPostFlag(true);
    setPostDraft(emptyPost);
    setCurrPostIndex(() => {
      const newCurrPostIndex = postingsDataArray.length; // No need for .length-1 cos we just added an element
      console.log("NavBar.js CreatePost: newCurrPostIndex=", newCurrPostIndex);
      return newCurrPostIndex;
    });
    setShowMainModal(true);
  };

  const createTopic = () => {
    console.log("NavBar.js 'Create Topic' Clicked. So creatingTopicFlag=true");
    setCreatingTopicFlag(true);
    setTopicDraft(emptyTopic);
    setCurrTopicIndex(() => {
      const newCurrTopicIndex = topicsDataArray.length; // No need for .length-1 cos we just added an element
      console.log("NavBar.js CreateTopic: newCurrTopicIndex=", newCurrTopicIndex);
      return newCurrTopicIndex;
    });
    setShowTopicModal(true);
  };
  
  
  const toggleToolMenu = () => { showToolMenu ? setShowToolMenu(false) : setShowToolMenu(true) };



  return (
    <>
      <nav className="h-20  w-full flex flex-row items-center bg-gray-50 shadow-md relative z-50">
        
        <div
          className="p-2 text-2xl xl:text-3xl ml-8 font-roundy font-700 text-indigo-800 hover:text-indigo-500"
          // style={{textShadow: "0.8px 0.8px 1.5px #aaaaaa"}}
          onClick={() => {
            console.log("Title clicked on");
            setShowWelcomeModal(true)}
          }
        >
          SwarmShare
        </div>
        <WelcomeModal showWelcomeModal={showWelcomeModal} onHide={() => setShowWelcomeModal(false)} />

        <Dropdown>
          <Dropdown.Toggle
            title={searchTerm}
            className="ml-12 xl:ml-20 mr-1 text-sm px-1.5 xl:px-3  py-0.5 xl:py-1 
            text-gray-800 bg-gray-200 border border-gray-600  rounded-lg shadow-sm outline-none
            hover:bg-indigo-100 transition duration-300"
          >
            {searchTerm}

          </Dropdown.Toggle>
          <DropdownMenu
            className=""
          >
            <Dropdown.Item onSelect={() => setSearchTerm("Title ")}>Search by Title</Dropdown.Item>
            <Dropdown.Item onSelect={() => setSearchTerm("Tag ")}>Search by Tag</Dropdown.Item>
            <Dropdown.Item onSelect={() => setSearchTerm("Contributor ")}>Search by Contributor</Dropdown.Item>
          </DropdownMenu>
        </Dropdown>

        {/* Yes, this next section is quite 'WET'. Expediencies! */}
        {/* Search by Title  */}
        {searchTerm === "Title " && ( // string must exactly match eventKey above
          <div className="flex flex-row">
            <input
              type="text"
              className="searchTextInput"
              placeholder="Enter Title Keyword"
              value={searchTitle}
              onChange={(event) => setSearchTitle(event.target.value)}
            />
            <button
              className="ml-2 py-1 stdButton"
              onClick={() => onClickFindByTitle(searchTitle, setPostingsDataArray)}
            >
              Search
            </button>
          </div>
        )}

        {/* Search by Tag */}
        {searchTerm === "Tag " && (
          <div className="flex flex-row">
            <input
              type="text"
              className="searchTextInput"
              placeholder="Enter Tag"
              value={searchTags}
              onChange={(event) => setSearchTags(event.target.value)}
            />
            <button
              className="ml-2 stdButton"
              onClick={() => onClickFindByTags(searchTags, setPostingsDataArray)}
            >
              Search
            </button>
          </div>
        )}

        {/* Search by Contributor Name */}
        {searchTerm === "Contributor " && (
          <div className="flex flex-row">
            <input
              type="text"
              className="searchTextInput"
              placeholder="Enter Name"
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
            />
            <button
              className="ml-2 stdButton"
              onClick={() => onClickFindByName(searchName, setPostingsDataArray)}
            >
              Search
            </button>
          </div>
        )}

        <button
          className="stdButton ml-2"
          onClick={() => {
            setSearchTitle("");
            onClickFindByTitle(searchTitle, setPostingsDataArray);
            setSearchTags("");
            onClickFindByTags(searchTags, setPostingsDataArray);
            setSearchName("");
            onClickFindByName(searchName, setPostingsDataArray);
          }}
        >
          Clear
        </button>


        {/* Tools on NavBar */}
        <div className="inline xl:hidden absolute"
          style={{left: `${window.innerWidth-75}px`}}
        >   {/* <!-- 'Hamburger' Icon --> */}
          <a onClick={ () => toggleToolMenu() }>
            <FaBars size="28" className="text-indigo-800"/> 
          </a>
        </div>

        { displayWidth >=1300 ?
          <div className="p-2  w-110  flex flex-row justify-between items-center">
            <NavBarToolMenu 
              createPost = {createPost}
              createTopic = {createTopic}
              zoomScale = {zoomScale}
              setZoomScale = {setZoomScale}
              zoomIn = {zoomIn}
              zoomOut = {zoomOut}
              resetZoom = {resetZoom}
              zoomSpeed = {zoomSpeed}
              setZoomSpeed = {setZoomSpeed}
              minZoomSpeed = {minZoomSpeed}
              maxZoomSpeed = {maxZoomSpeed}
            />
          </div>
          :
          showToolMenu &&
          // Small-screen, collapsed toolbar
          <div className="p-3 h-48 flex flex-col justify-between items-center  
                        bg-gray-100  border-gray-700 rounded-xl  absolute" 
            style={{left: `${window.innerWidth-215}px`, top: 85+"px"}}

          >
            <NavBarToolMenu 
              createPost = {createPost}
              createTopic = {createTopic}
              zoomScale = {zoomScale}
              setZoomScale = {setZoomScale}
              zoomIn = {zoomIn}
              zoomOut = {zoomOut}
              resetZoom = {resetZoom}
              zoomSpeed = {zoomSpeed}
              setZoomSpeed = {setZoomSpeed}
              minZoomSpeed = {minZoomSpeed}
              maxZoomSpeed = {maxZoomSpeed}
            />
          </div>
        }

      </nav>
    </>
  );
};

export default NavBar;
