import React, { useState, useEffect } from "react";
import PostingAxios from "../services/PostingAxios";

const Posting = (props) => {

  const initialPostingState = {
    id: null,
    title: "",
    authors: "",
    description: "",
    published: false
  };
  
  const [selectedPosting, setSelectedPosting] = useState(initialPostingState);
  const [message, setMessage] = useState("");
  const postingID = props.match.params.id      // J: get the ID of this posting from the match object. 
                  // The match object is one of three objects that are passed as props to the component by React Router.
                  // See https://reactrouter.com/web/api/Route/route-props

  useEffect(() => {
    console.log("useEffect() postingID = props.match.params.id = ", postingID);
    getPosting(postingID);
  }, [postingID]);             // J: run this useEffect any time postingID changes

  const getPosting = (id) => {
    PostingAxios.get(id)
      .then(response => {
        setSelectedPosting(response.data);
        console.log("getPosting() response.data=",response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputChange = (evnt) => {
    const { name, value } = evnt.target;
    setSelectedPosting({ ...selectedPosting, [name]: value });      // J: See Spread posting on 'Javascript 
                                                                      // Learning Tidbits' on Message Board
  };

  const updatePublished = (status) => {
    var data = {
      id: selectedPosting.id,          // J: i.e. no change to id, title or description
      title: selectedPosting.title,
      authors: selectedPosting.authors,
      description: selectedPosting.description,
      published: status
    };

    PostingAxios.update(selectedPosting.id, data)
      .then(response => {
        setSelectedPosting({ ...selectedPosting, published: status });
        console.log("updatePublished() response.data=",response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePosting = () => {
    PostingAxios.update(selectedPosting.id, selectedPosting)
      .then(response => {
        console.log(response.data);
        setMessage("updatePosting(): The posting was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePosting = () => {
    PostingAxios.remove(selectedPosting.id)
      .then(response => {
        console.log("deletePosting() response.data=",response.data);
        props.history.push("/postings");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {selectedPosting ? (
        <div className="edit-form">
          
          <h4>Posting</h4>

          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className="form-control"
                name="title"
                value={selectedPosting.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="authors">Authors' Initials</label>
              <input
                id="authors"
                type="text"
                className="form-control"
                name="authors"
                value={selectedPosting.authors}
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
                value={selectedPosting.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {selectedPosting.published ? "Published" : "Pending"}
            </div>
          </form>

          {selectedPosting.published ? (
            <button className="badge badge-primary mr-2" onClick={() => updatePublished(false)}>
              UnPublish
            </button>
          ) : (
            <button className="badge badge-primary mr-2" onClick={() => updatePublished(true)}>
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deletePosting}>
            Delete
          </button>

          <button type="submit" className="badge badge-success" onClick={updatePosting}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Posting...</p>
        </div>
      )}
    </div>
  );
};

export default Posting;
