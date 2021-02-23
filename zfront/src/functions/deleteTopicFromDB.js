import TopicsAxios from "../services/TopicsAxios";

const deleteTopicFromDB = (topicDraft) => {
  
  if (topicDraft) {

    const archivedDraft = { ...topicDraft, archived: true };
    console.log("deleteTopicFromDB.js: writing topicDraft=", archivedDraft);

    return TopicsAxios.update(archivedDraft._id, archivedDraft)
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