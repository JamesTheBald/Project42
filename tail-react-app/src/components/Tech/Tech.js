import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";    // Router may show as unused but it is necessary
import './style.css';
import image from './helpful_tips.jpg'
import InputSection from './InputSection'
const { loadPostings } = require('./functions');    //I tried import but got 'Blah is not a function' errors


function Tech() {



  return (
    <div>
      {/* Main container column */}
      <div className="flex flex-col items-center">

        <img src={image} alt="Helpful Posting"/>

        {InputSection()}

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
