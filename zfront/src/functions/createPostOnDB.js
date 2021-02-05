import PostingAxios from "../services/PostingAxios";

const createPostOnDB = (postDraft) => {
  console.log("createPostOnDB.js: postDraft=", postDraft);

  return PostingAxios.create(postDraft)
    .then((response) => {
      console.log("createPostOnDB.js: after sending post to DB, response=", response);
    })
    .catch((err) => {
      console.log("createPostOnDB.js error:", err);
    });
}

export default createPostOnDB;