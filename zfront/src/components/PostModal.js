import React, { useState, useEffect } from "react";
import { Button, Icon, Modal } from 'semantic-ui-react'
import PostingAxios from "../services/PostingAxios";
import convertISODate from '../functions/convertISODate';


const PostModal = (props) => {

  useEffect(() => {
    console.log("PostModal.js props coming in =",props)
  }, [props]);

  const emptyPost = {
    _id: null,
    title: "",
    contributors: "",
    description: "",
    tags: ""
  };

  const [post, setPost] = useState(props.post || emptyPost);
  const [modalOpen, setModalOpen] = useState(false)
  const refreshPostingsArray = props.updatePostings;

  const handleInputChange = event => {
    // console.log("PostModal.js handleInputChange() post=",post)   -TOO MUCH OUTPUT TO CONSOLE
    const { name, value } = event.target;
    setPost(currPost => { return {...currPost, [name]: value }});
  };


  const updateOrCreatePost = () => {
    console.log("PostModal.js, updateOrCreatePost(), post=",post)

    post._id ? (
      PostingAxios.update(post._id, post)
      .then(response => {
        refreshPostingsArray(post);
        setModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      })
    ) : (
      createPost()
    )
  };


  const createPost = () => {
    //J: The elements in the following object need to align with those in:
    //      const posting = new mongooseModel({...}) in postingController.js
    //and   var postingSchema = mongoose.Schema({ ... } in mongooseModel.js
    var postSubset = {
      title: post.title,
      contributors: post.contributors,
      description: post.description,
      tags: post.tags
    };
    // NB: other fields of 'post' may be empty. e.g. post._ID = NULL

    PostingAxios.create(postSubset)
      .then(response => {
        const newPost = response.data;
        setPost(newPost);

        // {
          // _id: response.data._id,
          // title: response.data.title,
          // contributors: response.data.contributors,
          // description: response.data.description,
          // tags: response.data.tags
        // });

        console.log("PostModal.js, createPost, newPost=response.data=",newPost);
        refreshPostingsArray(newPost);
        setModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };


  const deletePost = () => {
    PostingAxios.remove(post._id)
      .then(response => {
        console.log("PostModal.js, deletePost(), post=",post);
        refreshPostingsArray(post);
        setModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <Modal
      closeIcon
      size='small'
      dimmer='blurring'
      open={modalOpen}
      trigger={       // ** This is the content for each posting in PostingsList **
         post._id ? (
          <div className="w-64 p-2 my-2 border border-gray-700 rounded-lg">
            <div>
             {post.title}
            </div>
            <div className="mt-2">
              {post.contributors}
            </div>
          </div>
        ) : (
          <div className="p-2">Create Post</div>
        )
      }
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
    >

    <Modal.Content>

      {post._id ? (
         <></>
      ) : (
        <div className="text-xl p-1">Create New Post</div>
      )}

        <div>  
          <input name="title" type="text" requried='true'
          // id="title"   - J: Is this necessary?
              className="text-xl w-full p-1  focus:bg-gray-200" 
              placeholder="Enter title of posting here"
              value={post.title}  onChange={handleInputChange} />   {/* ie update state var 'post' */}
        </div>

        <div className="flex flex-row items-baseline p-1 mt-2">
          <div>Contributors:</div>
          <input id="contributors" name="contributors" type="text" requried='true'
            className="w-full ml-2 p-1  focus:bg-gray-200"
            placeholder="Enter names of contributors here (Firstname, last Initial)"
            required  value={post.contributors}  onChange={handleInputChange} />
        </div>

        {post._id ? (
          <div className="flex flex-row p-1 mt-2">
            <div className="flex flex-row">
              <div>Created:</div>
              <div className="ml-2">{convertISODate(post.createdAt)}</div>
            </div>

            <div className="flex flex-row ml-6">
              <div>Modified:</div>
              <div className="ml-2">{convertISODate(post.updatedAt)}</div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-row items-baseline p-1 mt-2">
          <div>Tags:</div>
          <input id="tags" name="tags" type="text" requried='true'
            className="w-full ml-2 p-1  focus:bg-gray-200"
            placeholder="Enter tags/keywords here"
            required  value={post.tags}  onChange={handleInputChange} />
        </div>

        <input id="description" name="description" type="text"  requried='true'
          className="w-full mt-2 p-1  focus:bg-gray-200"
          placeholder="Enter content of post here"
          required  value={post.description}  onChange={handleInputChange} />
       
      </Modal.Content>

      <Modal.Actions>
        <Button basic color='orange' onClick={() => setModalOpen(false)}>
          <Icon name='remove' />Abandon Changes
        </Button>

        <Button basic color='red' onClick={deletePost}>
          <Icon name='remove' />Delete Post
        </Button>

        <Button basic color='green' onClick={updateOrCreatePost}>
          <Icon name='checkmark' />Save Post
        </Button>
      </Modal.Actions>

    </Modal>
  )
}

export default PostModal;




// const PostModal = (props) => {

//   console.log("Running PostalModal component")

// }
//   console.log("PostModal.js props coming in =",props)

//   const [posting, setPosting] = useState(props);
//   const [editPosting,setEditPosting] = useState(false);

//   const handleInputChange = event => {
//     console.log("PostModalTEST.js handleInputChange() posting=",posting)
//     const { name, value } = event.target;
//     setPosting(currPost => { return {...currPost, [name]: value }});     // J: Why brackets [] around name? 
//   };

//   const updatePostingDetails = () => {
//     console.log("PostModalTEST.js updatePostingDetails() posting=",posting)
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
