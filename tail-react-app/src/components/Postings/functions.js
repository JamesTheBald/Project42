const port=8081;


function loadPostings(){
    fetch('http://localhost:8081/postings', {cache: 'no-store'})          // get the postings... spicy! we us no-store to prevent the page from caching. Try the page without it
    .then(response => response.json())                                    // read the json out of the response
    .then(postings => loadPostingsOntoPage(postings))                     // load the postings onto the page
}
// Q: How do we use the constant 'port' here? (instead of hard-coded 8081). Also change in function submitNewPosting()


function loadPostingsOntoPage(postings){
    const postingArea = document.getElementById('newPostings')                       // get the element to put the new posting objects into

    // clears any existing div children from the postingarea... Bluntest way to do this, but it will work for this app
    postingArea.innerHTML = ''        

    postings.forEach( posting => {
        const newPostingDiv = document.createElement('div')
        newPostingDiv.classList.add('postingItem')                          // mark it to receive styling from class 'postingItem'
        newPostingDiv.textContent = posting.title                           // give it the correct content
        postingArea.appendChild(newPostingDiv)                              // add the posting to the correct seciton
    })
}



// Called when user clicks submit for new posting
function submitNewPosting(){
    const newPostingTitle = document.getElementById('newPostingTitle')      // get the content for the new posting
    const postingTitle = newPostingTitle.value

    fetch('http://localhost:8081/postings', {                              // send a post to postings to create the new posting
        method: 'post',
        headers: {"Content-Type": "application/json"},                     // add a header to tell the server to expect json
        body: JSON.stringify({newPosting: postingTitle})                   // add the body with the new title
    })
    .then(loadPostings)                                                    // reload the postings when it's done so that we see the new posting
}





