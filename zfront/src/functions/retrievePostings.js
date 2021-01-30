import PostingAxios from "../services/PostingAxios";

const retrievePostings = (setPostingsDataArray) => {
  console.log("Running retrievePostings.js")

  PostingAxios.getAll()
    .then((response) => {
      console.log('retrievePostings.js response.data=', response.data);
      setPostingsDataArray(response.data);      // This will cause a re-render if the postings data has changed.
    })
    .catch((err) => {
      console.log(err);
    });
};

export default retrievePostings;