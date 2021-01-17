import React, { useState, useEffect } from "react";
import TutorialAxios from "../services/TutorialAxios";

const Tutorial = (props) => {

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  
  const [selectedTutorial, setSelectedTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const tutorialID = props.match.params.id      // J: get the ID of this tutorial from the match object. 
                  // The match object is one of three objects that are passed as props to the component by React Router.
                  // See https://reactrouter.com/web/api/Route/route-props

  useEffect(() => {
    console.log("So useEffect() tutorialID = props.match.params.id = ", tutorialID);
    getTutorial(tutorialID);
  }, [tutorialID]);             // J: run this useEffect any time tutorialID changes

  const getTutorial = (id) => {
    TutorialAxios.get(id)
      .then(response => {
        setSelectedTutorial(response.data);
        console.log("getTutorial() response.data=",response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputChange = (evnt) => {
    const { name, value } = evnt.target;
    setSelectedTutorial({ ...selectedTutorial, [name]: value });      // J: See Spread tutorial on 'Javascript 
                                                                      // Learning Tidbits' on Message Board
  };

  const updatePublished = (status) => {
    var data = {
      id: selectedTutorial.id,          // J: i.e. no change to id, title or description
      title: selectedTutorial.title,
      description: selectedTutorial.description,
      published: status
    };

    TutorialAxios.update(selectedTutorial.id, data)
      .then(response => {
        setSelectedTutorial({ ...selectedTutorial, published: status });
        console.log("updatePublished() response.data=",response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialAxios.update(selectedTutorial.id, selectedTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("updateTutorial(): The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialAxios.remove(selectedTutorial.id)
      .then(response => {
        console.log("deleteTutorial() response.data=",response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {selectedTutorial ? (
        <div className="edit-form">
          
          <h4>Tutorial</h4>

          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className="form-control"
                name="title"
                value={selectedTutorial.title}
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
                value={selectedTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {selectedTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {selectedTutorial.published ? (
            <button className="badge badge-primary mr-2" onClick={() => updatePublished(false)}>
              UnPublish
            </button>
          ) : (
            <button className="badge badge-primary mr-2" onClick={() => updatePublished(true)}>
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button type="submit" className="badge badge-success" onClick={updateTutorial}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
