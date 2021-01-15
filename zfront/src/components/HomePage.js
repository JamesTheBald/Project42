import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Project 42</h1>
      <h6>"The answer to the great question of life the universe and everything is… 42!" - Supercomputer Deep Thought</h6>
      <Link to={"/tutorials"} className="nav-link">
        Link to Tutorials List
      </Link>
    </div>
  );
};

export default HomePage;