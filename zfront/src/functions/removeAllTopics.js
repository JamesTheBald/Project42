import TopicsAxios from "../services/TopicsAxios";

const removeAllTopics = () => {
  console.log("removeAllTopics.js invoked");

  TopicsAxios.removeAll()
    .then((response) => {
      console.log("removeAllTopics() response.data=", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default removeAllTopics;