import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";
import './styles/tailwind_built.css';

// import AddPosting from "./components/AddPosting";
// import PostingDetails from "./components/PostingDetails";
import PostingsList from "./components/PostingsList";
// import Home from "./components/Home";
// import Navbar from "./components/Navbar";


function App() {
  return (
    <div>

      <PostingsList />

        {/* <Switch>
          <Route exact path={["/postings"]} component={PostingsList} />
          <Route exact path="/addposting" component={AddPosting} />

          {/* <Route path="/postings/:id" component={PostingDetails} /> */}
          {/* <Route path="/postings/:id" render={() => <PostingDetails props={props} />} /> */}
        
          {/* <Route exact path={["/home"]} component={Home} />      {/* J: Let's discuss if we should call it HomePage or Home */}
          {/* <Route exact path={["/"]}>
            <Redirect to="/home"/>
          </Route>
          <Route component={Home}/>
        </Switch> */}

    </div>
  );
}

export default App;
