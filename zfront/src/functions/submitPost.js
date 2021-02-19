import retrievePosts from "../functions/retrievePosts";
import createPostOnDB from "../functions/createPostOnDB";
import updatePostOnDB from "../functions/updatePostOnDB";
import createPostOnDataArray from "../functions/createPostOnDataArray";
import updatePostOnDataArray from "../functions/updatePostOnDataArray";

const submitPost = (
  emptyPost,
  postDraft,
  postingsDataArray,
  setPostingsDataArray,
  currPostIndex,
  setShowMainModal,
  creatingPostFlag,
  recdLog
) => {
  console.log("submitPost.js Clicked 'Save Post' creatingPostFlag=", creatingPostFlag);
  recdLog && console.log("submitPost.js saving to postingsDataArray=", postingsDataArray);
  recdLog && console.log("submitPost.js saving postDraft=", postDraft);

  if (creatingPostFlag) {
    console.log("submitPost.js running createPostOnDB and createPostOnDataArray");

    createPostOnDataArray(setPostingsDataArray, postDraft);
    createPostOnDB(postDraft).then(() => {
      retrievePosts(setPostingsDataArray, emptyPost); // Time for a hard-update
    });
  } else {
    if (postingsDataArray?.[currPostIndex]?._id) {
      console.log("submitPost.js running updatePostOnDB and updatePostOnDataArray");
      updatePostOnDataArray(setPostingsDataArray, postDraft, currPostIndex);
      updatePostOnDB(postDraft, currPostIndex).then(() => {
        retrievePosts(setPostingsDataArray, emptyPost); // Time for a hard-update
      });
    } else {
      console.log("submitPost.js 'Save Post' clicked but postingsDataArray[currentPostIndex] has bad ._id!!");
    }
  }
  setShowMainModal(false);
};

export default submitPost;
