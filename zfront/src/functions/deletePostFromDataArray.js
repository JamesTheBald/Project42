const deletePostFromDataArray = (postingsDataArray, setPostingsDataArray, currPostIndex) => {
  
  console.log("deletePostFromDataArray.js - postingsDataArray=",postingsDataArray);
  console.log("deletePostFromDataArray.js - currPostIndex=",currPostIndex);

  setPostingsDataArray((currDataArr) => {
    let newPostingsArr = [...currDataArr];
    newPostingsArr.splice(currPostIndex,1);       // remove 1 item by index
    console.log("deletePost.js- newPostingsArr =", newPostingsArr);
    return newPostingsArr;
  })
};

export default deletePostFromDataArray
