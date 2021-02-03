import PostingAxios from "../services/PostingAxios";

const deletePost = (postingsDataArray, setPostingsDataArray, currPostIndex) => {
  console.log("deletePost.js- postingsDataArray=",postingsDataArray);
  console.log("deletePost.js- setPostingsDataArray=",setPostingsDataArray);
  console.log("deletePost.js- currPostIndex=",currPostIndex);

  if (postingsDataArray?.length>0) {
    PostingAxios.remove(postingsDataArray[currPostIndex]._id)
    .then((response) => {
      console.log("deletePost.js- response=", response);
    
      setPostingsDataArray((currDataArr) => {
        let newPostingsArr = [...currDataArr];
        newPostingsArr.splice(currPostIndex,1);       // remove 1 item by index
        console.log("deletePost.js- newPostingsArr =", newPostingsArr);
        return newPostingsArr;
      })
    })
    .catch((err) => {
      console.log(err);
    });
    
  } else {
    console.log("deletePost.js, Error - received null or empty array");
  }
};

export default deletePost
