import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";    // Router may show as unused but it is necessary
import image from './helpful_tips.jpg';
import InputSection from './InputSection';
import RenderPostings from './RenderPostings'
const port = require("../misc.js");


function Tech() {

  const [postings, setPostings] = useState();

  useEffect ( () => {
    console.log("loadPostings function called from port",port)
    fetch(`http://localhost:${port}/postings`, {cache: 'no-store'})       // get the postings. 'no-store' is to prevent the page from caching.
    .then(response => response.json())                                    // read the json out of the response
    .then(posts =>  setPostings(posts) )
  },[] )


  return (
    <div>
      <div className="flex flex-col items-center">                    {/* Main container column */}

        <img src={image} alt="Helpful Posting"/>

        <InputSection setPost={setPostings} />

        <div className="w-3/4 flex flex-col items-center">            {/* Postings */}
          <RenderPostings postingsList={postings} />
        </div>

      </div>

      <div className="text-center text-xl mt-6" >
        <Link to="/">Link to Welcome page</Link>
      </div>

    </div>
  )
}

export default Tech
