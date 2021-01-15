import React from 'react'


function loadPostingsOntoPage (postings) {
  console.log("Loading postings=",postings)

    postings.map (posting => {
    <div>
      {posting.content}
    </div>
    })

}


// Called when user clicks submit for new posting
function submitNewPosting(){
  const newPostingTitle = document.getElementById('newPostingTitle')      // get the content for the new posting
  const postingTitle = newPostingTitle.value

  fetch('http://localhost:8081/postings', {                              // send a post to postings to create the new posting
      method: 'post',                                                    // Update above line to use varible port instead of hard-coded 8081
      headers: {"Content-Type": "application/json"},                     // add a header to tell the server to expect json
      body: JSON.stringify({newPosting: postingTitle})                   // add the body with the new title
  })
  .then(loadPostingsOntoPage)                                                    // reload the postings when it's done so that we see the new posting
}


module.exports = { loadPostingsOntoPage, submitNewPosting};