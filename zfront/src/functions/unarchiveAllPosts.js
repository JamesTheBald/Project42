import PostingsAxios from "../services/PostingsAxios";
import retrievePosts from "../functions/retrievePosts";

const unarchiveAllPosts = (setPostingsDataArray, emptyPost) => {

  PostingsAxios.unarchiveAll()
  .then((response) => {
    console.log("unarchiveAllPosts.js: response msg=", response.data);
    retrievePosts(setPostingsDataArray, emptyPost);
  })
  .catch((err) => {
    console.log("unarchiveAllPosts error:", err);
  });
}

export default unarchiveAllPosts;
