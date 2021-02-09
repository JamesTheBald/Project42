import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';


const RichTextEditor = (props) => {



  // Declare variables
    let postDraft = props.postDraft;
    const setPostDraft = props.setPostDraft;
    const [showToolbar, setShowToolbar] = useState(false)


  // Declare functions

  const handleSunEditorChange = (content) => {

    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, content: content };
      return newPostDraft;
   });
  };





  // Declare what the component renders
  return(
    <>
      <SunEditor
        name="content"
        type="text"
        className="modalField"
        placeholder="Don't forget a note with your post!"
        value={postDraft.content}
        setContents={postDraft.content}
        autoFocus={false}
        showToolbar={showToolbar}
        onFocus={() => {
          setShowToolbar(true)
        }}
        onBlur={() => {
          setShowToolbar(false)
        }}
        onChange={handleSunEditorChange}
        setOptions={{
          height: 200,
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["removeFormat"],
            "/",
            ["fontColor", "hiliteColor"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "table"],
            ["link", "image", "video"],
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["save", "template"]
          ],
        }}
      >
      </SunEditor>
    </>
  );
}

export default RichTextEditor;