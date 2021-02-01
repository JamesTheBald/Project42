import React from "react";

const RenderStubs = (props) => {

  let postingsDataArr = props.postingsDataArr;
  const assignCurrPostIndx= props.assignCurrPostIndex;
  const setShowMainModl = props.setShowMainModl;
  const setCreatingNewPst = props.setCreatingNewPst;

  console.log("RenderStubs.js postingsDataArr=", postingsDataArr);
  console.log("RenderStubs.js setCreatingNewPst=", setCreatingNewPst);


  if (postingsDataArr && postingsDataArr[0]) {    //J: was postingsDataArr[0]._id   
    // J: Does this constitute conditional calling of the set-state functions below? They'll only run later, upon click 
    return (
      <>
        {postingsDataArr.map((pst, indx) => {
          console.log("RenderStubs .map: indx=", indx, " and pst=", pst);

          return (
            <div
              key={indx}
              className="w-64 p-2 my-2 border border-gray-700 rounded-lg"
              onClick={() => {
                assignCurrPostIndx(indx);    //J: The value of indx gets 'baked in' here, right?
                setCreatingNewPst(false);
                setShowMainModl(true);
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