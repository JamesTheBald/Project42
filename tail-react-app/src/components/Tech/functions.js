const port=8081;

// Q: How do we use the constant 'port' here? (instead of hard-coded 8081).
function loadPostings(){
    console.log("loadPostings function called")
    fetch(`http://localhost:${port}/postings`, {cache: 'no-store'})          // get the postings. 'no-store' is to prevent 
                                                                          // the page from caching. Try the page without it
    .then(response => response.json())                                    // read the json out of the response
    .then(postings => loadPostingsOntoPage(postings))                     // load the postings onto the page
}


function loadPostingsOntoPage(postings){
  console.log("loadPostingsOntoPage function called")

  postings.forEach( posting => {





      // newPostingDiv.classList.add('postingItem')                          // mark it to receive styling from class 'postingItem'
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
  .then(loadPostings)                                                    // reload the postings when it's done so that we see the new posting
}


module.exports = { loadPostings, submitNewPosting};