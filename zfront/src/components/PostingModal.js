import React, { useState } from "react";
import { Button, Icon, Modal } from 'semantic-ui-react'

import PostingAxios from "../services/PostingAxios";
import convertISODate from '../functions/convertISODate';


const PostingModal = (props) => {

  console.log("PostingModal.js props coming in =",props)

  const emptyPosting = {
    _id: null,
    title: "",
    contributors: "",
    description: "",
    tags: ""
  };

  const [posting, setPosting] = useState(props.posting || emptyPosting);
  const [isOpen, setIsOpen] = useState(false)


  const refreshList = props.refresh;
  // const setPosts=props.setPosts;

  const handleInputChange = event => {
    console.log("PostingModalTEST.js handleInputChange() posting=",posting)
    const { name, value } = event.target;
    setPosting(currPost => { return {...currPost, [name]: value }});     // J: Why brackets [] around name? 
  };

  const updatePostingDetails = () => {
    console.log("PostingModal.js updatePostingDetails() posting=",posting)
    PostingAxios.update(posting._id, posting)
      .then(response => {
        setIsOpen(false);
        refreshList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deletePosting = () => {
    PostingAxios.remove(posting._id)
      .then(response => {
        console.log("deletePosting() response.data=",response.data);
        refreshList()
        // setPosts([]);
      setIsOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Modal
      closeIcon
      size='small'
      open={isOpen}
      trigger={       // ** This is the content for each posting in PostingsList **
 
        posting._id ? (
          <div className={'list-group-item'}>
            {posting.title}
            <br />
            {posting.contributors}
          </div>
        ) : (
          <div>Create Post</div>
        )
      }
      
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <Modal.Content>

      {posting._id ? (
         <></>
      ) : (
        <div className="text-xl p-1">
          Create New Posting
        </div>
      )}

        <div>  
          <input name="title" type="text" required
          // id="title" 
              className="text-xl w-full p-1  focus:bg-gray-200" 
              placeholder="Enter title of posting here"
              value={posting.title}  onChange={handleInputChange} />
        </div>

        <div className="flex flex-row items-baseline p-1 mt-2">
          <div>Contributors:</div>
          <input id="contributors" name="contributors" type="text"
            className="w-full ml-2 p-1  focus:bg-gray-200"
            placeholder="Enter names of contributors here (Firstname, last Initial)"
            required  value={posting.contributors}  onChange={handleInputChange} />
        </div>

        {posting._id ? (
          <div className="flex flex-row p-1 mt-2">
            <div className="flex flex-row">
              <div>Created:</div>
              <div className="ml-2">{convertISODate(posting.createdAt)}</div>
            </div>

            <div className="flex flex-row ml-6">
              <div>Modified:</div>
              <div className="ml-2">{convertISODate(posting.updatedAt)}</div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <input id="description" name="description" type="text" 
          className="w-full mt-2 p-1  focus:bg-gray-200"
          placeholder="Enter posting here"
          required  value={posting.description}  onChange={handleInputChange} />
       
      </Modal.Content>

      <Modal.Actions>
        <Button basic color='orange' onClick={() => setIsOpen(false)}>
          <Icon name='remove' />Abandon Changes
        </Button>

        <Button basic color='red' onClick={deletePosting}>
          <Icon name='remove' />Delete Posting
        </Button>

        <Button basic color='green' onClick={updatePostingDetails}>
          <Icon name='checkmark' />Submit
        </Button>
      </Modal.Actions>

    </Modal>
  )
}

export default PostingModal;




// const PostingModal = (props) => {

//   console.log("Running PostalModal component")

// }
//   console.log("PostingModal.js props coming in =",props)

//   const [posting, setPosting] = useState(props);
//   const [editPosting,setEditPosting] = useState(false);

//   const handleInputChange = event => {
//     console.log("PostingModalTEST.js handleInputChange() posting=",posting)
//     const { name, value } = event.target;
//     setPosting(currPost => { return {...currPost, [name]: value }});     // J: Why brackets [] around name? 
//   };

//   const updatePostingDetails = () => {
//     console.log("PostingModalTEST.js updatePostingDetails() posting=",posting)
//     PostingAxios.update(posting._id, posting)
//       .then(response => {
//         props.history.push("/postings");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   // const switchToEdit = () => {
//   //   setEditPosting(true);
//   // }


//   return (
//     <div>

//       {/* modal wrapper */}

//         {/* {(posting && !editPosting) ? (

//           // Display details of existing posting 
//           <div >
//             {posting.title}

//           </div>

//         ) : ( */}
//           {/* // Edit/Create Posting */}
//           <form>     

//             <div className="form-group">  
//               <label htmlFor="title">Title </label>
//               <span>  </span>
//               <input
//                 id="title" name="title" type="text" className="form-control"
//                 required  value={posting.title}  onChange={handleInputChange}
//               />
//             </div>

//             {/* Main text body (Rich Text) */}
//             {/* Contributors:  */}
//             {/* Date Created, Date Modified */}
//             {/* Primary Content Type, No. Updates, Spiciness,  */}

//             {/* Edit (then Clear) / Create New Posting button */}
//               {/* setEditPosting(true) */}

//             {/* <Button className="mt-3" onClick={switchToEdit}>Edit</Button> */}
//             <Button className="mt-3" onClick={updatePostingDetails}>Submit</Button>

//             {/* <input type="submit" value="Submit" /> */}

//           </form> 


//           {/* ) */}
//         {/* } */}

//       {/* closing modal wrapper */}
//     </div>
//   )
// }
