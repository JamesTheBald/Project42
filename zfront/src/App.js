import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import HomePage from "./components/HomePage";


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand"> {/* C: Would it be better to use Router here? */}
          <Link to={"/"} >
            Thanks bezKoder!
          </Link>
        </div>

        <div className="navbar-nav mr-auto">      {/* J: 'mr-auto' is Tailwind! */}
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
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
          <Route exact path={["/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
          <Route exact path={["/"]} component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
