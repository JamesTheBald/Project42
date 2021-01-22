  // In functions (was line 45)
  
  // const updatePublished = (status) => {
  //   console.log("updatePublished1: selectedPosting=",selectedPosting)
  //   console.log("updatePublished1: selectedPosting._id=",selectedPosting._id)
  //   let data = {
  //     id: selectedPosting._id,          // J: i.e. no change to id, title or description
  //     title: selectedPosting.title,
  //     contributors: selectedPosting.contributors,
  //     description: selectedPosting.description,
  //     published: status
  //   };

  //   PostingAxios.update(selectedPosting._id, data)
  //     .then(response => {
  //       setSelectedPosting({ ...selectedPosting, published: status });
  //       console.log("updatePublished2: response.data=",response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };



// After listing PostingDetails (was line 150)...

        {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {selectedPosting.published ? "Published" : "Pending"}
            </div> */}
            // </form>

            {/* {selectedPosting.published ? (
              <button className="badge badge-primary mr-2" onClick={() => updatePublished(false)}>
                UnPublish
              </button>
            ) : (
              <button className="badge badge-primary mr-2" onClick={() => updatePublished(true)}>
                Publish
              </button>
            )} */}