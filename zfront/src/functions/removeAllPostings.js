import PostingAxios from "../services/PostingAxios";

const removeAllPostings = (setPostingsDataArr) => {
  console.log("removeAllPostings.js invoked");

  PostingAxios.removeAll()
    .then((response) => {
      setPostingsDataArr(response.data);
      console.log("removeAllPostings() response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default removeAllPostings;