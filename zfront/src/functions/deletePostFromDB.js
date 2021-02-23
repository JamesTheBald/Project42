import PostingsAxios from "../services/PostingsAxios";

const deletePostOnDB = (postDraft) => {
  
  if (postDraft) {

    const archivedPost = { ...postDraft, archived: true }
    console.log("deletePostFromDB.js: writing postDraft=", archivedPost);

    return PostingsAxios.update(archivedPost._id, archivedPost)
      .then((response) => {
        console.log("deletePostOnDB.js: after sending post to DB, response msg=", response.data);
      })
      .catch((err) => {
        console.log("deletePostOnDB error:", err);
      });

  } else {
    console.log("deletePostOnDB.js: Error - received falsy postDraft");
    return null
  }
}

export default deletePostOnDB;