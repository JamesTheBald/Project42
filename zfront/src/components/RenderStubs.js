import React from "react";
import Tooltip from "./Tooltip";
import PopupContent from "./PopupContent";
import Draggable from "react-draggable"

const RenderStubs = (props) => {

  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex= props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  const setPostDraft = props.setPostDraft;
  let setCreatingPostFlag = props.setCreatingPostFlag;


  console.log("RenderStubs.js postingsDataArray=", postingsDataArray);

  if (postingsDataArray?.length>0) {
    
    return (
      <>
        {postingsDataArray.map((pst, indx) => {
          // console.log("RenderStubs .map: indx=", indx, " and pst=", pst);

          return (
            <div key={indx} className="w-64 my-2">
              <Tooltip content={PopupContent(pst)} delay="200" direction="top" css="tooltipPopup rounded-lg"> 
                   {/* css="tooltipPopup" is required. Edit background color on tooltip.css */}
                <Draggable>
                  <div
                    className="border p-2 border-gray-800 rounded-lg"
                    onDoubleClick={() => {
                      setCreatingPostFlag(false);
                      setCurrPostIndex(indx);
                      console.log("RenderStubs.js CurrPostIndex=",indx);
                      setPostDraft(pst)
                      setShowMainModal(true);
                    }}
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
                </Draggable>
              </Tooltip>
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
