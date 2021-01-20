import React, { useState, useEffect } from 'react';
import PostingAxios from '../services/PostingAxios';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


const PostingsList = () => {
  const [postings, setPostings] = useState([]);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    retrievePostings();
  }, []);                   // C: the '[]' on this line means the useEffect function will only run THE FIRST time the page renders, 
                            // not every time it renders

  const retrievePostings = () => {
    PostingAxios.getAll()
      .then((response) => {
        setPostings(response.data);
        console.log('retrievePostings response.data=', response.data);
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
    PostingAxios.findByTitle(searchTitle)
      .then((response) => {
        setPostings(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshList = () => {
    retrievePostings();
    setSelectedPosting(null);
    setSelectedIndex(-1);
  };

  const setActivePosting = (posting, index) => {
    setSelectedPosting(posting);
    setSelectedIndex(index);
  };

  // const removeAllPostings = () => {
  //   PostingAxios.removeAll()
  //     .then((response) => {
  //       console.log("removeAllPostings response.data=",response.data);
  //       refreshList();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };



  return (
    <div className="list row">
      {/* Search bar */}
      <div className="col-md-8">
        <div className="input-group mb-3">
          
          <input type="text"  className="form-control"  placeholder="Search by title"
                 value={searchTitle}  onChange={onChangeSearchTitle} />

          <div className="input-group-append">
            <Button primary   onClick={onClickFindByTitle}> 
            {/* className="btn btn-outline-secondary"  type="button" */}
              Search
            </Button>
          </div>

        </div>
      </div>

      {/* Posting List */}
      <div className="col-md-6">
        <h4>Postings List</h4>
      
        <ul className="list-group">
          {postings && postings.map((posting, index) => (      // J: only render if the data array isn't NULL
              <li className={'list-group-item'}   // + (index === selectedIndex ? 'active' : '')  // for highlighting the selected item
                key={index}
                onClick={() => setActivePosting(posting, index)} >
                {posting.title}
              </li>
            ))}
        </ul>

        {/* J: From React Router   https://reactrouter.com/web/api/locationconst   Use:
        location = {
           pathname: '/somewhere',
           state: { fromDashboard: true } 
        }
           */}

        {/* <Button onClick={ () => {}}/>
          Add a posting
        </Button> */}

        <div className="nav-item">        
        {/* J: How to replace this link with a SemanticUI button? */}
            <Link to={"/add"} className="nav-link">
              Add a posting
            </Link>
        </div>

        {/* <Button basic color='red' onClick={removeAllPostings}>
          {/* className="m-3 btn btn-sm btn-danger"  */}
          {/* Remove All
        </Button> */}
      </div>

      {/* Posting details side panel */}
      <div className="col-md-6">
        {console.log ("selectedPosting = ", selectedPosting)}
        {selectedPosting ? (
          <div>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>
                    {selectedPosting.title}
                  </div>

                  <div>
                    <label>
                      <strong>Authors:</strong>
                    </label>
                    {selectedPosting.authors}
                  </div>

                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>
                    {selectedPosting.description}
                  </div>
                  
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {selectedPosting.published ? 'Published' : 'Pending'}
                  </div>

                  <Link to={'/postings/' + selectedPosting.id}  className="badge badge-warning">
                    Edit
                  </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Posting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostingsList;
