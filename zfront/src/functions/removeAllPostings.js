import PostingsAxios from "../services/PostingsAxios";

const removeAllPostings = () => {
  console.log("removeAllPostings.js invoked");

  PostingsAxios.removeAll()
    .then((response) => {
      console.log("removeAllPostings() response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default removeAllPostings;