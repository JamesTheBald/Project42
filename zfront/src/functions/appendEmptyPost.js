const appendEmptyPost = (setPostingsDataArr, emptyPst) => {

  setPostingsDataArr( (oldPostingsDataArr) => {   
    const newPostingsDataArr = [...oldPostingsDataArr];
    newPostingsDataArr.push(emptyPst);
    console.log("appendEmptyPost.js newPostingsDataArr=", newPostingsDataArr)
    return newPostingsDataArr
  })
}

export default appendEmptyPost;
