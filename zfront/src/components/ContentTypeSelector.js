import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const ContentTypeSelector = (props) => {

  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;

  const changeContentType = (passedContentType) => {
    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, contentType: passedContentType };
      return newPostDraft;
   });
  };


  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="text-sm lg:text-md bg-gray-200 border-none text-blue-600 p-0">
          {(postDraft.contentType === "") ?
            <>Primary Content Type</>
            :
            <>{postDraft.contentType}</>
          }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => {changeContentType("Text")}}>Text</Dropdown.Item>
          <Dropdown.Item onClick={() => {changeContentType("Links")}}>Links</Dropdown.Item>
          <Dropdown.Item onClick={() => {changeContentType("Video")}}>Video</Dropdown.Item>
          <Dropdown.Item onClick={() => {changeContentType("PDF")}}>PDF</Dropdown.Item>
          <Dropdown.Item onClick={() => {changeContentType("Code")}}>Code</Dropdown.Item>
          <Dropdown.Item onClick={() => {changeContentType("Audio")}}>Audio</Dropdown.Item>
          <Dropdown.Item onClick={() => {changeContentType("Other")}}>Other</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ContentTypeSelector;