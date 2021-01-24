import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import PostingAxios from '../services/PostingAxios';
import convertISODate from '../functions/convertISODate';
import PostingModal from "./PostingModal";


const PostingsList = () => {
  const [postings, setPostings] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const history = useHistory();

  useEffect(() => {
    retrievePostings();
  }, []);               // C: '[]' means useEffect will only run THE FIRST time the page renders, not every time it renders

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

  const removeAllPostings = () => {
    PostingAxios.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePostings();
  };


  return (
    <div className="list row">
      {/* Search bar */}
      <div className="col-md-8">
        <div className="input-group mb-3">
          
          <input type="text"  className="form-control"  placeholder="Search by title"
                 value={searchTitle}  onChange={onChangeSearchTitle} />

          <div className="input-group-append">
            <Button primary   onClick={onClickFindByTitle}>  {/* className="btn btn-outline-secondary"  type="button" */}
              Search
            </Button>
          </div>

        </div>
      </div>

      {/* Postings List */}
      <div className="col-md-6">
        <h4>Postings List</h4>
      
        <div className="list-group">
          {postings && postings.map((posting, index) => (     // J: only render if postings isn't NULL
            <div key={index}>
              <div className={'list-group-item'}>
                {posting.title}
                <br />
                {posting.contributors}
              </div>

              <PostingModal posting={posting} refresh={retrievePostings}/>
            </div>
          ))}
      
        </div>

        <Button className="mt-3" onClick={() => history.push('/addposting')}>
          Add Posting
        </Button>

        <Button className="mt-3 color='red' " onClick={removeAllPostings}>
          Remove All
        </Button>

      </div>
    
    </div>
  );
};

export default PostingsList;
