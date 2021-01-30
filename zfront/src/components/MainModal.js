import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import convertISODate from "../functions/convertISODate";
import deletePost from "../functions/deletePost";
import updatePostingsDB from "../functions/updatePostingsDB";



const MainModal = (props) => {

  const emptyPst = props.emptyPst;
  let currPostIndx = props.currPostIndx; 
  const setCurrPostIndx = props.setCurrPostIndx;
  let postingsDataArr = props.postingsDataArr;    // will this change? If so, switch to const
  const setPostingsDataArr = props.setPostingsDataArr

  console.log("MainModal.js begins. emptyPst=", emptyPst);
  console.log("MainModal.js begins. currPostIndx=", currPostIndx);
  console.log("MainModal.js begins. postingsDataArr=", postingsDataArr);
  console.log("MainModal.js begins. setPostingsDataArr=", setPostingsDataArr);
  
  let isNewPost = false;
  let pst = emptyPst;


  // This function supports the 'Create Post' case by appending an empty postings data object to postingsDataArray
  // Do not move to separate file. Uses postingsDataArr, currPostIndx, setcurrPostIndx, isNewPost and pst 
  if (currPostIndx === -1) {   
    setCurrPostIndx( () => postingsDataArr.length);
    isNewPost = true;

    setPostingsDataArr( currDataArr => {
      let newPostingsArr = [...currDataArr];
      newPostingsArr.push(pst);
      console.log("MainModal.js: newPostingsArray =",newPostingsArr)
      return newPostingsArr;
    })

  } else {
    pst = postingsDataArr[currPostIndx];
    isNewPost = false;
  }


 const handleInputChange = (evnt, currPostIndx) => {          //J: This could be called updatePostingsDataArray()
  //J: Do not move to separate file. Uses postingsDataArr, setPostingsDataArr and currPostIndx
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


// *** DEPRECATED ***
// //J: (THIS FUNCTION HAS NOT BEEN FIXED UP YET (as of 29JAN2021))
//
// const createPost = (pst) => {
//   console.log("Running PostModal.js createPost()");

//   if (pst) {
//     //J: The elements in the following object need to align with those in:
//     //      const posting = new mongooseModel({...}) in postingController.js
//     //and   var postingSchema = mongoose.Schema({ ... } in mongooseModel.js
//     var postSubset = {
//       title: pst.title,
//       contributors: pst.contributors,
//       description: pst.description,
//       tags: pst.tags,
//       contentType: pst.contentType,
//       spiciness: pst.spiciness,
//       upvotes: pst.upvotes,
//     };
//     // NB: other fields of 'post' may be empty. e.g. post._ID = null

//     PostingAxios.create(postSubset)
//       .then((response) => {
//         console.log("PostModal.js: handling response to PostingAxios.create");

//         const newPost = response.data;
//         setPost(() => newPost);

//         console.log("PostModal.js, createPost, newPost=response.data=", newPost);
//         updatePostingsArray(newPost);
//         setShowMainModal(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     console.log("PostModal.js, createPost: Error - falsy post data passed to createPost()");
//   }
// };



  return (
    <>
      <Modal size="lg" centered show={showMainModal} animation={false} onHide={() => setShowMainModal(false)}>
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
              onChange={handleInputChange(currPostIndx)}            // Try onBlur ??
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
          <Button variant="warning" onClick={ () => {          {/* Was onClick={props.onHide} */}
            retrievePostings(setPostingsDataArr);         // This will also refresh postingsDataArray
            setShowMainModal(false);
          }}>
            Abandon Changes
          </Button>

          <Button variant="danger" onClick={() => {
            deletePost(postingsDataArr, setPostingsDataArr, currPostIndx);    // This will refresh postingsDataArray
            setShowMainModal(false);
          }}>
            Delete Post       {/* Add an icon? */}
          </Button>

          <Button color="green" onClick={ () => {
            updatePostingsDB(postingsDataArr, currPostIndx);       // This will NOT refresh postingsDataArray, but 
            setShowMainModal(false);                            // handleInputChange() should keep postingsDataArray up to date
          }}>
            Save Post         {/* Add an icon? */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MainModal;
