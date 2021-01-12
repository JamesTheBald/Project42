import LoadPostingsOntoPage from './LoadPostingsOntoPage';

const port = 8082;

function getPostings(){
    console.log("loadPostings function called. Fetching from port",port)
    fetch(`http://localhost:${port}/postings`, {cache: 'no-store'})          // get the postings. 'no-store' is to prevent 
                                                                          // the page from caching. Try the page without it
    .then(response => response.json())                                    // read the json out of the response
    .then(postings => { LoadPostingsOntoPage (postings) })
}

export default getPostings;
