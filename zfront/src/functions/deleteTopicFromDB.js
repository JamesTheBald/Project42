import TopicsAxios from "../services/TopicsAxios";

const deleteTopicFromDB = (topicDraft) => {
  
  if (topicDraft) {
    console.log("deleteTopicFromDB.js: writing topicDraft=", { ...topicDraft, archived: true });

    return TopicsAxios.update(topicDraft._id, { ...topicDraft, archived: true })
      .then((response) => {
        console.log("deleteTopicFromDB.js: after sending topic to DB, response msg=", response.data);
      })
      .catch((err) => {
        console.log("deleteTopicFromDB error:", err);
      });

  } else {
    console.log("deleteTopicFromDB.js: Error - received falsy topicDraft");
    return null
  }
}

export default deleteTopicFromDB;