import React from 'react'
import Button from "react-bootstrap/Button";

import unlockAll from '../functions/unlockAll';
import retrievePosts from '../functions/retrievePosts';
import retrieveTopics from '../functions/retrieveTopics';
import unarchiveAllPosts from '../functions/unarchiveAllPosts';
import unarchiveAllTopics from '../functions/unarchiveAllTopics';
// import removeAllPosts from '../functions/removeAllPosts';
// import removeAllTopics from '../functions/removeAllTopics';


const AdminControls = (props) => {

  const emptyPost = props.emptyPost
  const emptyTopic = props.emptyTopic
  const postingsDataArray = props.postingsDataArray
  const setPostingsDataArray = props.setPostingsDataArray
  const topicsDataArray = props.topicsDataArray
  const setTopicsDataArray = props.setTopicsDataArray
  const recdLog = props.recdLog

  
  return (
    <div className="relative">
      
      <div className="flex flexrow items-center z-50">
          <div className="text-xl mx-3 text-gray-700">Admin Controls:</div>

          <Button
            variant="outline-success"
            className="mx-2"
            onClick={() => {
              unlockAll(postingsDataArray, topicsDataArray);
              retrievePosts(setPostingsDataArray, emptyTopic); // Time for a hard-update
              retrieveTopics(setTopicsDataArray, emptyTopic); // Time for a hard-update
            }}>
            Unlock All
          </Button>

          <Button
            variant="outline-secondary"
            className="mx-2"
            onClick={() => unarchiveAllPosts(setPostingsDataArray, emptyPost, recdLog)}
          >
            Unarchive All Posts
          </Button>

          <Button
            variant="outline-secondary"
            className="mx-2"
            onClick={() => unarchiveAllTopics(setTopicsDataArray, emptyTopic)}
          >
            Unarchive All Topics
          </Button>
        
          {/* <Button
            variant="outline-danger"
            className="mx-2"
            onClick={() => {
              removeAllPosts();
              setPostingsDataArray([emptyPost]);
            }}>
            PERMANENTLY DELETE All Posts
          </Button>

          <Button
            variant="outline-danger"
            className="mx-2"
            onClick={() => {
              removeAllTopics();
              setTopicsDataArray([emptyTopic]);
            }}>
            PERMANENTLY DELETE All Topics
          </Button>
          
          <div className="mx-2">NB: No Warning Given - These Actions Take Immediate Effect</div> */}

      </div>
    </div>
  )
}

export default AdminControls;
