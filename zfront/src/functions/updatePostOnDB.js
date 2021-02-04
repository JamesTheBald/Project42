import PostingAxios from "../services/PostingAxios";

const updatePostOnDB = (postBuffer, currPostIndex) => {
  console.log("updatePostOnDB.js: postBuffer=", postBuffer);
  console.log("updatePostOnDB.js: currPostIndex=", currPostIndex);

  if (postBuffer) {

    PostingAxios.update(postBuffer._id, postBuffer)
      .then((response) => {
        console.log("updatePostOnDB.js: after sending post to DB, response=", response);
      })
      .catch((err) => {
        console.log("updatePostOnDB error:", err);
      });
  } else {
    console.log("updatePostOnDB.js: Error - received falsy postBuffer");
  }
}

export default updatePostOnDB;