import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';


const RichTextEditor = (props) => {

  const [showToolbar, setShowToolbar] = useState(false);
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  const setShowMainModalFooter = props.setShowMainModalFooter;


  const handleSunEditorChange = (content) => {

    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, content: content };
      return newPostDraft;
   });
  };


  return(
    <>
      <SunEditor
        lang="en"
        name="content"
        type="text"
        // className="modalField"
        placeholder="Click to edit content"
        value={postDraft.content}
        setContents={postDraft.content}
        autoFocus={false}
        showToolbar={showToolbar}
        onFocus={() => {
          setShowToolbar(true)
          setShowMainModalFooter(false)
        }}
        onBlur={() => {
          setShowToolbar(false)
          setShowMainModalFooter(true)
        }}
        onChange={handleSunEditorChange}
        setOptions={{
          height: "auto",
          maxHeight: 600,
          defaultStyle: 'font-family: Arial; font-size: 16px;',
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