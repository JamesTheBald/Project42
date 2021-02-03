const createPostOnDataArray = (setPostingsDataArray, postBuffer) => {

  setPostingsDataArray((currDataArr) => {
    let newPostingsArr = [...currDataArr];
    newPostingsArr.push(postBuffer);
    console.log("createPostingsDataArray.js- newPostingsArr =", newPostingsArr);
    return newPostingsArr;
  })
}

export default createPostOnDataArray;
