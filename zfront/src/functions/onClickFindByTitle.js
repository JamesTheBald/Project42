import PostingAxios from "../services/PostingAxios";

const onClickFindByTitle = (searchTitle, setPostingsDataArray) => {
  console.log("onClickFindByTitle.js searchTitle=",searchTitle)

  PostingAxios.findByTitle(searchTitle)
    .then((response) => {
      setPostingsDataArray(response.data);
      console.log("onClickFindByTitle.js response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

  export default onClickFindByTitle;