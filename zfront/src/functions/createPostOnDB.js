import PostingAxios from "../services/PostingAxios";

const createPostOnDB = (postBuffer) => {
  console.log("createPostOnDB.js: postBuffer=", postBuffer);

  PostingAxios.create(postBuffer)
    .then((response) => {
      console.log("createPostOnDB.js: after sending post to DB, response=", response);
    })
    .catch((err) => {
      console.log("createPostOnDB.js error:", err);
    });
}

export default createPostOnDB;