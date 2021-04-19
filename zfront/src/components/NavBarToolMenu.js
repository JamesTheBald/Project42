import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { AiOutlineCaretDown } from "react-icons/ai";

import ZoomSpeedSlider from "./ZoomSpeedSlider";

const NavBarToolMenu = (props) => {
  const createPost = props.createPost;
  const createTopic = props.createTopic;
  // const zoomScale = props.zoomScale;
  const setZoomScale = props.setZoomScale;
  const zoomIn = props.zoomIn;
  const zoomOut = props.zoomOut;
  const resetZoom = props.resetZoom;
  let zoomSpeed = props.zoomSpeed;
  const setZoomSpeed = props.setZoomSpeed;
  const minZoomSpeed = props.minZoomSpeed;
  const maxZoomSpeed = props.maxZoomSpeed;

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          title="Create Post/Topic "
          className="xl:ml-18 -mr-4 xl:-mr-7 invisible flex flex-row items-center"
        >
          <div className="stdButton flex flex-row items-center visible">
            <button className="">
              Create Post/Topic 
            </button>
            <AiOutlineCaretDown size="14" className="ml-1 text-gray-800 visible"/>
          </div>

        </Dropdown.Toggle>
        <DropdownMenu>
          <Dropdown.Item onSelect={() => createPost()}>Create Post</Dropdown.Item>
          <Dropdown.Item onSelect={() => createTopic()}>Create Topic</Dropdown.Item>
        </DropdownMenu>
      </Dropdown>

      <div className="xl:ml-0.5  flex flex-row">
        <button className="ml-2 px-2 stdButton" onClick={() => setZoomScale(() => zoomIn())}>
          +
        </button>
        <button className="ml-2 px-2 stdButton" onClick={() => setZoomScale(() => zoomOut())}>
          −
        </button>
        <button className="ml-2.5 stdButton" onClick={() => resetZoom()}>
          Zoom Reset
        </button>
      </div>

      <div className="xl:ml-3  flex flex-col items-center">
        <div className="text-sm text-gray-800">Zoom Speed</div>
        <ZoomSpeedSlider
          zoomSpeed={zoomSpeed}
          setZoomSpeed={setZoomSpeed}
          minZoomSpeed={minZoomSpeed}
          maxZoomSpeed={maxZoomSpeed}
        />
      </div>

      {/* <div className="ml-10">
          Zoom Scale: {zoomScale}
      </div> */}
    </>
  );
};

export default NavBarToolMenu;
