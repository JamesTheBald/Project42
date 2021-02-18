import TopicsAxios from "../services/TopicsAxios";

const createTopicOnDB = (topicDraft) => {
  console.log("createTopicOnDB.js: topicDraft=", topicDraft);

  return TopicsAxios.create(topicDraft)
    .then((response) => {
      console.log("createTopicOnDB.js: after sending topic to DB, response=", response);
    })
    .catch((err) => {
      console.log("createTopicOnDB.js error:", err);
    });
}

export default createTopicOnDB;