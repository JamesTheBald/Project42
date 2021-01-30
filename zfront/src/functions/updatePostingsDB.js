import PostingAxios from "../services/PostingAxios";

const updatePostingsDB = (postingsDataArr, currPostIndx) => {
  console.log("MainModal.js: updatePostingsDB(), currPostIndex=", currPostIndx);

  if (postingsDataArr && postingsDataArr[currPostIndx]) {
   
    const pst = postingsDataArr[currPostIndx];
    console.log("MainModal.js: updatePostingsDB(): post to update=", pst);

    PostingAxios.update(pst._id, pst)
      .then((response) => {
        console.log("MainModal.js: updatePostingsDB(), response=", response);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("MainModal.js: updatePostingsDB() Error - received falsy array/index");
  }
};

export default updatePostingsDB;