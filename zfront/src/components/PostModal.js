import React, { useState, useEffect } from "react";
import { Button, Icon, Modal } from 'semantic-ui-react'
import PostingAxios from "../services/PostingAxios";
import convertISODate from '../functions/convertISODate';


const PostModal = (props) => {

  useEffect(() => {
    console.log("PostModal.js start: props=",props)
  }, [props]);

  const emptyPost = {
    _id: null,
    title: "",
    contributors: "nothing here",
    description: "",
    tags: "",
    contentType: ""
  };

  const [post, setPost] = useState(props.post || emptyPost);
  const [modalOpen, setModalOpen] = useState(false)
  const refreshPostingsArray = props.updatePostings;
  const retrievePostings = props.getPostings;
  const origin = props.origin




  console.log("PostModal.js start: post=",post);


  const handleInputChange = event => {
    // console.log("PostModal.js handleInputChange() post=",post)   -TOO MUCH OUTPUT TO CONSOLE
    const { name, value } = event.target;
    setPost(currPost => { return {...currPost, [name]: value }}); 
    // NB The brackets [] around 'name' in the above line are necessary so that js
    // uses the VALUE of name for the key, and not just the string 'name'. ie. so we 
    // get {...currPost, 'contributors':'James'} and not {...currPost, 'name':'James'}
  };


  const updateOrCreatePost = () => {
    console.log("Running PostModal.js updateOrCreatePost()")
    console.log("PostModal.js, updateOrCreatePost(), post=",post)

    if (post && post._id) {
      console.log("PostModal.js updateOrCreatePost(): updating db")
      PostingAxios.update(post._id, post)
      .then(response => {
        console.log("PostModal.js, updateOrCreatePost(), response=",response)
        refreshPostingsArray(post);
        setModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      createPost(post)
    }
  };


  const createPost = (pst) => {
    console.log("Running PostModal.js createPost()")

    if (pst) {
      //J: The elements in the following object need to align with those in:
      //      const posting = new mongooseModel({...}) in postingController.js
      //and   var postingSchema = mongoose.Schema({ ... } in mongooseModel.js
      var postSubset = {
        title: pst.title,
        contributors: pst.contributors,
        description: pst.description,
        tags: pst.tags,
        contentType: pst.contentType
      };
      // NB: other fields of 'post' may be empty. e.g. post._ID = null

      PostingAxios.create(postSubset)
        .then(response => {
          console.log("PostModal.js- handling response to PostingAxios.create")

          const newPost = response.data;
          setPost( () => newPost);

          console.log("PostModal.js, createPost, newPost=response.data=",newPost);
          refreshPostingsArray(newPost);
          setModalOpen(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("PostModal.js, createPost: Error - falsy post data passed to createPost()")
    }
  };


  const deletePost = (pst) => {
    console.log("PostModal.js- Running deletePost()")
    if (pst) {
      PostingAxios.remove(pst._id)
      .then( () => {
        console.log("PostModal.js- deletePost(), post=", pst);
        retrievePostings();     // Need to retrieve postings anew because postings state var is not changed, so no React will not re-render the postings list 
        setModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      console.log("PostModal.js, deletePost: Error - falsy post data passed to deletePost()")
    }
  };


  return (
    <Modal
      closeIcon
      size='small'
      dimmer='blurring'
      open={modalOpen}
      trigger={       // ** This is the content for each posting in PostingsList **
        (origin === "navbar") ? (
          <div className="p-2">Create Post</div>
        ) : (
            <div className="w-64 p-2 my-2 border border-gray-700 rounded-lg">
              <div>
              {post.title}
              </div>
              <div className="mt-2">
                {post.contributors}
              </div>
            </div>
  
        )
      }
      onClose={() => setModalOpen(false)}
      onOpen={() => {
        setModalOpen(true);
        (origin==='navbar') && setPost(emptyPost);
      }}
    >

    <Modal.Content>

      {post._id ? (
         <></>
      ) : (
        <div className="text-xl p-1">Create New Post</div>
      )}

        <div>  
          <input name="title" type="text" required='true'
          // id="title"   - J: Is this necessary?
              className="text-xl w-full p-1 font-500 focus:bg-gray-200 hover:bg-gray-200" 
              placeholder="Enter title of posting here"
              value={post.title}  onChange={handleInputChange} />   {/* ie update state var 'post' */}
        </div>

        <div className="flex flex-row items-baseline p-1 mt-2">
          <div className="font-500">Contributors:</div>
          <input name="w-full ml-2 p-1 focus:bg-gray-200 hover:bg-gray-200 hover:border-blue-900" type="text" requried='true' 
            className="modalField"
            placeholder="Enter names of contributors here (Firstname, last Initial)"
            required  value={post.contributors}  onChange={handleInputChange} />
        </div>

        {post._id ? (
          <div className="flex flex-row p-1 mt-2">
            <div className="flex flex-row">
              <div className="font-500">Created:</div>
              <div className="ml-2 font-400">{convertISODate(post.createdAt)}</div>
            </div>

            <div className="flex flex-row ml-6">
              <div className="font-500">Modified:</div>
              <div className="ml-2 font-400">{convertISODate(post.updatedAt)}</div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-row items-baseline p-1 mt-2">
          <div className="font-500">Tags:</div>
          <input name="tags" type="text" requried='true'
            className="modalField"
            placeholder="Enter tags/keywords here"
            required  value={post.tags}  onChange={handleInputChange} />
        </div>

        <input name="description" type="text"  requried='true'
          className="modalField"
          placeholder="Enter content of post here"
          required  value={post.description}  onChange={handleInputChange} />

        <div className="flex flex-row items-baseline p-1 mt-2">
          <div className="font-500">Content Type:</div>
          <input name="contentType" type="text" requried='true'
            className="modalField"
            placeholder="Enter type of content (Text, file, etc.)"
            required  value={post.contentType}  onChange={handleInputChange} />
        </div>
       
      </Modal.Content>

      <Modal.Actions>
        <Button basic color='orange' onClick={() => setModalOpen(false)}>
          <Icon name='remove' />Abandon Changes
        </Button>

        <Button basic color='red' onClick={() => deletePost(post)}>
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
//     setPosting(currPost => { return {...currPost, [name]: value }}); 
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
//   {/* BEWARE - improper use of a ternary, that you're only getting away with because it's in JSX, not JS */}

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
