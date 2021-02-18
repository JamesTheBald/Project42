import PostsAxios from "../services/PostingsAxios";

const removeAllPosts = () => {
  console.log("removeAllPosts.js invoked");

  PostsAxios.removeAll()
    .then((response) => {
      console.log("removeAllPosts() response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default removeAllPosts;