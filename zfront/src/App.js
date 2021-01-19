import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPosting from "./components/AddPosting";
import Posting from "./components/Posting";
import PostingsList from "./components/PostingsList";
import HomePage from "./components/HomePage";


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand"> {/* C: Would it be better to use Router here? */}
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

      <div className="container mt-3">        {/* J: What is this 'mt-3'? Looks like Tailwind! */}
        <Switch>
          <Route exact path={["/postings"]} component={PostingsList} />
          <Route exact path="/add" component={AddPosting} />
          <Route path="/postings/:id" component={Posting} />
          <Route exact path={["/"]} component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
