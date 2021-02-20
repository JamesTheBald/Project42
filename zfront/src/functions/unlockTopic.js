import updateTopicOnDB from "../functions/updateTopicOnDB";


const unlockTopic = (topic, index, recdLog) => {
  
  recdLog && console.log("unlockTopic.js updateTopicOnDB topic=", topic);
  topic = { ...topic, locked: false };

  updateTopicOnDB(topic, index).then((response) => {
    console.log("unlockTopic.js updateTopicOnDB response=", response);
  });
}

export default unlockTopic;