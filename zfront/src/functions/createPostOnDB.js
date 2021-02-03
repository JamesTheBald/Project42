import PostingAxios from "../services/PostingAxios";

const createPostOnDB = (postingsDataArray, currPostIndex) => {
  console.log("createPostOnDB.js: postingsDataArr=", postingsDataArray);
  console.log("createPostOnDB.js: currPostIndex=", currPostIndex);

    const post = postingsDataArray[currPostIndex];
    console.log("createPostOnDB.js: sending to DB post=", post);

    PostingAxios.create(post)
      .then((response) => {
        console.log("createPostOnDB.js: after sending post to DB, response=", response);
      })
      .catch((err) => {
        console.log("createPostOnDB.js error:", err);
      });
}

export default createPostOnDB;