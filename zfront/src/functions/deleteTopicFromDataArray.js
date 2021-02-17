const deleteTopicFromDataArray = (topicDataArray, setTopicDataArray, currTopicIndex) => {
  
  console.log("deleteTopicFromDataArray.js - topicDataArray=",topicDataArray);
  console.log("deleteTopicFromDataArray.js - currTopicIndex=",currTopicIndex);

  setTopicDataArray((currDataArr) => {
    let newTopicArr = [...currDataArr];
    newTopicArr.splice(currTopicIndex,1);       // remove 1 item by index
    console.log("deleteTopic.js- newTopicArr =", newTopicArr);
    return newTopicArr;
  })
};

export default deleteTopicFromDataArray
