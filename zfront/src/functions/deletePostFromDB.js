import PostingsAxios from "../services/PostingsAxios";

const deletePostOnDB = (postDraft, setPostDraft) => {
  
  if (postDraft) {
    
    setPostDraft((currDraft) => {
      console.log("deletePostOnDB.js: Initial postDraft aka currDraft.archived=", currDraft.archived);
      const newPostDraft = { ...currDraft, archived: true };
      console.log("deletePostOnDB.js: intended updated newPostDraft.archived=", newPostDraft.archived);
      return newPostDraft;
    })
    
    console.log("deletePostOnDB.js: Actually updated postDraft.archived=", postDraft.archived);


    return PostingsAxios.update(postDraft._id, postDraft)
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