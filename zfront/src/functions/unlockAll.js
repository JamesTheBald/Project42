import updatePostOnDB from "../functions/updatePostOnDB";
import updateTopicOnDB from "../functions/updateTopicOnDB";


const unlockAll = (postingsDataArray, topicsDataArray) => {

  postingsDataArray.map((post, index) => {

    post = { ...post, locked: false };
    updatePostOnDB(post, index).then((response) => {
      console.log("unlockAll.js updatePostOnDB index=",index,", response=", response);
    });
  })

  topicsDataArray.map((topic, index) => {

    topic = { ...topic, locked: false };
    updateTopicOnDB(topic, index).then((response) => {
      console.log("unlockAll.js updateTopicOnDB index=",index,", response=", response);
    });
  })

}

export default unlockAll;
