import PostingsAxios from "../services/PostingsAxios";

const deletePostOnDB = (postDraft) => {
  
  if (postDraft) {
    console.log("deletePostFromDB.js: writing postDraft=", { ...postDraft, archived: true });

    return PostingsAxios.update(postDraft._id, { ...postDraft, archived: true })
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