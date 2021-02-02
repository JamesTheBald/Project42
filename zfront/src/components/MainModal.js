import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import convertISODate from "../functions/convertISODate";
import retrievePostings from "../functions/retrievePostings";
import deletePost from "../functions/deletePost";
import updatePostingsDB from "../functions/updatePostingsDB";
// import DisplayHeadingForCreateCase from "./DisplayHeadingCreateCase";


const MainModal = (props) => {

  //J: I like to leave out a letter or 2 from the names of variables that are actually just references to the original variable.
  const emptyPst = props.emptyPst;
  let showMainModl = props.showMainModl;
  let currPostIndx = props.currPostIndx;
  const setShowMainModl = props.setShowMainModl;
  const setPostingsDataArr = props.setPostingsDataArr;
  let postingsDataArr = props.postingsDataArr;
  let createCaseHeadng = props.createCaseHeadng;
  // let creatingNewPst = props.creatingNewPst;                //J: should be using useRef instead of useState?
  // const setCreatingNewPst = props.setCreatingNewPst;

  // let displayCreatePostCase = useRef(false);
  // let alreadyAppended = useRef(false);


  console.log("MainModal.js Begins.");
  console.log("MainModal.js begins. emptyPst=", emptyPst);
  console.log("MainModal.js begins. currPostIndx=", currPostIndx);
  console.log("MainModal.js begins. postingsDataArr=", postingsDataArr);
  console.log("MainModal.js begins. createCaseHeadng = ",createCaseHeadng)
  // console.log("MainModal.js begins. creatingNewPst=", creatingNewPst);

  

  const handleInputChange = (evnt) => {          //J: This could be called updatePostingsDataArray()
    //   Assumes postingsDataArray != null,  currPostIndex >= 0

    const { name, value } = evnt.target;
    const currPost = postingsDataArr[currPostIndx];
    const alteredPost = { ...currPost, [name]: value };
    // NB The brackets [] around 'name' in the above line are so that js
    // uses the VALUE of name for the key and not just the string 'name'.

    console.log("MainModal.js: handleInputChange: value =", value);
    console.log("MainModal.js: handleInputChange: name =", name);
    console.log("MainModal.js: handleInputChange: postings[currPostIndex] =", currPost);
    console.log("MainModal.js: handleInputChange: newPost =", alteredPost);

    setPostingsDataArr((currDataArr) => {
      let newPostingsArr = [...currDataArr];
      newPostingsArr[currPostIndx] = alteredPost;
      console.log("MainModal.js: handleInputChange: newPostingsArray =", newPostingsArr);
      return newPostingsArr;
   });
  };


  return (
    <>
      <Modal size="lg" centered show={showMainModl} animation={false} onHide={() => setShowMainModl(false)}>

        <Modal.Header closeButton>
          {createCaseHeadng}
        </Modal.Header>

        <Modal.Body>
          <>
            <input
              name="title"
              type="text"
              required
              className="text-xl w-full p-1 font-500 focus:bg-gray-200 hover:bg-gray-200"
              placeholder="Enter title of posting here"
              value={postingsDataArr[currPostIndx].title}
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
              placeholder="Enter names of contributors here (Firstname, last Initial)"
              value={postingsDataArr[currPostIndx].contributors}
              onChange={handleInputChange}
            />
          </div>

          {(createCaseHeadng) ? (
            <div className="flex flex-row p-1 mt-2">   {/* Dates are read-only, and only shown for existing posts */}

              <div className="flex flex-row">
                <div className="font-500">Created:</div>
                <div className="ml-2 font-400">{convertISODate(postingsDataArr[currPostIndx].createdAt)}</div>
              </div>

              <div className="flex flex-row ml-6">
                <div className="font-500">Modified:</div>
                <div className="ml-2 font-400">{convertISODate(postingsDataArr[currPostIndx].updatedAt)}</div>
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
              placeholder="Enter tags/keywords here"
              value={postingsDataArr[currPostIndx].tags}
              onChange={handleInputChange}
            />
          </div>

          <input
            name="description"                              //J: I'd like to change this to 'content' 
            type="text"
            required
            className="modalField"
            placeholder="Enter content of post here"
            value={postingsDataArr[currPostIndx].description}                         //J: I'd like to change this to '.content' 
            onChange={handleInputChange}
          />

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Content Type:</div>
            <input
              name="contentType"
              type="text"
              required
              className="modalField"
              placeholder="Enter type of content (Text, file, etc.)"
              value={postingsDataArr[currPostIndx].contentType}
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
                value={postingsDataArr[currPostIndx].spiciness}
                defaultValue="0"
                onChange={handleInputChange}
              >
                Spiciness
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" value="1">Mild</Dropdown.Item>
                <Dropdown.Item href="#/action-2" value="2">Medium</Dropdown.Item>
                <Dropdown.Item href="#/action-3" value="3">Spicy</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Upvotes:</div>          {/*J: Need to add Collin's counter code here */}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="warning"
            onClick={ () => {
            retrievePostings(setPostingsDataArr, emptyPst);   
               // The above line will refresh postingsDataArray, undoing the changes to postingsDataArray[currPostIndex]
            setShowMainModl(false);
            }}
          >
            Abandon Changes
          </Button>

          <Button
            variant="danger"
            onClick={() => {
            deletePost(postingsDataArr, setPostingsDataArr, currPostIndx);    // This will refresh postingsDataArray
            setShowMainModl(false);
            }}
          >
            Delete Post       {/* Add an icon? */}
          </Button>

          <Button
            color="green"
            type="submit"
            onClick={ () => {
            updatePostingsDB(postingsDataArr, currPostIndx);       // This will NOT refresh postingsDataArray, but 
            setShowMainModl(false);                            // handleInputChange() should keep postingsDataArray up to date
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
