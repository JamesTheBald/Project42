import React, { Component } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RenderStubsNonDraggable from "./RenderStubsNonDraggable";
import RenderTopicsNonDraggable from "./RenderTopicsNonDraggable";
// import ZoomControls from "./ZoomControls";

class ZoomPanNonDraggableStubs extends Component {
  render() {
    const updateZoomPan = this.props.updateZoomPan;
    let zoomScale = this.props.zoomScale;
    const minZoomScale = this.props.minZoomScale;
    const maxZoomScale = this.props.maxZoomScale;
    let panX = this.props.panX;
    let panY = this.props.panY;
    let zoomSpeed = this.props.zoomSpeed;
  
    let postingsDataArray = this.props.postingsDataArray;
    let currPostIndex = this.props.currPostIndex;
    const setCurrPostIndex = this.props.setCurrPostIndex;
    let showMainModal = this.props.showMainModal;
    const setShowMainModal = this.props.setShowMainModal;
    let postDraft = this.props.postDraft;
    const setPostDraft = this.props.setPostDraft;
    const setCreatingPostFlag = this.props.setCreatingPostFlag;
    let userVoted = this.props.userVoted;
    const setUserVoted = this.props.setUserVoted;
    const stubScale = this.props.stubScale;
    let blurLevel = this.props.blurLevel;

    let topicsDataArray = this.props.topicsDataArray;
    const setCurrTopicIndex = this.props.setCurrTopicIndex;
    const setShowTopicModal = this.props.setShowTopicModal;
    const setTopicDraft = this.props.setTopicDraft;
    const setCreatingTopicFlag = this.props.setCreatingTopicFlag;
    const posnLog = this.props.posnLog;
    const recdLog = this.props.recdLog;


    return (
      <div className="z-0">
        <TransformWrapper
          scale={zoomScale}
          positionX={panX}
          positionY={panY}
          // onZoomChange={updateZoomPan}  // removed as per https://github.com/prc5/react-zoom-pan-pinch/issues/84
          onWheel={updateZoomPan}

          onPanning={updateZoomPan} 
          onPanningStop={updateZoomPan}
          onPinching={updateZoomPan}    // Guessing here!
          enablePadding={false}
          doubleClick={{disabled: true}}
          wheel={{step: zoomSpeed}}
          options={{
            // See "Options prop elements" on https://www.npmjs.com/package/react-draggable
            minScale: minZoomScale,
            maxScale: maxZoomScale,
            centerContent: false,
            limitToBounds: false,
            // limitToWrapper: false,
          }}
          >
          {() => (      // { zoomIn, zoomOut, setTransform }
            <>
              <TransformComponent>
                
                <div className="bg-black">

                  <div className="backgroundImage" 
                        style={{filter: `blur(${blurLevel}px)`}}
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
            </>
          )}
        </TransformWrapper>

      </div>
    );
  }
}

export default ZoomPanNonDraggableStubs;
