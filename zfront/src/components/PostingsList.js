import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

import PostingAxios from '../services/PostingAxios';
import WelcomeModal from "./WelcomeModal";
import PostModal from "./PostModal";


const PostingsList = () => {
  const [postings, setPostings] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    retrievePostings();
  }, []);     // C: '[]' means useEffect will only run THE FIRST time the page renders


  const retrievePostings = () => {
    PostingAxios.getAll()
      .then((response) => {
        setPostings(response.data);
        console.log('PostingsList.js retrievePostings() response.data=', response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const updatePostingsArray = (newPost) => {     // Pass this via props to PostModal.js

    console.log("PostingsList.js, updatePostingsArray, newPost=",newPost);

    const idOfNewPost = (newPost) ? (newPost._id) : null;
    const indexOfPostToReplace = postings.findIndex(currPost => currPost._id === idOfNewPost);

    console.log("PostingsList.js, ditto, idOfNewPost=",idOfNewPost);
    console.log("PostingsList.js, ditto, indexOfPostToReplace=",indexOfPostToReplace);
    console.log("PostingsList.js, ditto, postings[indexOfPostToReplace]=", postings[indexOfPostToReplace]);

    if (indexOfPostToReplace === -1) {
      // if no match is found append new posting to end of postings array
      setPostings( curr => [...curr, newPost] )
    } else {
      // Replace old post (with matching _id) with newPost
      setPostings( curr => {
        let updatedPostings = [...curr];      // NB: You can't do updatedPostings = curr here. You need to 
        // spread then combine the curr array or you'll actually be modifying the state variable postings.
        // Also you want to have this as a fat arrow function within the setPostings fn so that it's evaluated
        // all at once when setPostings is invoked, so you don't fall into an 'async hole'
        updatedPostings[indexOfPostToReplace] = newPost;
        console.log("PostingsList.js, ditto, updatedPostings=",updatedPostings);
        return updatedPostings;
      })
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
    PostingAxios.removeAll()
      .then(response => {
        setPostings(response.data);
        console.log("PostingsList.js removeAllPostings() response.data=",response.data);
        // refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };



  return (
    <div>
      
      {/* Navbar */}
      <nav className="w-full h-20 flex items-center text-blue-200 bg-blue-900">
        
        <div className="flex flex-row items-baseline">

          <div className="text-2xl mx-4  hover:text-blue-400">
            <WelcomeModal />
          </div>

          {/* Create Post button */}
            <div className="mx-4 hover:text-blue-400">
            <PostModal note="Create Post button" updatePostings={updatePostingsArray} getPostings={retrievePostings} origin="navbar" />
            {/* NB: No posting props passed in here - this is for creating a new (empty) posting*/}
          </div>

          {/* Search bar */}
          <div className="flex flex-row mx-4">
            
            <input type="text"  className="w-100 p-1 bg-gray-100 rounded-lg"  
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
          {postings && postings.map((post, index) => (    // J: If postings isn't NULL..
            
            <div key={index}>
              <PostModal post={post} updatePostings={updatePostingsArray} getPostings={retrievePostings} note="post list"/>
            </div>
            
          ))}
        </div>

        <Button className="mt-3" basic color='red' onClick={removeAllPostings}>
          Remove All
        </Button>

      </div>
    
    </div>
  );
};

export default PostingsList;
