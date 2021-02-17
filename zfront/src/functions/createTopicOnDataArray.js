const createTopicOnDataArray = (setTopicsDataArray, topicDraft) => {

  console.log("createTopicOnDataArray.js topicDraft=",topicDraft);

  setTopicsDataArray((currDataArr) => {
    let newTopicsArr = [...currDataArr];
    newTopicsArr.push(topicDraft);
    console.log("createTopicsDataArray.js- newTopicsArr =", newTopicsArr);
    return newTopicsArr;
  })
}

export default createTopicOnDataArray;
