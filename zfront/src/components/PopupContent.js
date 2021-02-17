import React, { useState } from "react";
import convertISODate from "./../functions/convertISODate";
// import submitPost from "./../functions/submitPost";
// import updatePostDataArray from "./../functions/updatePostOnDataArray";
// import updatePostOnDB from "./../functions/updatePostOnDB";

const PopupContent = (props) => {

  const title = props.post.title;
  const contributors = props.post.contributors;
  const lastUpdated = props.post.updatedAt;
  const currPurpose = props.post.purpose;
  // let postDraft = props.postDraft;
  // const setPostDraft = props.setPostDraft;

  const [purpose, setPurpose] = useState(currPurpose);
  const [hidePurpose, setHidePurpose] = useState(false);
  const [hideTextArea, setHideTextArea] = useState(true);
  const [editOrDoneButton, setHideEditOrDoneButton] = useState("Edit");


  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  }


  // const submitPurposeChange = () => {
  //     setPostDraft((currDraft) => {
  //       const newPostDraft = { ...currDraft, purpose: purpose };
  //       return newPostDraft;
  //     });
  //     updatePostDataArray();
  //     updatePostOnDB();
  // }



  return (
    <>
      <div hidden={hidePurpose} className="text-xs mb-4"> {purpose} </div>
      <textarea 
        hidden={hideTextArea}
        className="text-xs mb-4 w-full p-2"
        value={purpose}
        onChange={handlePurposeChange}
      />

      {title ? 
        <div className="text-xs"> {title} </div>
      :
        <div>Click to edit</div>
      }

      <div className="text-xs text-gray-600">{contributors}</div>

      <div className="text-xs text-gray-600">Last Updated: {convertISODate(lastUpdated)}</div>

      <div
        name="edit-done-Button"
        className="text-xs text-gray-600 underline float-right w-1/8 cursor-pointer"
        onClick={() => {
          (editOrDoneButton === "Edit") ? 
            setHidePurpose(true) &
            setHideTextArea(false) &
            setHideEditOrDoneButton("Done")
          :
            // submitPurposeChange() &
            setHidePurpose(false) &
            setHideTextArea(true) &
            setHideEditOrDoneButton("Edit")
        }}
      >
        {editOrDoneButton}
      </div>
    </>
  )
}

export default PopupContent;
