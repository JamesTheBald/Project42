import React, { useState, useEffect } from "react";
import PostingAxios from "../services/PostingAxios";

const PostingDetails = (props) => {

  const initialPostingState = {
    _id: null,
    title: "",
    contributors: "",
    description: "",
    published: false
  };
  
  const [selectedPosting, setSelectedPosting] = useState(initialPostingState);
  // const [Loading, setLoading] = useState(true);    // For loading/misloaded message. See lecture #26 (Mongo#1, 1:20:00)

console.log("PostingDetails.js props.match.params=",props.match.params);
  const postingID = props.match.params.id      // J: get the ID of this posting from the match object. 
                  // The match object is one of three objects that are passed as props to the component by React Router.
                  // See https://reactrouter.com/web/api/Route/route-props

  console.log("PostingDetails.js postingID from props.match.params.id=",postingID);

  useEffect(() => {
    console.log("PostingDetails.js useEffect() postingID = props.match.params.id = ", postingID);
    getPostingDetails(postingID);
  }, [postingID]);             // J: run this useEffect any time postingID changes

  const getPostingDetails = (id) => {
    PostingAxios.get(id)
      .then(response => {
        setSelectedPosting(response.data);
        console.log("PostingDetails.js getPostingDetails() response.data=",response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputChange = (evnt) => {
    const { name, value } = evnt.target;
    setSelectedPosting({ ...selectedPosting, [name]: value });        // J: See Spread posting on 'Javascript 
  };                                                                  // Learning Tidbits' on Message Board

  const updatePostingDetails = () => {
    PostingAxios.update(selectedPosting._id, selectedPosting)
      .then(response => {
        props.history.push("/postings");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePosting = () => {
    PostingAxios.remove(selectedPosting._id)
      .then(response => {
        console.log("deletePosting() response.data=",response.data);
        props.history.push("/postings");
      })
      .catch(e => {
        console.log(e);
      });
  };


const EditPostingDetails = ({selecPost}) => {
  return (
    // Put content from below here. See lecture #26 (Mongo#1, 1:20:00)
    <div className="edit-form">
            
      <h4>Edit Posting</h4>

      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            name="title"
            value={selecPost.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contributors">Contributors</label>
          <input
            id="contributors"
            type="text"
            className="form-control"
            name="contributors"
            value={selecPost.contributors}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            className="form-control"
            name="description"
            value={selecPost.description}
            onChange={handleInputChange}
          />
        </div>

      </form>

      <button className="badge badge-danger mr-2" onClick={deletePosting}>
        Delete
      </button>

      <button className="badge badge-success" onClick={updatePostingDetails}>
        Update
      </button>
      
    </div>
  )
}




  return (

//J: Later: Add conditional path based on Loading state variable. See lecture #26 (Mongo#1, 1:20:00)

    <div>

      <EditPostingDetails selecPost={selectedPosting} />
      
    </div>
  );
};

export default PostingDetails;
