import React, { useEffect, useState } from 'react'
// import loadPostings from './functions.js'
// import loadPostingsOntoPage from './functions.js'
// import submitNewPosting from './functions.js'

import { BrowserRouter as Router, Link } from "react-router-dom";    // Router may show as unused but it is necessary
import './style.css';
import image from './helpful_tips.jpg'



function Tech() {

  const port=8081;

  // Q: How do we use the constant 'port' here? (instead of hard-coded 8081). Also change in function submitNewPosting()
  function loadPostings(){
      console.log("loadPostings function called")
      fetch('http://localhost:8081/postings', {cache: 'no-store'})          // get the postings... spicy! we us no-store to prevent the page from caching. Try the page without it
      .then(response => response.json())                                    // read the json out of the response
      .then(postings => loadPostingsOntoPage(postings))                     // load the postings onto the page
  }       // Q: How/when is postings defined and given a value?



  function loadPostingsOntoPage(postings){
    console.log("loadPostingsOntoPage function called")
  
    const postingArea = document.getElementById('newPostings')                       // get the element to put the new posting objects into
  
    // clears any existing div children from the postingarea... Bluntest way to do this, but it will work for this app
    postingArea.innerHTML = ''        
  
    postings.forEach( posting => {
        const newPostingDiv = document.createElement('div')
        newPostingDiv.classList.add('postingItem')                          // mark it to receive styling from class 'postingItem'
        newPostingDiv.textContent = posting.title                           // give it the correct content
        // console.log ("posting content =", posting.title)
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



  useEffect(() => {
    console.log('Hello from useEffect!');
    const load = () => loadPostings();
  }, []); 


  return (
    <div>
      {/* Main container column */}
      <div className="flex flex-col items-center">

        <img src={image} alt="Helpful Posting"/>

        {/* Container for input section */} 
        <div  className="flex flex-col p-4 my-2 w-3/4 border-2 rounded-xl border-gray-600">

          <div className="font-500 mb-3">Submit a new posting</div>

          {/* Input line */}
          <div className="flex flex-row justify-around">
            <input id="newPostingTitle" type="text" placeholder=" Enter posting details" className="w-3/4 border border-gray-900 bg-gray-200"/>
            <div className="w-32 py-1 flex justify-center bg-gray-300" onClick={ () => submitNewPosting()}>Submit</div> 
          </div>
        </div>

        {/* Postings */}
        <div className="w-3/4 flex flex-col items-center">
          <div id="newPostings" />                                    {/* ID referenced by loadPostingsOntoPage() */}
          {loadPostings()}
        </div>

      </div>


      <div className="subtitle">
            <Link to="/">Link to Welcome page</Link>
      </div>

    </div>
  )
}

export default Tech
