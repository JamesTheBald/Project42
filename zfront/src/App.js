import React from "react";
import './styles/tailwind_built.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/app.css";
import PostingsList from "./components/PostingsList";


function App() {
  return (
    <div className="font-sans">

      <PostingsList />

    </div>
  );
}

export default App;
