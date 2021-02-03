const appendEmptyPost = (setPostingsDataArray, emptyPostArray) => {

  setPostingsDataArray( (oldPostingsDataArr) => {   
    const newPostingsDataArr = [...oldPostingsDataArr];
    newPostingsDataArr.push(...emptyPostArray);
    console.log("appendEmptyPost.js newPostingsDataArr=", newPostingsDataArr)
    return newPostingsDataArr
  })
}

export default appendEmptyPost;
