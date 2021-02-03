import PostingAxios from "../services/PostingAxios";

const updatePostOnDB = (postingsDataArray, currPostIndex) => {
  console.log("updatePostOnDB.js: postingsDataArray=", postingsDataArray);
  console.log("updatePostOnDB.js: currPostIndex=", currPostIndex);

  if (postingsDataArray?.length>0) {
    const post = postingsDataArray[currPostIndex];
    console.log("updatePostOnDB.js: sending to DB post=", post);

    PostingAxios.update(post._id, post)
      .then((response) => {
        console.log("updatePostOnDB.js: after sending post to DB, response=", response);
      })
      .catch((err) => {
        console.log("updatePostOnDB error:", err);
      });
  } else {
    console.log("updatePostOnDB.js: Error - received falsy postingsDataArray");
  }
}

export default updatePostOnDB;