import updatePostOnDB from "../functions/updatePostOnDB";


const unlockPost = (post, index, recdLog) => {
  recdLog && console.log("unlockPost.js updatePostOnDB post=", post);

  post = { ...post, locked: false };
  console.log("unlockPost.js runs. post=",post)

  updatePostOnDB(post, index);
}

export default unlockPost;