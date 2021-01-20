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
          <li className="nav-item">
            <Link to={"/postings"} className="nav-link">
              Postings
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

    // </div>
  )
}

export default Navbar
