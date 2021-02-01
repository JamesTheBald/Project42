import React from "react";

const RenderStubs = (props) => {

  let postingsDataArr = props.postingsDataArr;
  // let currPostIndx = props.currPostIndex;
  const setShowMainModl = props.setShowMainModl;
  const setCreatingNewPst = props.setCreatingNewPst;

  console.log("RenderStubs.js postingsDataArr=", postingsDataArr);


  if (postingsDataArr && postingsDataArr[0]) {    //J: was postingsDataArr[0]._id
    return (
      <>
        {postingsDataArr.map((pst, indx) => {
          console.log("RenderStubs .map: indx=", indx, " and pst=", pst);

          return (
            <div
              key={indx}
              className="w-64 p-2 my-2 border border-gray-700 rounded-lg"
              onClick={() => {
                const currPostIndx = indx;        //J: Should this be a useRef? Or does it get 'baked in' here?
            
                setShowMainModl(true);
                setCreatingNewPst(false);
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