// import React from 'react'

const deletePost = (postingsDataArr, setPostingsDataArr, currPostIndx) => {

  console.log("deletePost.js- postingsDataArr=",postingsDataArr);
  console.log("deletePost.js- setPostingsDataArr=",setPostingsDataArr);
  console.log("deletePost.js- currPostIndx=",currPostIndx);

  if (postingsDataArr && postingsDataArr[currPostIndx]) {
    PostingAxios.remove(postingsDataArr[currPostIndx]._id)
    .then((response) => {
      console.log("deletePost.js- response=", response);
    
      setPostingsDataArr((currDataArr) => {
        let newPostingsArr = [...currDataArr];
        newPostingsArr.splice(currPostIndx,1);    // remove 1 item by index
        console.log("deletePost.js- newPostingsArr =", newPostingsArr);
        return newPostingsArr;
      })
    })
    .catch((err) => {
      console.log(err);
    });
    
  } else {
    console.log("deletePost.js, Error - received falsy array/index data passed");
  }
};

export default deletePost
