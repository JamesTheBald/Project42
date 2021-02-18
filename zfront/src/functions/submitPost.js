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
  recdLog && console.log("submitPost.js Clicked 'Save Post' postDraft=", postDraft);
  recdLog && console.log("submitPost.js Clicked 'Save Post' postingsDataArray=", postingsDataArray);

  if (creatingPostFlag) {
    console.log("submitPost.js creatingPostFlag=true so running createPostOnDB and createPostOnDataArray");
    createPostOnDataArray(setPostingsDataArray, postDraft);
    createPostOnDB(postDraft).then((response) => {
      console.log("submitPost.js Clicked 'Save Post' NOT creatingPost createPostOnDB response=", response);
      retrievePosts(setPostingsDataArray, emptyPost); // Time for a hard-update
    });
  } else {
    if (postingsDataArray?.[currPostIndex]?._id) {
      console.log("submitPost.js NOT creatingPost so running updatePostOnDB and updatePostOnDataArray");
      updatePostOnDataArray(setPostingsDataArray, postDraft, currPostIndex);

      updatePostOnDB(postDraft, currPostIndex).then((response) => {
        console.log("submitPost.js Clicked 'Save Post' NOT creatingPost updatePostOnDB response=", response);
        retrievePosts(setPostingsDataArray, emptyPost); // Time for a hard-update
      });
    } else {
      console.log("submitPost.js 'Save Post' clicked but postingsDataArray[currentPostIndex] has bad ._id!!");
    }
  }
  setShowMainModal(false);
};

export default submitPost;
