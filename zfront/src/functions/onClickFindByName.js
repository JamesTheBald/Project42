import PostingAxios from "../services/PostingAxios";

const onClickFindByName = (searchName, setPostingsDataArray) => {
  console.log("onClickFindByName.js searchName=",searchName)

  PostingAxios.findByName(searchName)
    .then((response) => {
      setPostingsDataArray(response.data);
      console.log("onClickFindByName.js response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

  export default onClickFindByName;