import retrievePostings from "../functions/retrievePostings";
import createPostOnDB from "../functions/createPostOnDB";
import updatePostOnDB from "../functions/updatePostOnDB";
import createPostOnDataArray from "../functions/createPostOnDataArray";
import updatePostOnDataArray from "../functions/updatePostOnDataArray";



const submitPost = (props) => {

  const emptyPost = props.emptyPost;
  const postDraft = props.postDraft;
  const postingsDataArray = props.postingsDataArray;
  const setPostingsDataArray = props.setPostingsDataArray;
  const currPostIndex = props.currPostIndex;
  const setShowMainModal = props.setShowMainModal;
  const creatingPostFlag = props.creatingPostFlag;


  console.log("MainModal.js Clicked 'Save Post' creatingPostFlag=", creatingPostFlag);
  console.log("MainModal.js Clicked 'Save Post' postDraft=", postDraft);
  console.log("MainModal.js Clicked 'Save Post' postingsDataArray=", postingsDataArray);

  if (creatingPostFlag) {
    console.log("MainModal.js creatingPostFlag=true so running createPostOnDB and createPostOnDataArray")
    createPostOnDataArray(setPostingsDataArray, postDraft);
    createPostOnDB(postDraft)
      .then((response) => {
        console.log("MainModal.js Clicked 'Save Post' NOT creatingPost createPostOnDB response=",response)
        retrievePostings(setPostingsDataArray, emptyPost);   // Time for a hard-update
    })
  } else {
    if (postingsDataArray?.[currPostIndex]?._id) {
      console.log("MainModal.js NOT creatingPost so running updatePostOnDB and updatePostOnDataArray")
      updatePostOnDataArray(setPostingsDataArray, postDraft, currPostIndex)

      updatePostOnDB(postDraft, currPostIndex)
        .then((response) => {
          console.log("MainModal.js Clicked 'Save Post' NOT creatingPost updatePostOnDB response=",response)
          retrievePostings(setPostingsDataArray, emptyPost);   // Time for a hard-update
      })
    } else {
      console.log("MainModal.js 'Save Post' clicked but postingsDataArray[currentPostIndex] has bad ._id!!")
    }
  }
  setShowMainModal(false);
}

export default submitPost;

