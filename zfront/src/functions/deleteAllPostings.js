const deleteAllPostings = (setPostingsDataArr) => {
  console.log("deleteAllPostings.js invoked");

  PostingAxios.removeAll()
    .then((response) => {
      setPostingsDataArr(response.data);
      console.log("deleteAllPostings() response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default deleteAllPostings;