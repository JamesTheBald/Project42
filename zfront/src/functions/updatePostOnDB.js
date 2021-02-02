import PostingAxios from "../services/PostingAxios";

const updatePostOnDB = (postingsDataArr, currPostIndx) => {
  console.log("updatePostOnDB.js: postingsDataArr=", postingsDataArr);
  console.log("updatePostOnDB.js: currPostIndex=", currPostIndx);

  if (postingsDataArr.length>0) {
    const post = postingsDataArr[currPostIndx];
    console.log("updatePostOnDB.js: sending to DB pst=", post);

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