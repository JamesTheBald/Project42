import React from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";

import ZoomSpeedSlider from "./ZoomSpeedSlider";


const NavBarToolMenu = (props) => {

  const createPost = props.createPost;
  const createTopic = props.createTopic;
  const setZoomScale = props.setZoomScale;
  const zoomIn = props.zoomIn;
  const zoomOut = props.zoomOut;
  const resetZoom = props.resetZoom;
  let zoomSpeed = props.zoomSpeed
  const setZoomSpeed = props.setZoomSpeed
  const minZoomSpeed = props.minZoomSpeed
  const maxZoomSpeed = props.maxZoomSpeed


  return (
    <>

      <Dropdown>
        <Dropdown.Toggle
          title="Create Post/Topic "
          className="mr-1 text-xs xl:text-sm text-gray-800 bg-gray-200 border-gray-700 rounded-lg shadow-sm
                  hover:bg-gray-400 transition duration-300">
          Create Post/Topic
        </Dropdown.Toggle>
        <DropdownMenu>
          <Dropdown.Item onSelect={() => createPost()}>Create Post</Dropdown.Item>
          <Dropdown.Item onSelect={() => createTopic()}>Create Topic</Dropdown.Item>
        </DropdownMenu>
      </Dropdown>

      <div className="flex flex-row">
        <button className="xl:ml-12 px-2 stdButton" onClick={() => setZoomScale(() => zoomIn())}>+</button>
        <button className="ml-2 px-2 stdButton" onClick={() => setZoomScale(() => zoomOut())}>−</button>
        <button className="ml-2 stdButton" onClick={() => resetZoom()}>Zoom Reset</button>
      </div>

      <div className="xl:ml-12  flex flex-col items-center">
        <div className="text-xs text-gray-800">Zoom Speed</div>
        <ZoomSpeedSlider
          zoomSpeed={zoomSpeed}
          setZoomSpeed={setZoomSpeed}
          minZoomSpeed={minZoomSpeed}
          maxZoomSpeed={maxZoomSpeed}
        />
      </div>

    </>
  )
}

export default NavBarToolMenu
