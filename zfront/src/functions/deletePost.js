import deletePostFromDB from "../functions/deletePostFromDB";
import deletePostFromDataArray from "../functions/deletePostFromDataArray";


const deletePost = (postDraft, postingsDataArray, setPostingsDataArray, currPostIndex, setShowMainModal, creatingPostFlag) => {
  console.log("deletePost.js Clicked Delete Post")
  if (!creatingPostFlag && (postingsDataArray?.[currPostIndex]?._id)) {   
    // Only delete if the post isn't newly created and it exists on the database, ie. has an _id number

    console.log("deletePost.js archiving: currPostIndex=", currPostIndex);

    deletePostFromDB(postDraft);
    deletePostFromDataArray(postingsDataArray, setPostingsDataArray, currPostIndex);
  } else {
    console.log("deletePost.js 'Delete Post' clicked but Creating Post or postingsDataArray[currentPostIndex] has bad ._id")
  }
  setShowMainModal(false);
}

export default deletePost;
