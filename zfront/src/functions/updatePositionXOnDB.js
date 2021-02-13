import PostingAxios from "../services/PostingAxios";

const updatePositionOnDB = (post) => {
  console.log("updatePostOnDB.js: postDraft=", postDraft);

  if (post) {

    return PostingAxios.update(post._id, post)
      .then((response) => {
        console.log("updatePositionXOnDB.js: after sending post to DB, response=", response);
      })
      .catch((err) => {
        console.log("updatePositionXOnDB error:", err);
      });

  } else {
    console.log("updatePositionXOnDB.js: Error - received falsy post");
    return null
  }
}

export default updatePositionOnDB;