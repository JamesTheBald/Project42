import React from 'react'
import { Link } from "react-router-dom";


function Navbar() {
  return (
    // <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">      {/* C: Would it be better to use Router here? */}
          <Link to={"/"} >
            Helpful Postings
          </Link>
        </div>

        <div className="navbar-nav mr-auto">      {/* J: 'mr-auto' is Tailwind! */}
          <div className="nav-item">
            <Link to={"/postings"} className="nav-link">
              Postings
            </Link>
          </div>

        </div>
      </nav>

    // </div>
  )
}

export default Navbar
