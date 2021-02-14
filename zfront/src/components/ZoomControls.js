import React from "react";

const ZoomControls = (props) => {
  let positionX = props.positionX;
  let positionY = props.positionY;
  let scale = props.scale;
  const zoomIn = props.zoomIn;
  const zoomOut = props.zoomOut;
  const setTransform = props.setTransform;

  return (
    <div>
      <nav className="flex flex-row">
        <div className="controls">Scale: {scale} </div>

        <div className="controls">x: {positionX}, y: {positionY} </div>

        {/* zoomIn is a callback fn passed down from TransformWrapper */}
        <button onClick={zoomIn} className="controls">
          +
        </button>

        <button onClick={zoomOut} className="controls">
          -
        </button>

        <button onClick={() => setTransform(0, 0, 0.5, 200, "easeOut")} className="controls">
          Reset
        </button>{" "}
        {/* setTransform arguments: (positionX, positionY, scale, animationTime, animationType) */}
        
      </nav>
    </div>
  );
};

export default ZoomControls;
