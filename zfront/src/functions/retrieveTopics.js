import TopicsAxios from "../services/TopicsAxios";

const retrieveTopics = (setTopicsDataArray, emptyTopic) => {
  console.log("Running retrieveTopics.js")

  TopicsAxios.getAll()
    .then((response) => {
      console.log('retrieveTopics.js response.data=', response.data);

      setTopicsDataArray( () => {
        let newTopicsDataArr = [emptyTopic];

        if (response.data?.length>0) {
          newTopicsDataArr = response.data;
          console.log("retrieveTopics.js response.data.length>0 so using setTopicsDataArray (response.data)");
        } else {
          // else leave newTopicsDataArr = [emptyTopic]
          console.log("retrieveTopics.js response.data.length<=0 so using setTopicsDataArray ([emptyTopic])");
        }
        return newTopicsDataArr;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default retrieveTopics;