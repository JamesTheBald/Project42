import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import convertISODate from "../functions/convertISODate";


const MainModal = (props) => {

  const emptyPst = props.emptyPst;
  let currPostIndx = props.currPostIndx; 
  const setCurrPostIndx = props.setCurrPostIndx;
  let postingsDataArr = props.postingsDataArr;    // will this change? If so, switch to const
  const setPostingsDataArr = props.setPostingsDataArr

  console.log("MainModal.js: emptyPst=", emptyPst);
  console.log("MainModal.js: currPostIndx=", currPostIndx);
  console.log("MainModal.js: postingsDataArr=", postingsDataArr);
  console.log("MainModal.js: setPostingsDataArr=", setPostingsDataArr);
  
  let isNewPost = false;
  let pst = emptyPst;

  if (currPostIndx === -1) {   
    setCurrPostIndx( () => postingsDataArr.length);
    isNewPost = true;

    setPostingsDataArray( currDataArr => {
      let newPostingsArr = [...currDataArr];
      newPostingsArr.push(pst);
      console.log("handleInputChange: newPostingsArray =",newPostingsArr)
      return newPostingsArr;
    })

  } else {
    pst = postingsDataArray[currPostIndx];
    isNewPost = false;
  }


  return (
    <>
      <Modal size="lg" centered show={showMainModal} onHide={() => setShowMainModal(false)} animation={false}>
        <Modal.Header closeButton>
          {(isNewPost) ? (
            <div className="text-2xl">Create Post</div>
          ) : (
            <></>
          )}
        </Modal.Header>

        <Modal.Body>
          <>
            <input
              name="title"
              type="text"
              required="true"
              className="text-xl w-full p-1 font-500 focus:bg-gray-200 hover:bg-gray-200"
              placeholder="Enter title of posting here"
              value={pst.title}
              onChange={handleInputChange(currPostIndx)}
            />
          </>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Contributors:</div>            {/* font-500 is Tailwind for bold */}
            <input
              name="contributors"
              type="text"
              required="true"
              className="modalField"
              placeholder="Enter names of contributors here (Firstname, last Initial)"
              value={pst.contributors}
              onChange={handleInputChange(currPostIndx)}
            />
          </div>

          {(isNewPost) ? (
            <></>
          ) : (
            <div className="flex flex-row p-1 mt-2">   {/* Dates are read-only, and only shown for existing posts */}

              <div className="flex flex-row">
                <div className="font-500">Created:</div>
                <div className="ml-2 font-400">{convertISODate(pst.createdAt)}</div>
              </div>

              <div className="flex flex-row ml-6">
                <div className="font-500">Modified:</div>
                <div className="ml-2 font-400">{convertISODate(pst.updatedAt)}</div>
              </div>
            </div>
          )}

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Tags:</div>
            <input
              name="tags"
              type="text"
              required="true"
              className="modalField"
              placeholder="Enter tags/keywords here"
              value={pst.tags}
              onChange={handleInputChange(currPostIndx)}
            />
          </div>

          <input
            name="description"                              //J: I'd like to change this to 'content' 
            type="text"
            required="true"
            className="modalField"
            placeholder="Enter content of post here"
            value={pst.description}                         //J: I'd like to change this to '.content' 
            onChange={handleInputChange(currPostIndx)}
            />

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Content Type:</div>
            <input
              name="contentType"
              type="text"
              required="true"
              className="modalField"
              placeholder="Enter type of content (Text, file, etc.)"
              value={pst.contentType}
              onChange={handleInputChange(currPostIndx)}
            />
          </div>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"       //J: How about we change this to checkboxes, so it's easy to select more than 1
                id="dropdown-basic"
                name="spiciness"
                required="true"
                className="modalField"
                value={pst.spiciness}
                defaultValue="0"
                onChange={handleInputChange(currPostIndx)}
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
          <Button variant="warning" onClick={props.onHide}>
            Abandon Changes
          </Button>

          <Button variant="danger" onClick={() => deletePost(currPostIndx)}>
            Delete Post {/* Add an icon? */}
          </Button>

          <Button color="green" onClick={updateOrCreatePost}>
            Save Post {/* Add an icon? */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MainModal;
