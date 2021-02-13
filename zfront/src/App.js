import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/app.css";
import './styles/tailwind_built.css';

import PostingsList from "./components/PostingsList";

function App() {
  return (
    <div className="font-sans">

      <PostingsList />

    </div>
  );
}

export default App;
