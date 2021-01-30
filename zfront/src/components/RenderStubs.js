import React from "react";

const RenderStubs = (postingsDataArr, setCurrPostIndx, setShowMainModl) => {
  console.log("RenderStubs.js postingsDataArr=", postingsDataArr);


  if (postingsDataArr && postingsDataArr[0]) {    // was postingsDataArr[0]._id
    return (
      <>
        {postingsDataArr.map((pst, indx) => {
          console.log("RenderStubs .map: indx=", indx, " and pst=", pst);

          return (
            <div
              key={indx}
              className="w-64 p-2 my-2 border border-gray-700 rounded-lg"
              onClick={() => {
                setCurrPostIndx(pst);
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