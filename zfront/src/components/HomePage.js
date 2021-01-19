import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Helpful Postings</h1>
      <br/>
      <h5>Pan Galactic Gargle Blasters' "Project 42"</h5>
      <br/>
      <i>"The answer to the great question of life the universe and everything is… 42!" - Supercomputer Deep Thought</i>
      <br/>
      <br/>
      <Link to={"/postings"} className="nav-link">
        Link to Postings List
      </Link>
    </div>
  );
};

export default HomePage;