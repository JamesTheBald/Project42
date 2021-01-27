import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PostingAxios from '../services/PostingAxios';
import WelcomeModal from "./WelcomeModal";
import convertISODate from '../functions/convertISODate';


const PostingsList = () => {


  const emptyPost = {
    _id: null,
    title: "",
    contributors: "nothing here",
    description: "",
    tags: "",
    contentType: ""
  };

  const [postings, setPostings] = useState([]);
  const [post, setPost] = useState(emptyPost);      //J: Do we even want to track the 'post in question'?

  const [searchTitle, setSearchTitle] = useState('');
  const [showMainModal, setShowMainModal] = React.useState(false);
  const [showWelcome, setShowWelcome] = React.useState(false);



  useEffect(() => {
    retrievePostings();
  }, []);     // C: '[]' means useEffect will only run THE FIRST time the page renders


  const retrievePostings = () => {
    console.log("Running PostingsList.js retrievePostings()")

    PostingAxios.getAll()
      .then((response) => {
        setPostings(response.data);   // This will re-render if the postings data has changed.
        console.log('PostingsList.js retrievePostings() response.data=', response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };




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
        updatePostingsArray(post);
        setShowMainModal(false);
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
          updatePostingsArray(newPost);
          setShowMainModal(false);
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
        setShowMainModal(false);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      console.log("PostModal.js, deletePost: Error - falsy post data passed to deletePost()")
    }
  };





  const updatePostingsArray = (newPost) => {     // Pass this via props to PostModal.js
    console.log("Running PostingsList.js updatePostingsArray()")
    console.log("PostingsList.js, updatePostingsArray: newPost=",newPost);
    console.log("PostingsList.js, updatePostingsArray: initially, postings=",postings);

    if (newPost && newPost._id && postings) {
      const idOfNewPost = newPost._id;
      const indexOfPostToReplace = postings.findIndex(currPost => currPost._id === idOfNewPost);

      console.log("PostingsList.js, ditto: postings[indexOfPostToReplace]=", postings[indexOfPostToReplace]);
      console.log("PostingsList.js, ditto: idOfNewPost=",idOfNewPost);
      console.log("PostingsList.js, ditto: indexOfPostToReplace=",indexOfPostToReplace);
  
      if (indexOfPostToReplace === -1) {
        // if no match is found append new posting to end of postings array
        setPostings( curr => [...curr, newPost] )
      } else {
        // Replace old post (with matching _id) with newPost
        setPostings( curr => {
          let updatedPostings = [...curr];      // NB: You can't do updatedPostings = curr here. You need to 
          // spread then combine the curr array or you'll actually be modifying the state variable 'postings'.
          // Also you want to have this as a fat arrow function within the setPostings fn so that it's evaluated
          // all at once when setPostings is invoked, so you don't fall into an 'async hole'
          updatedPostings[indexOfPostToReplace] = newPost;
          console.log("PostingsList.js, ditto, updatedPostings=",updatedPostings);
          return updatedPostings;
        })
      }
    }
  }


  const onChangeSearchTitle = (evnt) => {
    const searchTitle = evnt.target.value;
    setSearchTitle(searchTitle);
    console.log('searchTitle=', searchTitle);
  };


  const onClickFindByTitle = () => {
    PostingAxios.findByTitle(searchTitle)
      .then((response) => {
        setPostings(response.data);
        console.log("PostingsList.js onClickFindByTitle() response.data=",response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const removeAllPostings = () => {
    console.log("Running PostingsList.js removeAllPostings()")

    PostingAxios.removeAll()
      .then(response => {
        setPostings(response.data);
        console.log("PostingsList.js removeAllPostings() response.data=",response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };



function MainModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <div className="text-2xl">Create / View / Modify Post</div>
      </Modal.Header>

      <Modal.Body>

        <div>  
            <input name="title" type="text" requried='true'
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

          {/* {post._id ? ( */}
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
          {/* ) : (
            <></>
          )} */}

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

      </Modal.Body>
      <Modal.Footer>

        <Button variant="warning" onClick={props.onHide}>Abandon Changes</Button>

        <Button basic variant="danger" onClick={() => deletePost(post)}>
          Delete Post          {/* Add an icon? */}
        </Button>

        <Button basic color='green' onClick={updateOrCreatePost}>
          Save Post            {/* Add an icon? */}
        </Button>

      </Modal.Footer>
    </Modal>
  );
}



  return (
    <body>
      
      {/* Navbar */}
      <nav className="w-full h-20 flex items-center text-blue-200 bg-blue-900">
        
        <div className="flex flex-row items-baseline">

          {/* <WelcomeModal /> */}
          <div className="p-2 text-2xl mx-4  hover:text-blue-400" onClick={() => setShowWelcome(true)}>
            Helpful Postings
          </div>

          <WelcomeModal show={showWelcome}  onHide={() => setShowWelcome(false)}  animation={false} />


          <div className="mx-4 hover:text-blue-400" onClick={() => setShowMainModal(true)} >
            Create Post
          </div>
          

          {/* Search bar */}
          <div className="flex flex-row mx-4">
            
            <input type="text"  className="w-100 p-1 text-gray-800 bg-gray-100 rounded-lg"  
              placeholder=" Search by Title"
              value={searchTitle}  onChange={onChangeSearchTitle}>
            </input>

            <button className="ml-2 px-3 text-gray-800 bg-gray-300 rounded-lg  hover:text-blue-600" onClick={onClickFindByTitle}>
              Search
            </button>

          </div>
        </div>
      </nav>
     

      {/* Postings List */}
      <div className="m-10">

        <div className="list-group">
          {console.log("PostingsList.js Postings List JSX, postings =",postings)}
          {postings[0] && postings.map((post, index) => (    // J: If postings isn't NULL..
            
            <div key={index}>
              {/* <PostModal post={post} updatePostings={updatePostingsArray} getPostings={retrievePostings} note="post list"/> */}

            </div>
            
          ))}
        </div>


        <Button variant="primary" onClick={() => setShowMainModal(true)}>
          Launch Centered Modal
        </Button>

        <MainModal show={showMainModal}  onHide={() => setShowMainModal(false)}  animation={false} />


        <Button className="mt-3" variant="outline-danger" onClick={removeAllPostings}>    {/* For Bootstrap use: basic color='red' */}
          Remove All
        </Button>

      </div>
    
    </body>
  );
};

export default PostingsList;
