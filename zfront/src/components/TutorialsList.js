import React, { useState, useEffect } from 'react';
import TutorialAxios from '../services/TutorialAxios';
import { Link } from 'react-router-dom';

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    retrieveTutorials();
  }, []); // the '[]' on this line means the useEffect function will only run THE FIRST time the page renders, not every time it renders

  const retrieveTutorials = () => {
    TutorialAxios.getAll()
      .then((response) => {
        setTutorials(response.data);
        console.log('retrieveTutorials response.data=', response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeSearchTitle = (evnt) => {
    const searchTitle = evnt.target.value;
    setSearchTitle(searchTitle);
    console.log('searchTitle=', searchTitle); // Dev demo only. Remove for production
  };

  const onClickFindByTitle = () => {
    TutorialAxios.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setSelectedTutorial(null);
    setSelectedIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setSelectedTutorial(tutorial);
    setSelectedIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialAxios.removeAll()
      .then((response) => {
        console.log("removeAllTutorials response.data=",response.data);
        refreshList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="list row">

      {/* Search bar */}
      <div className="col-md-8">
        <div className="input-group mb-3">
          
          <input type="text"  className="form-control"  placeholder="Search by title"
                 value={searchTitle}  onChange={onChangeSearchTitle} />

          <div className="input-group-append">
            <button className="btn btn-outline-secondary"  type="button"  onClick={onClickFindByTitle}>
              Search
            </button>
          </div>

        </div>
      </div>

      {/* Tutorial List */}
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials && tutorials.map((tutorial, index) => (      // J: only render if the data array isn't NULL
              <li className={'list-group-item ' + (index === selectedIndex ? 'active' : '')}
                  onClick={() => setActiveTutorial(tutorial, index)}  
                  key={index}>
                  {tutorial.title}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger"  onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>

      {/* Tutorial details side panel */}
      <div className="col-md-6">
        {console.log ("selectedTutorial = ", selectedTutorial)}
        {selectedTutorial ? (
          <div>
            <h4>Tutorial</h4>

            <div>
              <label>
                <strong>Title:</strong>
              </label>
              {selectedTutorial.title}
            </div>

            <div>
              <label>
                <strong>Description:</strong>
              </label>
              {selectedTutorial.description}
            </div>
            
            <div>
              <label>
                <strong>Status:</strong>
              </label>
              {selectedTutorial.published ? 'Published' : 'Pending'}
            </div>

            <Link to={'/tutorials/' + selectedTutorial.id}  className="badge badge-warning">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;
