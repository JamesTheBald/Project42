import TopicsAxios from "../services/TopicsAxios";

const updateTopicOnDB = (topicDraft, currTopicIndex) => {
  console.log("updateTopicOnDB.js: topicDraft=", topicDraft);
  console.log("updateTopicOnDB.js: currTopicIndex=", currTopicIndex);

  if (topicDraft) {

    return TopicsAxios.update(topicDraft._id, topicDraft)
      .then((response) => {
        console.log("updateTopicOnDB.js: after sending topic to DB, response msg=", response.data);
      })
      .catch((err) => {
        console.log("updateTopicOnDB error:", err);
      });

  } else {
    console.log("updateTopicOnDB.js: Error - received falsy topicDraft");
    return null
  }
}

export default updateTopicOnDB;