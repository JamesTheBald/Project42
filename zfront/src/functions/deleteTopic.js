import deleteTopicFromDB from "../functions/deleteTopicFromDB";
import deleteTopicFromDataArray from "../functions/deleteTopicFromDataArray";


const deleteTopic = (topicDraft, topicsDataArray, setTopicsDataArray, currTopicIndex, setShowTopicModal, creatingTopicFlag) => {
  console.log("TopicModal.js Clicked Delete Topic")
  if (!creatingTopicFlag && (topicsDataArray?.[currTopicIndex]?._id)) {   
      // Only delete if editing topic that exists on the database, ie. has an _id number

    console.log("TopicModal.js archiving: currTopicIndex=", currTopicIndex);

    deleteTopicFromDB(topicDraft);
    deleteTopicFromDataArray(topicsDataArray, setTopicsDataArray, currTopicIndex);
  } else {
    console.log("deleteTopic.js 'Delete Topic' clicked but Creating Topic or topicsDataArray[currentTopicIndex] has bad ._id")
  }
  setShowTopicModal(false);
}

export default deleteTopic;
