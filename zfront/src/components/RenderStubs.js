import React, { useRef } from "react";
// import Tooltip from "./Tooltip";
// import PopupContent from "./PopupContent";
import Draggable from "react-draggable"


const RenderStubs = (props) => {

  let postingsDataArray = props.postingsDataArray;
  // const setCurrPostIndex= props.setCurrPostIndex;
  // const setShowMainModal = props.setShowMainModal;
  // const setPostDraft = props.setPostDraft;
  // let setCreatingPostFlag = props.setCreatingPostFlag;
  let oldPosition = useRef( {x:100,y:100} );

  const bounds = { bottom: 0, right: 0 };


  const handlerOnStop = (pst, indx) => (event, data) => {    // Currying! So spicy!

    console.log("pst=",pst);  console.log("index=",indx);  console.log("event=",event);  console.log("data=",data);

    event.stopPropagation();             //J: I think this is important. Don't want bubbling.?
    console.log("x=",data.x, " y=",data.y);
    console.log("oldPosition.current.x = ", oldPosition.current.x, "oldPosition.current.y = ", oldPosition.current.y )
    
    if (data.x === oldPosition.current.x && data.y === oldPosition.current.y) {
      console.log("You just clicked! Put call to open MainModal here");
    }
    oldPosition.current = {x:data.x, y:data.y};
  }

  console.log("RenderStubs.js postingsDataArray=", postingsDataArray);

  if (postingsDataArray?.length>0) {
    
    return (
      <>
        {postingsDataArray.map((pst, indx) => {
          // console.log("RenderStubs .map: indx=", indx, " and pst=", pst);

          return (
            <div key={indx} className="w-64 my-2">

              <Draggable
                bounds={bounds}
                onStop={handlerOnStop(pst, indx)}
              >
                {/* <Tooltip content={PopupContent(pst)} delay="200" direction="top" css="tooltipPopup rounded-lg">  */}
                   {/* css="tooltipPopup" is required. Edit background color on tooltip.css */}
  
                  <div
                    className="border p-2 border-gray-800 rounded-lg"
                    // onDoubleClick={() => {
                      // setCreatingPostFlag(false);
                      // setCurrPostIndex(indx);
                      // console.log("RenderStubs.js CurrPostIndex=",indx);
                      // setPostDraft(pst)
                      // setShowMainModal(true);
                    // }}
                  >
                    <div>
                      { pst.title ? 
                        <div>{pst.title}</div>
                        :
                        <div> Click to edit </div>
                      }
                      <div className="mt-2">{pst.contributors}</div>
                    </div>

                  </div>

                {/* </Tooltip> */}
              </Draggable>
            </div>
          );
        })}
      </>
    );
  } else {
    return <div> No posts visible </div>;
  }
};

export default RenderStubs;
