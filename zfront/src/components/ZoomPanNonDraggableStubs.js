import React, { Component } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RenderStubsNonDraggable from "./RenderStubsNonDraggable";
import RenderTopicsNonDraggable from "./RenderTopicsNonDraggable";
// import ZoomControls from "./ZoomControls";

class ZoomPanNonDraggableStubs extends Component {
  render() {
    const props = this.props;

    const updateZoomPan = props.updateZoomPan;
    let zoomScale = props.zoomScale;
    let panX = props.panX;
    let panY = props.panY;
    let minZoomScale = props.minZoomScale;
    const maxZoomScale = props.maxZoomScale;
    // const initialPanX = props.initialPanX;
    // const initialPanY = props.initialPanY;
    let zoomSpeed = props.zoomSpeed;

    let postingsDataArray = props.postingsDataArray;
    let currPostIndex = props.currPostIndex;
    const setCurrPostIndex = props.setCurrPostIndex;
    let showMainModal = props.showMainModal;
    const setShowMainModal = props.setShowMainModal;
    let postDraft = props.postDraft;
    const setPostDraft = props.setPostDraft;
    const setCreatingPostFlag = props.setCreatingPostFlag;
    let userVoted = props.userVoted;
    const setUserVoted = props.setUserVoted;

    let topicsDataArray = props.topicsDataArray;
    const setCurrTopicIndex = props.setCurrTopicIndex;
    const setShowTopicModal = props.setShowTopicModal;
    const setTopicDraft = props.setTopicDraft;
    const setCreatingTopicFlag = props.setCreatingTopicFlag;

    const stubScale = props.stubScale;
    // let blurLevel = props.blurLevel;
    // const displayWidth = props.displayWidth;
    // const imageWidth = props.imageWidth;
    // const scrollToTopLeft = props.scrollToTopLeft;
    const posnLog = props.posnLog;
    const recdLog = props.recdLog;

    // console.log("ZoomPanNonDraggableStubs, minZoomScale=",minZoomScale);
    // console.log("ZoomPanNonDraggableStubs, panX=",panX);
    // console.log("ZoomPanNonDraggableStubs, panY=",panY);
    // console.log("ZoomPanNonDraggableStubs, imageWidth=", imageWidth);
    // console.log("ZoomPanNonDraggableStubs, displayWidth=", displayWidth);


    return (
      <div className="z-0">
        <TransformWrapper
          scale={zoomScale}
          positionX={panX}
          positionY={panY}
          defaultScale={zoomScale}
          defaultPositionX={panX}
          defaultPositionY={panY}
          // onZoomChange={updateZoomPan}  // do not use - per https://github.com/prc5/react-zoom-pan-pinch/issues/84
          onWheelStop={updateZoomPan}
          onPanningStop={updateZoomPan}
          onPinchingStop={updateZoomPan}
          // enablePadding={false}
          doubleClick={{ disabled: true }}
          wheel={{ step: zoomSpeed }}
          options={{
            minScale: minZoomScale,
            maxScale: maxZoomScale,
            centerContent: false,
            limitToBounds: false,
            // limitToWrapper: false,
          }}
          // zoomIn = {{step: 70, animationTime: 200}}
          // zoomOut = {{step: 70, animationTime: 200}}
          // reset = {{animationTime: 200}}
        >
          {() => (
            // Note that positionX & Y here are different to positionX & Y used to locate the stubs and topics
            <>
              <TransformComponent>
                <div>
                  <div className="backgroundImage "  />
                  {/* style={{ filter: `blur(${blurLevel}px)` }} */}
                  <RenderTopicsNonDraggable
                    topicsDataArray={topicsDataArray}
                    setCurrTopicIndex={setCurrTopicIndex}
                    setShowTopicModal={setShowTopicModal}
                    setTopicDraft={setTopicDraft}
                    setCreatingTopicFlag={setCreatingTopicFlag}
                    posnLog={posnLog}
                    recdLog={recdLog}
                  />

                  <RenderStubsNonDraggable
                    postingsDataArray={postingsDataArray}
                    currPostIndex={currPostIndex}
                    setCurrPostIndex={setCurrPostIndex}
                    showMainModal={showMainModal}
                    setShowMainModal={setShowMainModal}
                    postDraft={postDraft}
                    setPostDraft={setPostDraft}
                    setCreatingPostFlag={setCreatingPostFlag}
                    userVoted={userVoted}
                    setUserVoted={setUserVoted}
                    stubScale={stubScale}
                    posnLog={posnLog}
                    recdLog={recdLog}
                  />

                </div>
              </TransformComponent>

              {/* Built-In Reset Function */}
              {/* <div
                className="absolute w-24 z-50 flex flex-col text-sm text-gray-700"
                style={{ top: "90px", left: `${displayWidth-40}px`, transform: "translateX(-100%)"}}
                //-minZoomScale*500+80
                // imageWidth -    , transform: "translateX(-50%)"
              >
                <button
                  className="py-1  bg-gray-300  rounded-lg shadow-lg  border border-gray-800"
                  onClick={() => {
                    setTransform(initialPanX, initialPanY, minZoomScale, 200, "linear");
                    scrollToTopLeft();
                  }}
                >
                  Reset Zoom
                </button>
                <div className="mt-2 bg-gray-200 border border-gray-800 rounded shadow-lg">
                  <div className="px-2 py-1">scale = {scale.toFixed(3)}</div>
                  <div className="px-2 py-1">positionX = {positionX.toFixed(0)}</div>
                  <div className="px-2 py-1">positionY = {positionY.toFixed(0)}</div>
                </div>
              </div> */}

            </>
          )}
        </TransformWrapper>
      </div>
    );
  }
}

export default ZoomPanNonDraggableStubs;
