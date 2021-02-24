import updatePostOnDB from "../functions/updatePostOnDB";
import updateTopicOnDB from "../functions/updateTopicOnDB";


const unlockAll = (postingsDataArray, topicsDataArray) => {

  postingsDataArray.map((post, index) => {
    console.log("unlockAll.js runs...")
    post = { ...post, locked: false };
    updatePostOnDB(post, index);
  })

  topicsDataArray.map((topic, index) => {

    topic = { ...topic, locked: false };
    updateTopicOnDB(topic, index);
  })
}

export default unlockAll;
