import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPosting from "./components/AddPosting";
import Posting from "./components/Posting";
import PostingsList from "./components/PostingsList";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div>
      <Navbar/>

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
