import PostingAxios from "../services/PostingAxios";

const deletePostFromDB = (postingsDataArray, currPostIndex) => {
  console.log("deletePostFromDB.js- postingsDataArray=",postingsDataArray);
  console.log("deletePostFromDB.js- currPostIndex=",currPostIndex);

  let fnReturn

  if (postingsDataArray?.length>0) {
    PostingAxios.remove(postingsDataArray[currPostIndex]._id)
    .then((response) => {
      fnReturn = response;
      console.log("deletePost.js- response=", response);
    })
    .catch((err) => {
      fnReturn = err;
      console.log(err);
    });
  } else {
    console.log("deletePost.js, Error - received null or empty array");
  }
  return fnReturn
};

export default deletePostFromDB
