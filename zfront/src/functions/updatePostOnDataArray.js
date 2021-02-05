const updatePostOnDataArray = (setPostingsDataArray, postDraft, currPostIndex) => {

  setPostingsDataArray((currDataArr) => {
    let newPostingsArr = [...currDataArr];
    newPostingsArr.splice(currPostIndex, 1, postDraft);       // swap old post with postDraft, by index
    console.log("updatePostingsDataArray.js- setting postingsDataArray to", newPostingsArr);
    return newPostingsArr;
  })
}

export default updatePostOnDataArray;
