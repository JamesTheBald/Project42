import React, { useState, useEffect } from "react";
import PostingAxios from "../services/PostingAxios";

// import PostingModal from "./PostingModalTEST";

const PostingDetails = (props) => {

  const postingID = props.match.params.id      // J: get the ID of this posting from the match object. 
        // The match object is one of three objects that are passed as props to the component by React Router.
        // See https://reactrouter.com/web/api/Route/route-props
  // console.log("PostingDetails.js postingID from props.match.params.id=",postingID);


  const defaultPosting = {
    _id: null,
    title: "",
    contributors: "",
    description: ""
  };
  
  const [posting, setPosting] = useState(defaultPosting);

  
  useEffect(() => {
    console.log("PostingDetails.js useEffect() postingID = props.match.params.id = ", postingID);
    getPostingDetails(postingID);
  }, [postingID]);                  // J: run this useEffect any time postingID changes

  const getPostingDetails = (id) => {
    PostingAxios.get(id)
      .then(response => {
        setPosting(response.data);
        console.log("PostingDetails.js getPostingDetails() response.data=",response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };


  const handleInputChange = (evnt) => {
    console.log("PostingDetails.js handleInputChange() posting=",posting)
    const { name, value } = evnt.target;
    setPosting(currentPosting => { return {...currentPosting, [name]: value }});
         // J: Why the brackets [ ] around name? 
  }


  const deletePosting = () => {
    PostingAxios.remove(posting._id)
      .then(response => {
        console.log("deletePosting() response.data=",response.data);
        props.history.push("/postings");
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const changeTitle = (newTitle) => {
  //   let newObj = {...posting}
  //   newObj.title = newTitle;
  //   setPosting(newObj);
  //   console.log("PostingDetails.js changeTitle() posting=",posting)
  // }

  const updatePostingDetails = () => {
    PostingAxios.update(posting._id, posting)
      .then(response => {
        props.history.push("/postings");
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
       <div className="edit-form">
              
              <h4>Edit Posting</h4>
      
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"  type="text"  className="form-control"  name="title"
                    value={posting.title}
                    onChange={handleInputChange}
                    // onChange={ev => changeTitle(ev.target.value)}
                  />
                </div>
              </form>
      
              <button className="badge badge-danger mr-2" onClick={deletePosting}>Delete</button>
              <button className="badge badge-success" onClick={updatePostingDetails}>Update</button>
              
            </div>
      
    </div>
  );
};

export default PostingDetails;



          {/* <div className="form-group">
            <label htmlFor="contributors">Contributors</label>
            <input
              id="contributors"
              type="text"
              className="form-control"
              name="contributors"
              defaultValue={selectedPosting.contributors}
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
              defaultValue={selectedPosting.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Tags</label>
            <input
              id="tags"
              type="text"
              className="form-control"
              name="tags"
              defaultValue={selectedPosting.tags}
              onChange={handleInputChange}
            />
          </div> */}