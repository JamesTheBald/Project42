import React from "react";

const MainModal = (props) => {

  const currPstIndx = props.currPstIndx; 
  let postingsDataArr = props.postingsDataArr;    // will this change? If so, switch to const
  let setPostingsDataArr = props.setPostingsDataArr
  const emptyPst = props.emptyPst;

  console.log("MainModal.js: currPstIndx=",currPstIndx);
  console.log("MainModal.js: postingsDataArr=",postingsDataArr);
  console.log("MainModal.js: setPostingsDataArr=",setPostingsDataArr);
  console.log("MainModal.js: emptyPst=",emptyPst);
  

  if (currPstIndx === -1) {
    let pst = emptyPst;

    setPostingsDataArray( currDataArray => {
      let newPostingsArr = [...currDataArray];
      newPostingsArr.push(pst);
      console.log("handleInputChange: newPostingsArray =",newPostingsArr)
      return newPostingsArr;
    })
    currPstIndx = postingsDataArr.length;

  } else {
    let pst = postingsDataArray[currPostIndex];
  }


  return (
    <>
      <Modal size="lg" centered show={showMainModal} onHide={() => setShowMainModal(false)} animation={false}>
        <Modal.Header closeButton>
          {(currPostIndex === -1) ? (
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
              onChange={handleInputChange}
            />
          </>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Contributors:</div>
            <input
              name="w-full ml-2 p-1 focus:bg-gray-200 hover:bg-gray-200 hover:border-blue-900"
              type="text"
              required="true"
              className="modalField"
              placeholder="Enter names of contributors here (Firstname, last Initial)"
              value={pst.contributors}
              onChange={handleInputChange}
            />
          </div>

          {currPostIndex === -1 ? (
            <></>
          ) : (
            <div className="flex flex-row p-1 mt-2">
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
              onChange={handleInputChange}
            />
          </div>

          <input
            name="description"
            type="text"
            required="true"
            className="modalField"
            placeholder="Enter content of post here"
            value={pst.description}
            onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                name="contentType"
                required="true"
                className="modalField"
                value={pst.spiciness}
                defaultValue="0"
                onChange={handleInputChange}>
                Spiciness
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" value="1">
                  Mild
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2" value="2">
                  Medium
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3" value="3">
                  Spicy
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="flex flex-row items-baseline p-1 mt-2">
            <div className="font-500">Upvotes:</div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>
            Abandon Changes
          </Button>

          <Button variant="danger" onClick={() => deletePost(pst)}>
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
