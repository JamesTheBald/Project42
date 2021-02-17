import TopicsAxios from "../services/TopicsAxios";

const deleteTopicFromDB = (topicsDataArray, currTopicIndex) => {
  console.log("deleteTopicFromDB.js- topicsDataArray=",topicsDataArray);
  console.log("deleteTopicFromDB.js- currTopicIndex=",currTopicIndex);

  let fnReturn

  if (topicsDataArray?.length>0) {
    TopicsAxios.remove(topicsDataArray[currTopicIndex]._id)
    .then((response) => {
      fnReturn = response;
      console.log("deleteTopic.js- response=", response);
    })
    .catch((err) => {
      fnReturn = err;
      console.log(err);
    });
  } else {
    console.log("deleteTopic.js, Error - received null or empty array");
  }
  return fnReturn
};

export default deleteTopicFromDB
