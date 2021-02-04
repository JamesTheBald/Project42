import PostingAxios from "../services/PostingAxios";

const deletePostFromDB = (postingsDataArray, currPostIndex) => {
  console.log("deletePostFromDB.js- postingsDataArray=",postingsDataArray);
  console.log("deletePostFromDB.js- currPostIndex=",currPostIndex);

  if (postingsDataArray?.length>0) {
    PostingAxios.remove(postingsDataArray[currPostIndex]._id)
    .then((response) => {
      console.log("deletePost.js- response=", response);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    console.log("deletePost.js, Error - received null or empty array");
  }
};

export default deletePostFromDB
