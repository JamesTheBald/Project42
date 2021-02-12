import PostingAxios from "../services/PostingAxios";

const updatePostOnDB = (postDraft, currPostIndex) => {
  console.log("updatePostOnDB.js: postDraft=", postDraft);
  console.log("updatePostOnDB.js: currPostIndex=", currPostIndex);

  if (postDraft) {

    return PostingAxios.update(postDraft._id, postDraft)
      .then((response) => {
        console.log("updatePostOnDB.js: after sending post to DB, response=", response);
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