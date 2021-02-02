import PostingAxios from "../services/PostingAxios";

const retrievePostings = (setPostingsDataArray, emptyPst) => {
  console.log("Running retrievePostings.js")

  PostingAxios.getAll()
    .then((response) => {
      console.log('retrievePostings.js response.data=', response.data);

      setPostingsDataArray( () => {
        let newPostingsDataArr = emptyPst;

        if (response.data?.length>0) {
          newPostingsDataArr = response.data;
          console.log("retrievePostings.js response.data.length>0 so using setPostingsDataArray (response.data)");
        } else {
          console.log("retrievePostings.js response.data.length<=0 so using setPostingsDataArray (emptyPst)");
        }
        return newPostingsDataArr;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default retrievePostings;