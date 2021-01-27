import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PostingAxios from '../services/PostingAxios';
import WelcomeModal from "./WelcomeModal";
import PostModal from "./PostModal";


const PostingsList = () => {

  const [postings, setPostings] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [modalShow, setModalShow] = React.useState(false);


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


  // function CenteredModal(props) {
  //   return (
  //     <Modal
  //       {...props}
  //       size="lg"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Modal heading
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <h4>Centered Modal</h4>
  //         <p>
  //           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
  //           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
  //           consectetur ac, vestibulum at eros.
  //         </p>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={props.onHide}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }



  return (
    <body>
      
      {/* Navbar */}
      <nav className="w-full h-20 flex items-center text-blue-200 bg-blue-900">
        
        <div className="flex flex-row items-baseline">

          <div className="text-2xl mx-4  hover:text-blue-400">
            {/* <WelcomeModal /> */}
          </div>

          {/* Create Post button */}
          <div className="mx-4 hover:text-blue-400">
            <PostModal note="Create Post button" updatePostings={updatePostingsArray} getPostings={retrievePostings} origin="navbar" />
            {/* NB: No posting props passed in here - this is for creating a new (empty) posting */}
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
      
        <div className="font-300">Quick test of font weight. This is font-light (300).</div>
        <div className="font-400">Quick test of font weight. This is font-normal (400).</div>
        <div className="font-500">Quick test of font weight. This is font-medium (500).</div>

        <div className="list-group">
          {console.log("PostingsList.js Postings List JSX, postings =",postings)}
          {postings[0] && postings.map((post, index) => (    // J: If postings isn't NULL..
            
            <div key={index}>
              <PostModal post={post} updatePostings={updatePostingsArray} getPostings={retrievePostings} note="post list"/>
            </div>
            
          ))}
        </div>


        {/* <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>

        <CenteredModal show={modalShow}  onHide={() => setModalShow(false)}  animation={false} /> */}


        <Button className="mt-3  basic color='red' "  onClick={removeAllPostings}>    {/* For Bootstrap use: variant="outline-danger" */}
          Remove All
        </Button>

      </div>
    
    </body>
  );
};

export default PostingsList;
