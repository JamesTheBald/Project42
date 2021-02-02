import PostingAxios from "../services/PostingAxios";

const updatePostingsDB = (postingsDataArr, currPostIndx) => {
  console.log("updatePostingsDB.js: postingsDataArr=", postingsDataArr);
  console.log("updatePostingsDB.js: currPostIndex=", currPostIndx);

  if (postingsDataArr.length>0) {
    const pst = postingsDataArr[currPostIndx];
    console.log("updatePostingsDB.js: sending to DB pst=", pst);

    PostingAxios.update(pst._id, pst)
      .then((response) => {
        console.log("updatePostingsDB.js: after sending post to DB, response=", response);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("updatePostingsDB.js: Error - received falsy array/index");
  }
};

export default updatePostingsDB;