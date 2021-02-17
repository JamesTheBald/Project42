import PostingsAxios from "../services/PostingsAxios";

const retrievePostings = (setPostingsDataArray, emptyPost) => {
  console.log("Running retrievePostings.js")

  PostingsAxios.getAll()
    .then((response) => {
      console.log('retrievePostings.js response.data=', response.data);

      setPostingsDataArray( () => {
        let newPostingsDataArr = [emptyPost];

        if (response.data?.length>0) {
          newPostingsDataArr = response.data;
          console.log("retrievePostings.js response.data.length>0 so using setPostingsDataArray (response.data)");
        } else {
          // else leave newPostingsDataArr = [emptyPost]
          console.log("retrievePostings.js response.data.length<=0 so using setPostingsDataArray ([emptyPost])");
        }
        return newPostingsDataArr;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default retrievePostings;