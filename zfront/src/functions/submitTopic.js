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
  creatingTopicFlag
) => {
  console.log("submitTopic.js Clicked 'Save Topic' creatingTopicFlag=", creatingTopicFlag);
  console.log("submitTopic.js Clicked 'Save Topic' topicDraft=", topicDraft);
  console.log("submitTopic.js Clicked 'Save Topic' topicsDataArray=", topicsDataArray);

  if (creatingTopicFlag) {
    console.log("submitTopic.js creatingTopicFlag=true so running createTopicOnDB and createTopicOnDataArray");
    createTopicOnDataArray(setTopicsDataArray, topicDraft);
    createTopicOnDB(topicDraft).then((response) => {
      console.log("submitTopic.js Clicked 'Save Topic' NOT creatingTopic createTopicOnDB response=", response);
      retrieveTopics(setTopicsDataArray, emptyTopic); // Time for a hard-update
    });
  } else {
    if (topicsDataArray?.[currTopicIndex]?._id) {
      console.log("submitTopic.js NOT creatingTopic so running updateTopicOnDB and updateTopicOnDataArray");
      updateTopicOnDataArray(setTopicsDataArray, topicDraft, currTopicIndex);

      updateTopicOnDB(topicDraft, currTopicIndex).then((response) => {
        console.log("submitTopic.js Clicked 'Save Topic' NOT creatingTopic updateTopicOnDB response=", response);
        retrieveTopics(setTopicsDataArray, emptyTopic); // Time for a hard-update
      });
    } else {
      console.log("submitTopic.js 'Save Topic' clicked but topicsDataArray[currentTopicIndex] has bad ._id!!");
    }
  }
  setShowTopicModal(false);
};

export default submitTopic;
