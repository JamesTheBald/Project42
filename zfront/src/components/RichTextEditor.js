import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';


const RichTextEditor = (props) => {

  const [showToolbar, setShowToolbar] = useState(false)
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;


  // Declare functions
  const handleSunEditorChange = (content) => {

    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, content: content };
      return newPostDraft;
   });
  };


  return(
    <>
      <SunEditor
        name="content"
        type="text"
        className="modalField"
        placeholder="Click to edit content"
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
            ["font", "fontSize", "formatBlock", "textStyle"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["removeFormat"],
            ["-right", "fullScreen"],
            "/",
            ["fontColor", "hiliteColor"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "table"],
            ["link", "image", "video"],
            ['-right', ':i-More Misc-default.more_vertical', 'showBlocks', 'codeView', 'preview', 'print'],

          ],
        }}
      >
      </SunEditor>
    </>
  );
}

export default RichTextEditor;