import React from "react";

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
            <div
              key={indx}
              className="w-64 p-2 my-2 border border-gray-700 rounded-lg"
              onClick={() => {
                setCreatingPostFlag(false);
                setCurrPostIndex(indx);
                console.log("RenderStubs.js CurrPostIndex=",indx);
                setPostDraft(pst)
                setShowMainModal(true);
              }}>
              { pst.title ? 
                <div>{pst.title}</div>
                :
                <div> Click to edit </div>
              }
              <div className="mt-2">{pst.contributors}</div>

            </div>
          );
        })}
      </>
    );
  } else {
    return <div> Please create a post </div>;
  }
};

export default RenderStubs;