import PostingAxios from "../services/PostingAxios";

const onClickFindByTags = (searchTags, setPostingsDataArray) => {
  console.log("onClickFindByTags.js searchTags=",searchTags)

  PostingAxios.findByTags(searchTags)
    .then((response) => {
      setPostingsDataArray(response.data);
      console.log("onClickFindByTags.js response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

  export default onClickFindByTags;