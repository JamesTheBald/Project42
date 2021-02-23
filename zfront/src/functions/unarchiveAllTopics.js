import TopicsAxios from "../services/TopicsAxios";
import retrieveTopics from "../functions/retrieveTopics";

const unarchiveAllTopics = (setTopicsDataArray, emptyTopic) => {

  TopicsAxios.unarchiveAll()
  .then((response) => {
    console.log("unarchiveAllTopics.js: response msg=", response.data);
    retrieveTopics(setTopicsDataArray, emptyTopic);

  })
  .catch((err) => {
    console.log("unarchiveAllTopics error:", err);
  });

  
}

export default unarchiveAllTopics;
