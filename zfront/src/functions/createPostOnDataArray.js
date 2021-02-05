const createPostOnDataArray = (setPostingsDataArray, postDraft) => {

  console.log("createPostOnDataArray.js postDraft=",postDraft);

  setPostingsDataArray((currDataArr) => {
    let newPostingsArr = [...currDataArr];
    newPostingsArr.push(postDraft);
    console.log("createPostingsDataArray.js- newPostingsArr =", newPostingsArr);
    return newPostingsArr;
  })
}

export default createPostOnDataArray;
