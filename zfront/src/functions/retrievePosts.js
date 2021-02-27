import PostingsAxios from "../services/PostingsAxios";

const retrievePosts = (setPostingsDataArray, emptyPost, recdLog) => {
  console.log("Running retrievePosts.js")

  PostingsAxios.getAll()
    .then((response) => {
      console.log('retrievePosts.js response.data=', response.data);

      setPostingsDataArray( () => {
        let newPostingsDataArr = [emptyPost];

        if (response.data?.length>0) {
          newPostingsDataArr = response.data;
          recdLog && console.log("retrievePosts.js response.data.length>0 so using setPostingsDataArray (response.data)");
        } else {
          // else leave newPostingsDataArr = [emptyPost]
          console.log("retrievePosts.js response.data.length<=0 so using setPostingsDataArray ([emptyPost])");
        }
        return newPostingsDataArr;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default retrievePosts;