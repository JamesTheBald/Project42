import React, { useState } from "react";
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import PostingAxios from "../services/PostingAxios";
// import convertISODate from '../functions/convertISODate';


const PostingModal = (props) => {

  console.log("PostingModal.js props coming in =",props)

  const [open, setOpen] = useState(false)
  const [posting, setPosting] = useState(props.posting);

  const refreshList = props.refresh;

  const handleInputChange = event => {
    console.log("PostingModalTEST.js handleInputChange() posting=",posting)
    const { name, value } = event.target;
    setPosting(currPost => { return {...currPost, [name]: value }});     // J: Why brackets [] around name? 
  };

  const updatePostingDetails = () => {
    console.log("PostingModal.js updatePostingDetails() posting=",posting)
    PostingAxios.update(posting._id, posting)
      .then(response => {
        setOpen(false)
        refreshList()
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <Modal
      closeIcon
      size='small'
      open={open}
      trigger={<Button>Show Modal</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content>

        <div className="input-narrow">  
          <input id="title" name="title" type="text" className="form-control"
            required  value={posting.title}  onChange={handleInputChange} />
        </div>

        <div className="input-narrow">  
          <input id="contributors" name="contributors" type="text" className="form-control"
            required  value={posting.contributors}  onChange={handleInputChange} />
        </div>

        <div className="input-wide">  
          {/* <label htmlFor="description">Description </label> */}
          {/* <span>  </span> */}
          <input id="description" name="description" type="text" className="form-control"
            required  value={posting.description}  onChange={handleInputChange} />
        </div>

      </Modal.Content>

      <Modal.Actions>
        <Button basic color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' />Close
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
