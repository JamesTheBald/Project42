// import React from 'react'
// import getPostings from './getPostings';
const port = require("../misc.js");


function submitNewPosting(handleSubmit){

  const newPostingContent = handleSubmit.target.value

  setPostings((oldValues) => ({ ...oldValues, id:4, content:newPostingContent }));


  fetch(`http://localhost:${port}/postings`, {                        
      method: 'post',                                              // send a post to API endpoint /postings to create the new posting
      headers: {"Content-Type": "application/json"},               // add a header to tell the server to expect json
      body: JSON.stringify({newPosting: newPostingContent})        // add the body with the new content
  })
  .then( 
    // RenderPostings()                          // reload the postings when it's done so that we see the new posting
  )
}

export default submitNewPosting;