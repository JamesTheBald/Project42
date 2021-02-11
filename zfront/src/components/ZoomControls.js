import React from "react";

const ZoomControls = (props) => {
    // let positionX = props.positionX;
  // let positionY = props.positionY;
  let scale = props.scale;
  const zoomIn = props.zoomIn;
  const zoomOut = props.zoomOut;
  const setTransform = props.setTransform;

  return (
    <div>
      <nav className="flex flex-row">
        {/* <div className="controls"> x: {positionX}, y: {positionY} </div> */}
        <div className="controls">Scale: {scale} </div>
        <button className="controls" onClick={zoomIn}>
          {" "}
          {/* zoomIn is a callback fn passed down from TransformWrapper */}+
        </button>
        <button className="controls" onClick={zoomOut}>
          -
        </button>
        <button className="controls" onClick={() => setTransform(0, 0, 0.5, 200, "easeOut")}>
          Reset
        </button>{" "}
        {/* setTransform arguments: (positionX, positionY, scale, animationTime, animationType) */}
      </nav>
    </div>
  );
};

export default ZoomControls;
