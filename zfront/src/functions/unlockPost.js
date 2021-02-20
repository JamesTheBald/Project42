import updatePostOnDB from "../functions/updatePostOnDB";


const unlockPost = (post, index, recdLog) => {
  recdLog && console.log("unlockPost.js updatePostOnDB post=", post);

  post = { ...post, locked: false };

  updatePostOnDB(post, index).then((response) => {
    console.log("unlockPost.js updatePostOnDB response=", response);
  });
}

export default unlockPost;