const port=8081;


function loadPage(){                                                    // when the page loads
    loadPostings();                                                       // load all postings
}

// How to use the constant port here, instead of hard-coded 8081. Also change in function submitNewPosting()
function loadPostings(){
    fetch('http://localhost:8081/postings', {cache: 'no-store'})          // get the postings... spicy! we us no-store to prevent the page from caching. Try the page without it
    .then(response => response.json())                                  // read the json out of the response
    .then(postings => loadPostingsOntoPage(postings))                         // load the postings onto the page
}

function loadPostingsOntoPage(postings){
    const newPostings = postings.filter(posting => posting.state === 'New')     // split the postings by state so we know where to show them
    const inProgressPostings = postings.filter(posting => posting.state == 'In Progress')

    populatePostings('newPostings', newPostings)                              // populate sections for the postings
    populatePostings('inProgressPostings', inProgressPostings)
}

function populatePostings(id, postings){
    const postingArea = document.getElementById(id)                       // get the element to put the new posting objects into

    // clears any existing div children from the postingarea... let's use this when postings change
    // this is the bluntest way to do this, but it will work for this app
    postingArea.innerHTML = ''        

    postings.forEach( posting => {                                          // for each posting
        const newPostingDiv = document.createElement('div')               // create a new div
        newPostingDiv.classList.add('postingItem')                          // mark it as an posting for styling
        newPostingDiv.textContent = posting.title                           // give it the correct title
        // newPostingDiv.onclick=()=>location.href=`posting.html?postingNumber=${posting.id}`  
            // add an onclick to take us to the posting specific page - DISABLED FOR NOW
        postingArea.appendChild(newPostingDiv)                              // add the posting to the correct seciton
    })
}

function submitNewPosting(){
    const newPostingTitle = document.getElementById('newPostingTitle')      // get the title for the new posting
    const postingTitle = newPostingTitle.value                                  
    fetch('http://localhost:8081/postings', {                             // send a post to postings to create the new posting
        method: 'post',
        headers: {"Content-Type": "application/json"},                  // add a header to tell the seerver to expect json
        body: JSON.stringify({newPosting: postingTitle})                    // add the body with the new title
    })
    .then(loadPostings)                                                   // reload the postings when it's done so that we see the new posting
}





