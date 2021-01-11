import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";  // Router may look unused but it is necessary

function Welcome() {
  return (
    <div>
          <div className="title text-yellow-600 ">
            This is the placeholder for the Welcome page
          </div>
          <div className="subtitle">

            <Link to="/tech">Coding Technology Topics</Link>
            <br/>

            <Link to="/process">Coding Process Topics</Link>
            <br/>

            <Link to="/people">Coding People Topics</Link>
            <br/>

          </div>
    </div>
  )
}

export default Welcome