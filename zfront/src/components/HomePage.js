import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>This is the Home Page</h1>

      <Link to={"/tutorials"} className="nav-link">
        Link to Tutorials List
      </Link>
    </div>
  );
};

export default HomePage;

