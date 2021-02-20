import retrieveTopics from "../functions/retrieveTopics";
import createTopicOnDB from "../functions/createTopicOnDB";
import updateTopicOnDB from "../functions/updateTopicOnDB";
import createTopicOnDataArray from "../functions/createTopicOnDataArray";
import updateTopicOnDataArray from "../functions/updateTopicOnDataArray";

const submitTopic = (
  emptyTopic,
  topicDraft,
  topicsDataArray,
  setTopicsDataArray,
  currTopicIndex,
  setShowTopicModal,
  creatingTopicFlag,
  recdLog
) => {
  console.log("submitTopic.js Clicked 'Save Topic' creatingTopicFlag=", creatingTopicFlag);
  recdLog && console.log("submitTopic.js saving to topicsDataArray=", topicsDataArray);
  recdLog && console.log("submitTopic.js saving topicDraft=", topicDraft);

  if (creatingTopicFlag) {
    console.log("submitTopic.js running createTopicOnDB and createTopicOnDataArray");
    createTopicOnDataArray(setTopicsDataArray, topicDraft);
    createTopicOnDB(topicDraft).then(() => {
      retrieveTopics(setTopicsDataArray, emptyTopic); // Time for a hard-update
    });
  } else {
    if (topicsDataArray?.[currTopicIndex]?._id) {
      console.log("submitTopic.js running updateTopicOnDB and updateTopicOnDataArray");
      updateTopicOnDataArray(setTopicsDataArray, topicDraft, currTopicIndex);
      updateTopicOnDB(topicDraft, currTopicIndex).then(() => {
        retrieveTopics(setTopicsDataArray, emptyTopic); // Time for a hard-update
      });
    } else {
      console.log("submitTopic.js 'Save Topic' clicked but topicsDataArray[currentTopicIndex] has bad ._id!!");
    }
  }
  setShowTopicModal(false);
};

export default submitTopic;
