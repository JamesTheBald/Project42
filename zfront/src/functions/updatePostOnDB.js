import PostingsAxios from "../services/PostingsAxios";

const updatePostOnDB = (postDraft, currPostIndex) => {
  console.log("updatePostOnDB.js: writing postDraft=", postDraft, "to currPostIndex=", currPostIndex);

  if (postDraft) {

    return PostingsAxios.update(postDraft._id, postDraft)
      .then((response) => {
        console.log("updatePostOnDB.js: after sending post to DB, response msg=", response.data);
      })
      .catch((err) => {
        console.log("updatePostOnDB error:", err);
      });

  } else {
    console.log("updatePostOnDB.js: Error - received falsy postDraft");
    return null
  }
}

export default updatePostOnDB;