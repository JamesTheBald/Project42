import React, { Component } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RenderStubsNonDraggable from "./RenderStubsNonDraggable";
import ZoomControls from "./ZoomControls";

class DragModeZoomPanStubs extends Component {
  render() {
    const updateZoomPan = this.props.updateZoomPan;
    let zoomScale = this.props.zoomScale;
    let positionX = this.props.positionX;
    let positionY = this.props.positionY;
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

    return (
      <>
        <TransformWrapper
          scale={zoomScale}
          positionX={positionX}
          positionY={positionY}
          onZoomChange={updateZoomPan}
          onPanning={updateZoomPan}
          onPanningStop={updateZoomPan}
          enablePadding={false}
          wheel={{
            step: 160,
          }}
          options={{
            // See "Options prop elements" on https://www.npmjs.com/package/react-draggable
            minScale: 0.25,
            maxScale: 15,
            centerContent: false,
            limitToBounds: false,
          }}>
          {({ zoomIn, zoomOut, setTransform }) => (
            // <StubsNonDraggableZoomPan zoomScale={zoomScale} zoomIn={zoomIn} zoomOut={zoomOut}
            // setTransform={setTransform} {...props} />
            <>
               <TransformComponent>
                <div className="backdrop">
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
                  />
                </div>
              </TransformComponent>

              <ZoomControls
                scale={zoomScale}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                setTransform={setTransform}
                positionX={positionX}
                positionY={positionY}
              />
            </>
          )}
        </TransformWrapper>
      </>
    );
  }
}

export default DragModeZoomPanStubs;
