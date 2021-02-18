const updateTopicOnDataArray = (setTopicsDataArray, topicDraft, currTopicIndex) => {

  setTopicsDataArray((currDataArr) => {
    let newTopicsArr = [...currDataArr];
    newTopicsArr.splice(currTopicIndex, 1, topicDraft);       // swap old topic with topicDraft, by index
    console.log("updateTopicsDataArray.js- setting topicsDataArray to", newTopicsArr);
    return newTopicsArr;
  })
}

export default updateTopicOnDataArray;
