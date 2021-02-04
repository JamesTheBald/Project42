import React from "react";

const RenderStubs = (props) => {

  let postingsDataArray = props.postingsDataArray;
  const setCurrPostIndex= props.setCurrPostIndex;
  const setShowMainModal = props.setShowMainModal;
  const setPostBuffer = props.setPostBuffer;
  // const setShowDates = props.setShowDates;
  let creatingPostFlag = props.creatingPostFlag;


  console.log("RenderStubs.js postingsDataArray=", postingsDataArray);
  // console.log("RenderStubs.js setCreatingNewPst=", setCreatingNewPst);


  if (postingsDataArray?.length>0) {    //J: was postingsDataArray[0]._id   
    // J: Does this constitute conditional calling of the set-state functions below? They'll only run later, upon click 
    return (
      <>
        {postingsDataArray.map((pst, indx) => {
          // console.log("RenderStubs .map: indx=", indx, " and pst=", pst);

          return (
            <div
              key={indx}
              className="w-64 p-2 my-2 border border-gray-700 rounded-lg"
              onClick={() => {
                creatingPostFlag.current = false;
                setCurrPostIndex(indx);
                console.log("RenderStubs.js CurrPostIndex=",indx);
                setPostBuffer(pst)
                // setShowDates(true);
                setShowMainModal(true);
              }}>
              <div>{pst.title}</div>
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