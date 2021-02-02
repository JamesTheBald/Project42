import PostingAxios from "../services/PostingAxios";

const createPostOnDB = (postingsDataArr, currPostIndx) => {
  console.log("createPostOnDB.js: postingsDataArr=", postingsDataArr);
  console.log("createPostOnDB.js: currPostIndex=", currPostIndx);

    const post = postingsDataArr[currPostIndx];
    console.log("createPostOnDB.js: sending to DB pst=", post);

    PostingAxios.create(post)
      .then((response) => {
        console.log("createPostOnDB.js: after sending post to DB, response=", response);
      })
      .catch((err) => {
        console.log("createPostOnDB.js error:", err);
      });
}

export default createPostOnDB;