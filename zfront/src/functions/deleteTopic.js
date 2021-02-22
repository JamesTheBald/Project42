import deleteTopicFromDB from "../functions/deleteTopicFromDB";
import deleteTopicFromDataArray from "../functions/deleteTopicFromDataArray";


const deleteTopic = (topicDraft, setTopicDraft, topicsDataArray, setTopicsDataArray, currTopicIndex, setShowTopicModal, creatingTopicFlag) => {
  console.log("deleteTopic.js Clicked Delete Topic")
  
  if (!creatingTopicFlag && (topicsDataArray?.[currTopicIndex]?._id)) {   
      // Only delete if editing topic that exists on the database, ie. has an _id number

    console.log("deleteTopic.js archiving: creatingTopicFlag=", creatingTopicFlag);
    console.log("deleteTopic.js archiving: topicDraft=", topicDraft);
    console.log("deleteTopic.js archiving: topicsDataArray=", topicsDataArray);

    deleteTopicFromDB(topicDraft, setTopicDraft);
    deleteTopicFromDataArray(topicsDataArray, setTopicsDataArray, currTopicIndex);
  } else {
    console.log("deleteTopic.js 'Delete Topic' clicked but Creating Topic or topicsDataArray[currentTopicIndex] has bad ._id")
  }
  setShowTopicModal(false);
}

export default deleteTopic;
