import updateTopicOnDB from "../functions/updateTopicOnDB";


const lockTopic = (topic, index) => {

  console.log("lockTopic.js runs...");
  topic = { ...topic, locked: true };

  updateTopicOnDB(topic, index)
  
  //.then((response) => {
  //  console.log("lockTopic.js updateTopicOnDB response msg=", response.data);   //response=", response);
  //});
}

export default lockTopic;