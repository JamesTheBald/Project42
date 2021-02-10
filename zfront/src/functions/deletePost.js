import deletePostFromDB from "../functions/deletePostFromDB";
import deletePostFromDataArray from "../functions/deletePostFromDataArray";


const deletePost = (postDraft, postingsDataArray, setPostingsDataArray, currPostIndex, setShowMainModal, creatingPostFlag) => {

  console.log("MainModal.js Clicked Delete Post")
  if (!creatingPostFlag && (postingsDataArray?.[currPostIndex]?._id)) {   
      // Only delete if editing post that exists on the database, ie. has an _id number

    console.log("MainModal.js Clicked Delete Post creatingPostFlag=", creatingPostFlag);
    console.log("MainModal.js Clicked Delete Post postDraft=", postDraft);
    console.log("MainModal.js Clicked Delete Post postingsDataArray=", postingsDataArray);

    deletePostFromDB(postingsDataArray, currPostIndex);
    deletePostFromDataArray(postingsDataArray, setPostingsDataArray, currPostIndex);
  } else {
    console.log("MainModal.js 'Delete Post' clicked but Creating Post or postingsDataArray[currentPostIndex] has bad ._id")
  }
  setShowMainModal(false);
}

export default deletePost;
