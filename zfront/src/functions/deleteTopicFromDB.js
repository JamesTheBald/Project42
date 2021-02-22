import TopicsAxios from "../services/TopicsAxios";

const deleteTopicFromDB = (topicDraft, setTopicDraft) => {
  
  if (topicDraft) {
    
    setTopicDraft((currDraft) => {
      const newTopicDraft = { ...currDraft, archived: true };
      return newTopicDraft;
    })
    console.log("deleteTopicFromDB.js: writing topicDraft=", topicDraft);

    return TopicsAxios.update(topicDraft._id, topicDraft)
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