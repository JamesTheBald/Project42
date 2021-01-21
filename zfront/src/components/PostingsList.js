import React, { useState, useEffect } from 'react';
import PostingAxios from '../services/PostingAxios';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


const PostingsList = () => {
  const [postings, setPostings] = useState([]);
  const [selectedPosting, setSelectedPosting] = useState(null);
  // const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');
  const history = useHistory();

  useEffect(() => {
    retrievePostings();
  }, []);                   // C: the '[]' on this line means the useEffect function will only run THE FIRST time the page renders, 
                            // not every time it renders

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

  const setActivePosting = (posting, index) => {
    setSelectedPosting(posting);
    // console.log("setActivePosting() selectedPosting=",selectedPosting);
    // setSelectedIndex(index);
  };

  // const refreshList = () => {
  //   retrievePostings();
  //   setSelectedPosting(null);
  //   setSelectedIndex(-1);
  // };

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

    const convertISODate = (ISODate) => {
      /*
       * @param {string} called ISODate
       * This function converts ISODate received from Mongo and returns formatted date
       */
      const date = new Date(ISODate);
      // TODO: CHECK IF VALID DATE, RETURN N/A IF INVALID
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
      
      const dayOrdinal = (dayNumber) => {
        if (dayNumber > 3 && dayNumber < 21) return 'th';
        switch (dayNumber % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      };

      const formattedDate = 
        monthNames[date.getMonth()] // getMonth() returns INDEX of month, not value
        + ' '
        + date.getDate()
        + dayOrdinal(date.getDate())
        + ", "
        + date.getFullYear();

      return (formattedDate);
    };


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

        <Button className="mt-3" onClick={() => history.push('/addposting')}>Add Posting</Button>

        {/* J: The following link has been replaced with the above (SemanticUI) button */}
        {/* <div className="nav-item">        
            <Link to={"/addposting"} className="nav-link">
              Add a posting
            </Link>
        </div> */}

      </div>

      {/* Posting details side panel */}
      <div className="col-md-6">
        {/* {console.log ("Posting Details Div: selectedPosting = ", selectedPosting)} */}
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

                  <div>
                    <label>
                      <strong>Created:</strong>
                    </label>
                    {convertISODate(selectedPosting.createdAt)}
                  </div>

                  <div>
                    <label>
                      <strong>Updated:</strong>
                    </label>
                    {convertISODate(selectedPosting.updatedAt)}
                  </div>

                  <Link to={'/postings/' + selectedPosting._id}  className="badge badge-warning">
                    Edit
                  </Link>

{/* Date Created */}                    
{/* {selectedPosting.createdAt} */}


{/* Date Update */}


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
