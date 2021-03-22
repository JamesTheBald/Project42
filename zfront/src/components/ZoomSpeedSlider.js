// by jpmarks in https://stackoverflow.com/questions/62725470/creat-range-slider-in-react-js
import React from "react";

const ZoomSpeedSlider = (props) => {
  
  let zoomSpeed = props.zoomSpeed;
  const setZoomSpeed = props.setZoomSpeed;
  const minZoomSpeed = props.minZoomSpeed;
  const maxZoomSpeed = props.maxZoomSpeed;
  
  return (
    <div>
      <input
        // Formatting is in rangeSlider.css
        className="slider"
        min={minZoomSpeed} 
        max={maxZoomSpeed}
        type="range"
        value={zoomSpeed}
        id="myRange"
        onChange={(event) => setZoomSpeed(event.target.value)}
      />
    </div>
  );
};
export default ZoomSpeedSlider;