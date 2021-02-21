
import React from 'react'

const RenderStubsDraggableOLD = () => {
  return (
    <div>
      <Draggable
  onStop={handleOnStop(post, index)}
  allowAnyClick={true}
  defaultPosition={{ x: posnX[index], y: posnY[index] }}
  disabled={dragStopped}
  style={{zIndex: "-9999"}}
  >
  <div className="text-xs flex flex-col items-center absolute text-gray-800">
                {/* absolute positioning in above line is required */}
    <div className="flex flex-col items-center" style={{transform: `scale(${stubScale})`}}>

       {/* Stub */}
      <div
        className="flex w-56 mb-2 border border-gray-900 rounded-lg bg-gray-200"
        // onClick={handleOnClick(post, index)}
      >
        <div
          name="title-contributor-container"
          className="flex flex-col justfy-between relative items-start w-3/4 p-2 border-r border-gray-900">
          {post.title ? (
            <div>
              <div className="max-h-6 leading-3 overflow-hidden">
                <p className="text-xs font-500">{post.title}</p>
              </div>
              {post.title.length > 60 ? (
                <div
                  name="fade-out-title-container"
                  className="mt-2 absolute top-3 right-0 w-full h-3 bg-gradient-to-l from-gray-200">
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div> Click to edit </div>
          )}
          <div>
            <div className="m-2 text-gray-500 text-xs absolute bottom-0 left-0 truncate w-4/5">
              {post.contributors}
            </div>
          </div>
        </div>

        <div
          name="stub-attribute-container"
          className="flex flex-col justify-between items-center w-1/4 p-2 rounded-r-lg">
          <div className="text-gray-500 text-xs"> {post.contentType} </div>

          <div className="my-1.5">
            <RenderSpiciness spiciness={post.spiciness} />
          </div>

          <VoteCounter
            postingsDataArray={postingsDataArray}
            userVoted={userVoted}
            setUserVoted={setUserVoted}
            postDraft={postDraft}
            setPostDraft={setPostDraft}
            index={index}
          />
        </div>
      </div>

      {/*  Dragging Selection Overlay: an invisible area that overlays the stub, releases prevention of stub dragging */}
      <div className="w-56 h-24 bg-red-100 opacity-50 transform -translate-y-24"
        onMouseEnter={ () => {
          setDragStopped(false)
          console.log("Moused over Dragging Selection Overlay. dragStopped=",dragStopped)
        }}
        onMouseMove={ () => {
          setDragStopped(false)
          console.log("Mouse moved over Dragging Selection Overlay. dragStopped=",dragStopped)
        }} 
        onMouseLeave={ () => {
          setDragStopped(true)
          console.log("Mouse Left Dragging Selection Overlay. dragStopped=",dragStopped)
        }}
        style={{zIndex: "9999"}}
      />

    </div>

  </div>
</Draggable>
    </div>
  )
}

export default RenderStubsDraggableOLD
