// by jpmarks in https://stackoverflow.com/questions/62725470/creat-range-slider-in-react-js
import React from "react";

const ZoomSpeedSlider = (props) => {
  
  let zoomSpeed = props.zoomSpeed;
  const setZoomSpeed = props.setZoomSpeed;
  
  return (
    <div>
      <input
        style={{
        height: "25px",
        color: "#d34444"
      }}
        min={40} 
        max={500}
        type="range"
        value={zoomSpeed}
        id="myRange"
        onChange={(event) => setZoomSpeed(event.target.value)}
      />
    </div>
  );
};
export default ZoomSpeedSlider;