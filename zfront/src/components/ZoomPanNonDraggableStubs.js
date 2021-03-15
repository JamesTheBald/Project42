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
    const minZoomScale = props.minZoomScale;
    const maxZoomScale = props.maxZoomScale;
    const initialPanX = props.initialPanX;
    const initialPanY = props.initialPanY;
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
    let blurLevel = props.blurLevel;
    const posnLog = props.posnLog;
    const recdLog = props.recdLog;


    return (
      <div className="z-0">

        <TransformWrapper
          defaultScale={zoomScale}
          defaultPositionX={panX}
          defaultPositionY={panY}

          // onZoomChange={updateZoomPan}  // do not use - per https://github.com/prc5/react-zoom-pan-pinch/issues/84
          onWheelStop={updateZoomPan}
          onPanningStop={updateZoomPan}
          onPinchingStop={updateZoomPan}
          enablePadding={false}
          doubleClick={{disabled: true}}
          wheel={{step: zoomSpeed}}

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

          {({ setTransform, scale, positionX, positionY, zoomIn, zoomOut, ...rest }) => (
            <>
              <TransformComponent>
                <div>
                  <div className="backgroundImage" style={{filter: `blur(${blurLevel}px)`}} />

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
                    // zoomedOrPanned={zoomedOrPanned}
                    stubScale={stubScale}
                    posnLog={posnLog}
                    recdLog={recdLog}
                  />
                  <RenderTopicsNonDraggable
                    topicsDataArray={topicsDataArray}
                    setCurrTopicIndex={setCurrTopicIndex}
                    setShowTopicModal={setShowTopicModal}
                    setTopicDraft={setTopicDraft}
                    setCreatingTopicFlag={setCreatingTopicFlag}
                    // zoomedOrPanned={zoomedOrPanned}
                    posnLog={posnLog}
                    recdLog={recdLog}
                  />
                </div>
              </TransformComponent>

              <div className="flex flex-row text-gray-400 text-xl py-2">
                <button className="px-3 border border-gray-200 rounded" onClick={zoomIn}>+</button>
                <button className="px-3 border border-gray-200 rounded" onClick={zoomOut}>-</button>
                <button className="px-3 border border-gray-200 rounded" onClick={() => {
                    setTransform(initialPanX, initialPanY, minZoomScale, 200, "linear")
                  }}
                >
                  Reset
                </button>
                <div className="px-3">Scale = {scale} </div>
                <div className="px-3">PositionX = {positionX} </div>
                <div className="px-3">PositionY = {positionY} </div>

              </div>
            </>
          )}
        </TransformWrapper>

      </div>
    );
  }
}

export default ZoomPanNonDraggableStubs;
