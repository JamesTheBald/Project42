import PostingsAxios from "../services/PostingsAxios";

const onClickFindByName = (searchName, setPostingsDataArray) => {
  console.log("onClickFindByName.js searchName=",searchName)

  PostingsAxios.findByName(searchName)
    .then((response) => {
      setPostingsDataArray(response.data);
      console.log("onClickFindByName.js response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

  export default onClickFindByName;