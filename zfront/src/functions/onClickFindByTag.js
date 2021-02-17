import PostingsAxios from "../services/PostingsAxios";

const onClickFindByTags = (searchTags, setPostingsDataArray) => {
  console.log("onClickFindByTags.js searchTags=",searchTags)

  PostingsAxios.findByTags(searchTags)
    .then((response) => {
      setPostingsDataArray(response.data);
      console.log("onClickFindByTags.js response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

  export default onClickFindByTags;