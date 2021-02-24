import updatePostOnDB from "../functions/updatePostOnDB";


const lockPost = (post, index) => {

  console.log("lockPost.js runs. post=", post);
  post = { ...post, locked: true };

  updatePostOnDB(post, index)
  
  //.then((response) => {
  //  console.log("lockPost.js updatePostOnDB response msg=", response.data);   //response=", response);
  //});
}

export default lockPost;