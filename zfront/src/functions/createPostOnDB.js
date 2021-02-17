import PostingsAxios from "../services/PostingsAxios";

const createPostOnDB = (postDraft) => {
  console.log("createPostOnDB.js: postDraft=", postDraft);

  return PostingsAxios.create(postDraft)
    .then((response) => {
      console.log("createPostOnDB.js: after sending post to DB, response=", response);
    })
    .catch((err) => {
      console.log("createPostOnDB.js error:", err);
    });
}

export default createPostOnDB;