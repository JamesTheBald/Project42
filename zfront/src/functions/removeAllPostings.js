import PostingAxios from "../services/PostingAxios";

const removeAllPostings = () => {
  console.log("removeAllPostings.js invoked");

  PostingAxios.removeAll()
    .then((response) => {
      console.log("removeAllPostings() response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default removeAllPostings;