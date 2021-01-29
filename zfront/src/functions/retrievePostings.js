const retrievePostings = (setPostings) => {

  console.log("Running retrievePostings.js")

  PostingAxios.getAll()
    .then((response) => {
      console.log('retrievePostings() response.data=', response.data);
      setPostings(response.data);   // This will re-render if the postings data has changed.

      // setLoading(false);

    })
    .catch((err) => {
      console.log(err);
    });
};

export default retrievePostings;