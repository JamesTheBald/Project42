import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import convertISODate from "../functions/convertISODate";
import retrievePostings from "../functions/retrievePostings";
import deletePost from "../functions/deletePost";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import VoteCounter from './VoteCounter'
// import DisplayHeadingForCreateCase from "./DisplayHeadingCreateCase";
import updatePostOnDB from "../functions/updatePostOnDB";
import createPostOnDB from "../functions/createPostOnDB";


const MainModal = (props) => {

  const emptyPostArray = props.emptyPostArray;
  let showMainModal = props.showMainModal;
  let currPostIndex = props.currPostIndex;
  const setShowMainModal = props.setShowMainModal;
  const setPostingsDataArray = props.setPostingsDataArray;
  let postingsDataArray = props.postingsDataArray;
  let showDates = props.showDates;
  let voteTotal = props.voteCount;
  const setVoteCount = props.setVoteCount;


  console.log("MainModal.js Begins.");
  console.log("MainModal.js begins. emptyPostArray=", emptyPostArray);
  console.log("MainModal.js begins. currPostIndex=", currPostIndex);
  console.log("MainModal.js begins. postingsDataArray=", postingsDataArray);


  const handleInputChange = (evnt) => {          //J: This could be called updatePostingsDataArray()
    //   Assumes postingsDataArray != null,  currPostIndex >= 0

    const { name, value } = evnt.target;
    const currPost = postingsDataArray[currPostIndex];
    const alteredPost = { ...currPost, [name]: value };
    // NB The brackets [] around 'name' in the above line are so that js
    // uses the VALUE of name for the key and not just the string 'name'.

    // console.log("MainModal.js: handleInputChange: value =", value);
    // console.log("MainModal.js: handleInputChange: name =", name);
    // console.log("MainModal.js: handleInputChange: postings[currPostIndex] =", currPost);
    // console.log("MainModal.js: handleInputChange: newPost =", alteredPost);

    setPostingsDataArray((currDataArr) => {
      let newPostingsArr = [...currDataArr];
      newPostingsArr[currPostIndex] = alteredPost;
      console.log("MainModal.js: handleInputChange: newPostingsArray =", newPostingsArr);
      return newPostingsArr;
   });
  };


  return (
    <>
      <Modal size="lg" centered show={showMainModal} animation={false} onHide={() => setShowMainModal(false)}>

        <Modal.Body>
          <>
            <input
              name="title"
              type="text"
              required
              className="text-xl w-full p-1 font-500 focus:bg-gray-200 hover:bg-gray-200"
              placeholder="Post title"
              value={postingsDataArray[currPostIndex].title}
              onChange={handleInputChange}            // Try onBlur ??
            />
          </>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Contributors:</div>        {/* font-500 is Tailwind for bold */}
            <input
              name="contributors"
              type="text"
              required
              className="modalField"
              placeholder="Contributors (first name, last initial)"
              value={postingsDataArray[currPostIndex].contributors}
              onChange={handleInputChange}
            />
          </div>

          {(showDates) ? (
            <div className="flex flex-row p-1 mt-2">   {/* Dates are read-only, and only shown for existing posts */}

              <div className="flex flex-row">
                <div className="font-500">Created:</div>
                <div className="ml-2 font-400">{convertISODate(postingsDataArray[currPostIndex].createdAt)}</div>
              </div>

              <div className="flex flex-row ml-6">
                <div className="font-500">Modified:</div>
                <div className="ml-2 font-400">{convertISODate(postingsDataArray[currPostIndex].updatedAt)}</div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Tags:</div>
            <input
              name="tags"
              type="text"
              required
              className="modalField"
              placeholder="Relevant tags"
              value={postingsDataArray[currPostIndex].tags}
              onChange={handleInputChange}
            />
          </div>


          {/* TO DO LATER: Make a function that only renders the SunEditor onClick */}

          <SunEditor
            name="description"                              //J: I'd like to change this to 'content' 
            type="text"
            required
            className="modalField"
            placeholder="What would you like to share?"
            value={postingsDataArray[currPostIndex].description}                         //J: I'd like to change this to '.content' 
            onChange={handleInputChange}
            // onClick={renderSunEditor}
          >
          </SunEditor>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Content Type:</div>
            <input
              name="contentType"
              type="text"
              required
              className="modalField"
              placeholder="Primary content type (Text, video, etc.)"
              value={postingsDataArray[currPostIndex].contentType}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"       //J: How about we change this to checkboxes, so it's easy to select more than 1
                id="dropdown-basic"
                name="spiciness"
                required
                className="modalField"
                value={postingsDataArray[currPostIndex].spiciness}
                defaultValue="0"
                onChange={handleInputChange}
              >
                Spiciness
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item value="1">Mild</Dropdown.Item>
                <Dropdown.Item value="2">Medium</Dropdown.Item>
                <Dropdown.Item value="3">Spicy</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <VoteCounter voteCount={voteTotal} setVoteCount={setVoteCount}></VoteCounter>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="warning"
            onClick={ () => {
            retrievePostings(setPostingsDataArray, emptyPostArray);   
               // The above line will refresh postingsDataArray, undoing the changes to postingsDataArray[currPostIndex]
            setShowMainModal(false);
            }}
          >
            Abandon Changes
          </Button>

          <Button
            variant="danger"
            onClick={() => {
            deletePost(postingsDataArray, setPostingsDataArray, currPostIndex);    // This will refresh postingsDataArray
            setShowMainModal(false);
            }}
          >
            Delete Post       {/* Add an icon? */}
          </Button>

          <Button
            color="green"
            type="submit"
            onClick={ () => {
              (currPostIndex) ? (
                updatePostOnDB(postingsDataArray, currPostIndex)     // This will NOT refresh postingsDataArray, but 
               ) : (                                              // handleInputChange() should keep postingsDataArray up to date
                createPostOnDB(postingsDataArray, currPostIndex)
               )

          

            setShowMainModal(false); 
            }}
          >
            Save Post         {/* Add an icon? */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MainModal;
